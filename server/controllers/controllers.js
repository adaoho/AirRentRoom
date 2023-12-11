const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Lodging, Type, User, Log } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class Controller {
  static async userRegister(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      let user = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });

      let payload = {
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        phoneNumber: user.phoneNumber,
        address: user.address,
      };

      let token = createToken(payload);

      res.status(201).json({
        statusCode: 201,
        access_token: token,
        message: `Register ${user.username} succeed`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async userGoogleSignIn(req, res, next) {
    try {
      console.log(req.headers, "<<< headers");

      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      // console.log(payload);

      const [user, isCreated] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "google-sign-in",
          role: "staff",
        },
        hooks: false,
      });

      const access_token = createToken({
        id: user.id,
        email: user.email,
        role: "staff",
      });

      console.log(access_token, "<<< access_token");

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: `Email Empty` };
      if (!password) throw { name: `Password Empty` };

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) throw { name: `InvalidLogin` };

      const isValidPassword = comparePassword(password, user.password);

      if (!isValidPassword) throw { name: `InvalidLogin` };

      const accessToken = createToken({
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      });

      res.status(200).json({
        access_token: accessToken,
        message: `welcome ${user.username}`,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readLodging(req, res, next) {
    try {
      const lodging = await Lodging.findAll({
        include: ["Type", "User"],
        order: [["id", "DESC"]],
      });
      const user = await User.findOne({ where: { id: req.user.id } });
      const type = await Type.findAll();

      res.status(200).json({
        statusCode: 200,
        message: `Success Get Lodging`,
        lodging,
        user,
        type,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createLodging(req, res, next) {
    const { id } = req.user;
    try {
      const { name, facility, roomCapacity, imgUrl, location, price, typeId } =
        req.body;

      const payload = {
        name,
        facility,
        roomCapacity,
        imgUrl,
        authorId: id,
        location,
        price,
        typeId,
        status: "active",
      };

      const createLodging = await Lodging.create(payload);

      // create logs

      res.status(201).json({
        statusCode: 201,
        message: `Success create data Lodging`,
        createLodging,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteLodging(req, res, next) {
    try {
      const { id } = req.params;
      const lodgingDelete = await Lodging.destroy({ where: { id } });

      res.status(200).json({
        statusCode: 200,
        message: `Success receive Data`,
        lodgingDelete,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async readType(req, res) {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });
      const typeData = await Type.findAll();

      res.status(200).json({
        statusCode: 200,
        message: `Success Get Data Type`,
        typeData,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteType(req, res, next) {
    console.log(req.params);
    try {
      const { id } = req.params;
      const typeDelete = await Type.destroy({ where: { id: id } });
      const typeDeleteId = await Type.findOne({ where: { id: id } });

      if (typeDeleteId === null) throw { name: "InvalidId" };

      res.status(200).json({
        statusCode: 200,
        message: `Success receive Data`,
        typeDelete,
        typeDeleteId,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createType(req, res, next) {
    try {
      const { name } = req.body;
      const payload = { name };

      const createType = await Type.create(payload);

      res.status(201).json({
        statusCode: 201,
        message: `Success create data Type`,
        createType,
      });
    } catch (error) {
      next(error);
    }
  }

  static async showIdLodgings(req, res, next) {
    try {
      const { id } = req.params;
      const findLodging = await Lodging.findOne({ where: { id: id } });

      if (findLodging === null) throw { name: "InvalidId" };

      res.status(201).json({
        statusCode: 201,
        message: `Success receieve Data Id Lodgings`,
        findLodging,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async editLodgings(req, res, next) {
    const authorId = req.user.id;
    try {
      const { id } = req.params;
      const findLodging = await Lodging.findOne({ where: { id: id } });
      // console.log(findLodging);

      const { name, facility, roomCapacity, imgUrl, location, price, typeId } =
        req.body;

      const payload = {
        name,
        facility,
        roomCapacity,
        imgUrl,
        authorId: authorId,
        location,
        price,
        typeId,
      };

      const editLodging = await Lodging.create(payload);

      // create logs
      const payloadLog = {
        name: `Create Lodging`,
        description: `Add new lodgings with id ${editLodging.id}`,
        updatedBy: req.user.email,
      };

      res.status(201).json({
        statusCode: 201,
        message: `Success edit Data Lodgings`,
        editLodging,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const editStatus = await Lodging.update(
        { status: status },
        { where: { id: id } }
      );

      // create logs

      res.status(201).json({
        statusCode: 201,
        message: `Success edit data Lodging`,
        editStatus,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readLog(req, res, next) {
    try {
      const readLog = await Log.findAll();

      res.status(201).json({
        statusCode: 201,
        message: `Success read Log`,
        readLog,
      });
    } catch (error) {
      next(error);
    }
  }

  static async postLog(req, res, next) {
    try {
      req.body = {
        name: req.body.name,
        description: req.body.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: req.user.id,
      };

      // console.log(req.body);

      // const { name, description } = req.body;

      // const payload = {
      //   name,
      //   description,
      //   authorId: req.user.id,
      // };

      // console.log(payload);

      const postLog = await Log.create(req.body);

      res.status(201).json({
        statusCode: 201,
        message: `Success added Logs`,
        postLog,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
