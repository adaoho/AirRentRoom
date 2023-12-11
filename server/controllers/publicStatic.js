const { Axios, default: axios } = require("axios");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken, verifyToken } = require("../helpers/jwt");
const { Lodging, Type, User, Log, Customer, Bookmark } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_SECRET);
const { Op } = require("sequelize");

class PublicStatic {
  static async customerRegister(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: `Email Empty` };
      if (!password) throw { name: `Password Empty` };

      await Customer.create({ email, password });

      const payload = {
        email,
        password,
        role: "customer",
      };

      let token = createToken(payload);

      res.status(201).json({
        statusCode: 201,
        access_token: token,
        message: `Register with ${email} succeed`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async customerLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: `Email Empty` };
      if (!password) throw { name: `Password Empty` };

      const customer = await Customer.findOne({
        where: { email },
      });

      // console.log(customer, "<<< ini dari public customer");

      if (!customer) throw { name: "InvalidLogin" };

      const isValidPassword = comparePassword(password, customer.password);

      if (!isValidPassword) throw { name: `InvalidLogin` };

      const accessToken = createToken({
        id: customer.id,
        email: customer.email,
        role: customer.role,
      });

      res.status(200).json({
        statusCode: 200,
        customer: customer.email,
        access_token: accessToken,
        message: `welcome ${customer.email}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async customerGoogleLogin(req, res, next) {
    try {
      console.log(req.headers, "<<< headers");

      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      console.log(payload, "<<<< this is payload");

      const [customer, isCreated] = await Customer.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "google-sign-in",
          role: "customer",
        },
        hooks: false,
      });

      const access_token = createToken({
        id: customer.id,
        email: customer.email,
        role: "staff",
      });

      res.status(200).json({
        statusCode: 200,
        customer: customer.email,
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async customerGetLodgings(req, res, next) {
    try {
      let limit = 9;

      let option = {
        order: [["id", "ASC"]],
        include: Type,
      };

      const { name, location, type, pmin, pmax, page } = req.query;

      if (name || location || type || pmin || pmax) {
        option.where = {};
        if (name) {
          option.where.name = { [Op.iLike]: `%${name}%` };
        }
        if (location) {
          option.where.location = { [Op.iLike]: `%${location}%` };
        }
        if (type) {
          option.where.typeId = { [Op.eq]: type };
        }
        if (pmin && pmax) {
          option.where.price = {
            [Op.between]: [pmin, pmax],
          };
        } else if (pmin) {
          option.where.price = {
            [Op.gte]: pmin,
          };
        } else if (pmax) {
          option.where.price = {
            [Op.lte]: pmax,
          };
        }
      }

      if (page) {
        option.limit = limit;
        option.offset = page * limit - limit;
      } else {
        option.offset = 0;
        option.limit = limit;
      }

      const { rows, count } = await Lodging.findAndCountAll(option);

      res.status(200).json({
        statusCode: 200,
        message: `Lodgings Data Success`,
        currentPage: page || 1,
        totalPage: Math.ceil(count / limit),
        lodgings: rows,
      });
    } catch (error) {
      next(error);
    }
  }

  static async customerGetBookmark(req, res, next) {
    try {
      // console.log(req.user);

      const UserId = req.user.id;

      const getBookmark = await Bookmark.findAll({
        where: {
          CustomerId: UserId,
        },
        include: {
          model: Lodging,
          include: {
            model: Type,
          },
        },
      });

      if (!getBookmark) throw { name: "InvalidId" };

      // console.log(getBookmark, "<<<< GetBookmark From Customer");

      res.status(200).json({
        statusCode: 200,
        message: "Get Data Bookmark Succed",
        getBookmark,
      });
    } catch (error) {
      next(error);
    }
  }

  static async customerPostBookmark(req, res, next) {
    try {
      // console.log(req.user, "<<< req user");

      const UserId = req.user.id;
      const { id } = req.params;

      const check = await Lodging.findByPk(id);

      if (!check) throw { name: "InvalidId" };

      const checkBookmark = await Bookmark.findOne({
        where: { CustomerId: UserId, LodgingId: id },
      });

      if (checkBookmark) throw { name: "BookmarkCreated" };

      const createBookmark = await Bookmark.create({
        CustomerId: UserId,
        LodgingId: id,
      });

      res.status(201).json({
        statusCode: 201,
        message: "Bookmark Created",
        createBookmark,
      });
    } catch (error) {
      next(error);
    }
  }

  static async customerDetailBookmark(req, res, next) {
    const tokenQR =
      "jp55Bx5J43ow8MKj3HqoQ60-QtKrUB3mEurBK3XyGD9EORyCBp3-h21Y-_mcOeMs";
    try {
      const { id } = req.params;

      const getLodging = await Lodging.findByPk(id, {
        include: [
          { model: Type, attributes: ["name"] },
          { model: User, attributes: ["email"] },
        ],
      });

      // console.log(getLodging, "<<< Data Lodging Find By PK");

      if (!getLodging) throw { name: "InvalidId" };

      const { data } = await axios({
        url: `https://api.qr-code-generator.com/v1/create?access-token=${tokenQR}`,
        method: "post",
        data: {
          frame_name: "no-frame",
          qr_code_text: `http://localhost:5173/public/bookmark/${id}`,
          image_format: "PNG",
          image_width: 250,
          download: 1,
        },
        responseType: "arraybuffer",
      });

      // console.log(data, "<<<< from Axios QR Code");

      const base64 = btoa(
        new Uint8Array(data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      // console.log(base64, "<<< base64 check");

      res.status(200).json({
        message: "Get Lodging By Id Succed",
        qrcode: base64,
        getLodging,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PublicStatic;
