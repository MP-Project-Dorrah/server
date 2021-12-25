const propertyModel = require("./../../db/models/property");
const appointmentModel = require("./../../db/models/appointment");
const interestListModel = require("./../../db/models/interestList");

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
    .find({isDeleted: false})
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

  const result = await propertyModel.find({ isDeleted: false ,
    $or: [
      { city: { $regex: new RegExp(saveName) } },
      { name: { $regex: new RegExp(saveName) } },
    ],
  }); // search bar > search on city or name
  console.log(result);
  let newArr = [];
  if (result.length) {
    result.map((ele) => {
      if (ele.price < maxPrice && ele.price > minPrice) {
        newArr.push(ele);
      }
    });
    res.status(200).json(newArr);
  } else {
    res.status(200).json("");
  }
};

const mapSortProperty = async (req, res) => {
  const { map, sortBy } = req.body;
  const newMap = map.slice(map.indexOf("@") + 1);
  const newMapSort = `https://www.google.co.in/maps/search/${sortBy}/@${newMap}`;
  res.status(200).json(newMapSort);
};
// sort
// https://www.google.co.in/maps/search/bank/@26.3391232,43.7617704,15z/data=!3m1!4b1?hl=en
//user
// https://www.google.co.in/maps/@26.3391232,43.7617704,15z/data=!3m1!4b1?hl=en
// or
// https://www.google.co.in/maps/place/Alhbas+Company/@26.0585439,43.4906239,13z/data=!4m13!1m7!3m6!1s0x158239c8dd7b86c9:0x6aaae76e5ab9eefa!2sRiyadh+Al+Khabra!3b1!8m2!3d26.0533267!4d43.5414667!3m4!1s0x1582377697faca5f:0x249f214b73aeb8bc!8m2!3d26.0267162!4d43.5258093?hl=en

module.exports = {
  getAllProperty,
  deleteProperty,
  createProperty,
  oneProperty,
  getUserProperty,
  searchProperty,
  mapSortProperty,
};
