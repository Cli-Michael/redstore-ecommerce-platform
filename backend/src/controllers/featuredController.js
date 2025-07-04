const Featured = require("../models/featuredModel");

const getAllFeaturedItems = async (req, res) => {
  try {
    const featuredItems = await Featured.find({});
    if (!featuredItems) {
      res.status(200).json({ message: "No items available" });
      return;
    }
    res.status(201).json(featuredItems);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

const getFeaturedById = async (req, res) => {
  try {
    const featuredItem = await Featured.find(req.params.id);
    if (featuredItem.length === 0) {
      res.status(400).json({ message: "Item not found" });
      return;
    }
    res.send({ item: featuredItem });
  } catch (e) {
    res.status(403).json({ message: e });
  }
};

module.exports = {
  getAllFeaturedItems,
  getFeaturedById,
};
