const Product = require("../models/productModel");
const Featured = require("../models/featuredModel");
const Category = require("../models/Category");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ available: true });
    if (!products || products.length < 0) {
      res.status(204).json({ products: [] });
    } else {
      res.send(products);
    }
  } catch (err) {
    res.status(400).json({ error: "Products unavailable" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await Product.findOne({ id });
    if (product === null) {
      res.status(200).json({ message: "No such product exists" });
    } else {
      res.status(201).json(product);
    }
  } catch (err) {
    res.status(500).send("Couldn't get product");
  }
};

const getProductsByCategorySlug = async (req, res) => {
  try {
    const { slug } = req.query;
    const cat = await Category.find({ slug });
    const products = await Product.find({ category_id: cat._id });
    res.status(200).send(products);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.deleteOne({ _id: req.body.id });
    res.status(200).send("Deleted");
  } catch (err) {
    res.status(400).json({ message: "Product couldn't be deleted" });
  }
};

const getRelatedProducts = async (req, res) => {
  const { id, type } = req.query;
  const model = type === 'featured' ? Product : Featured;

  try {
    const current = await model.findOne({ _id: id });

    const related = await model.find({
      price: { $gt: current.price - 30, $lt: current.price + 30 },
    }).limit(6);

    res.status(200).json(related);
  } catch (err) {
    res.status(500).json({ error: "Could not load related" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  deleteProduct,
  getRelatedProducts,
  getProductsByCategorySlug,
};
