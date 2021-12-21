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

const createProperty = (req, res) => {
  const {
    imgArr,
    name,
    price,
    city,
    location,
    describe,
    postedBy,
    propertyHighlights,
  } = req.body;
  const newProperty = new propertyModel({
    imgArr,
    name,
    city,
    price,
    location,
    describe,
    postedBy,
    propertyHighlights,
  });

  newProperty
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};


module.exports = { getAllProperty, createProperty};
