const propertyModel = require("./../../db/models/property");
const appointmentModel = require("./../../db/models/appointment");
const interestListModel = require("./../../db/models/interestList");
const axios = require("axios");

const getAllProperty = async (req, res) => {
  propertyModel
    .find({ isDeleted: false, isSellerSub: true })
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
  console.log(imgArr);
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
      res.status(200).json(result);
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
        { isCanceled: true },
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

const oneProperty = async (req, res) => {
  const { _id } = req.params;
  propertyModel
    .find({ _id })
    .populate("postedBy")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getUserProperty = (req, res) => {
  const { postedBy } = req.params;
  propertyModel
    .find({ isDeleted: false })
    .populate("postedBy")
    .where("postedBy")
    .equals(postedBy)
    .sort({ date: -1 })
    .exec((err, porperty) => {
      if (err) return handleError(err);
      res.json(porperty);
    });
};

const searchProperty = async (req, res) => {
  const { name, maxPrice, minPrice } = req.body;
  const saveName = name.toLowerCase();

  const result = await propertyModel.find({
    isDeleted: false,
    isSellerSub: true,
    $or: [
      { city: { $regex: new RegExp(saveName) } },
      { name: { $regex: new RegExp(saveName) } },
    ],
  }); // search bar > search on city or name
  // console.log(result);
  let newArr = [];
  if (result.length) {
    result.map((ele) => {
      if (ele.price <= maxPrice && ele.price >= minPrice) {
        newArr.push(ele);
      }
    });
    res.status(200).json(newArr);
  } else {
    res.status(200).json("");
  }
};

const mapSortProperty = async (req, res) => {
  const { lat, lng, sortBy } = req.body;
  const newMapSort = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=20000&type=${sortBy}&keyword=cruise&key=AIzaSyC4JqBOR-km_LYFHF1rW7fWG-vrholjOZQ`;
  const result = await axios.get(newMapSort);
  res.status(200).json(result.data);
};

const mapSortProperty2 = async (req, res) => {
  const { map, sortBy } = req.body;
  const newMap = map.slice(map.indexOf("@") + 1);
  const newMapSort = `https://www.google.co.in/maps/search/${sortBy}/@${newMap}`;
  res.status(200).json(newMapSort);
  console.log(
    map.slice(props.location.indexOf("@") + 1, props.location.indexOf(","))
  );
};

module.exports = {
  getAllProperty,
  deleteProperty,
  createProperty,
  oneProperty,
  getUserProperty,
  searchProperty,
  mapSortProperty,
  mapSortProperty2,
};
