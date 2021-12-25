const interestListModel = require("./../../db/models/interestList");

// toggle
const likeProperty = (req, res) => {
  const { by, onProperty } = req.body;
  interestListModel.findOne({ by, onProperty }).then((result) => {
    if (result) {
      interestListModel.deleteOne({ by, onProperty }, (err) => {
        if (err) return res.status(400).json(err);
      });
      res.status(200).json("unliked successfully");
    } else {
      const like = new interestListModel({
        by,
        onProperty,
      });
      like
        .save()
        .then((result) => {
          res.status(201).json(`liked successfully`);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    }
  });
};

const checkLike = (req, res) => {
  const { onProperty } = req.params;
  console.log(req.token.id);
  interestListModel
    .findOne({  by: req.token.id, onProperty })
    .then((result) => {
      if (result) {
        res.status(201).json("its liked");
      } else {
        res.status(200).json(`its unliked`);
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const userLikes = (req, res) => {
  const { by } = req.params;
  interestListModel
    .find({})
    .populate("onProperty")
    .where("by")
    .equals(by)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { likeProperty, checkLike  , userLikes};
