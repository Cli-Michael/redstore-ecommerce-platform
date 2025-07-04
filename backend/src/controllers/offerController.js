const Offer = require("../models/Offer");

const getOffer = async (req, res) => {
  try {
    const offer = await Offer.find();
    if (offer.length === 0) {
      res.status(200).json({ message: "Offer not found" });
    } else {
      res.status(201).send({ offer });
    }
  } catch (error) {
    res.status(404).send("Unable to retrieve offer");
  }
};

module.exports = {
  getOffer,
};
