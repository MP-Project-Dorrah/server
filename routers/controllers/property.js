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

const deleteProperty = async (req, res) => {
  const { _id } = req.body;
  propertyModel
    .findById({ _id })
    .then((result) => {
      propertyModel.updateOne({ _id }, { isDeleted: true }, (err) => {
        if (err) return res.status(400).json(err);
      });
      appointmentModel.updateMany(
        { onProperty: _id },
        { isCanceled: true  },
        function (err) {
          if (err) return res.status(400).json(err);
        }
      );
      interestListModel.deleteMany({ onProperty: _id }, (err) => {
        if (err) return res.status(400).json(err);
      });

      return res.status(200).json("done");
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { getAllProperty, deleteProperty  , createProperty};
