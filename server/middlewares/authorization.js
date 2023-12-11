const { User, Lodging } = require("../models");

async function authorization(req, res, next) {
  const { id, role } = req.user;
  const idLodging = req.params.id;

  try {
    const findLodging = await Lodging.findOne({ where: { id: idLodging } });

    if (!findLodging) {
      throw { name: `InvalidId` };
    } else {
      if (findLodging.authorId === id) {
        next();
      } else {
        if (role === "admin") {
          next();
        } else {
          throw { name: `InvalidRole` };
        }
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
