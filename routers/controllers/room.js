const roomModel = require("./../../db/models/room");

const getOrCreateRoom = async (req, res) => {
  const { user, sendToUser } = req.body;
  const room1 = await roomModel.find({ user1: user });
  const room2 = await roomModel.find({ user1: sendToUser });

  if (room1.length > room2.length) {
    res.status(200).json(room1[0]);
  } else if (room2.length > room1.length) {
    res.status(200).json(room2[0]);
  } else {
    const newRoom = new roomModel({
      user1: user,
      user2: sendToUser,
    });
    newRoom
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
};
module.exports = { getOrCreateRoom };
