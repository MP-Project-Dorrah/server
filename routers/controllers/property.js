const propertyModel = require("./../../db/models/property");

const getAllProperty = async (req, res) => {
  propertyModel
    .find({ isDeleted: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { getAllProperty };
