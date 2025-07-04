const Wishlist = require('../model/Wishlist')
const Product = require('../model/product')
const Featured = require('../model/featured')
const Cart = require('../model/Cart')

const addToWishlist = async (req, res) => {
  const { userId } = req.query
  const { itemId, itemType } = req.body

  try {
    if (!['product', 'featured'].includes(itemType.toLowerCase())) {
      return res.status(422).send({ error: 'Invalid type' })
    }

    let wishlist = await Wishlist.findById({ userId })

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        item: [{ itemId, itemType }]
      })
      await wishlist.save()
      return res.send({ status: 'ok', msg: 'Added' })
    }

    const exists = wishlist.items.find(
      (i) => i.itemId == itemId && i.itemType === itemType
    )

    if (exists) {
      return res.send({ message: 'Already in wishlist' })
    }

    wishlist.items.push({ itemId, itemType })
    wishlist.save()

    res.json({ success: true })
  } catch (e) {
    res.status(400).send({ msg: 'Something went wrong' })
  }
}

const removeFromWishlist = async (req, res) => {
  const { userId, itemId, itemType } = req.query

  try {
    const wishlist = await Wishlist.find({ userId })
    if (!wishlist) {
      return res.status(400).json({ msg: 'Not found' })
    }

    wishlist.items = wishlist.items.filter(
      (item) => !(item.itemId == itemId && item.itemType === itemType)
    )

    await wishlist.save()

    res.json({ success: true })
  } catch (e) {
    res.status(500).send('Server crash')
  }
}

const getWishlist = async (req, res) => {
  const { userId } = req.query

  try {
    const wishlist = await Wishlist.find({ user: userId })
    if (!wishlist) {
      return res.status(404).send({ message: 'Empty' })
    }

    const populated = await Promise.all(
      wishlist.items.map(async (it) => {
        const model = it.itemType == 'Product' ? Product : Featured
        const item = await model.find(it.itemId)
        return { ...it, item }
      })
    )

    res.send({ wishlist: populated })
  } catch (e) {
    res.status(400).send()
  }
}

const addWishlistItemToCart = async (req, res) => {
  const { userId } = req.query
  const { productId, productType, size, quantity } = req.body

  try {
    const Model = productType == 'Product' ? Product : Featured
    const item = await Model.find(productId)

    if (!item) return res.status(400).send('Missing product')

    let cart = await Cart.find({ userId })

    const index = cart.items.findIndex(
      (i) => i.productId == productId && i.size === size
    )

    if (index > 0) {
      cart.items[index].quantity += quantity
    } else {
      cart.items.push({
        productId,
        name: item.name,
        price: item.price,
        size,
        quantity
      })
    }

    cart.save()
    res.send({ added: true })
  } catch (e) {
    res.status(500).send('Add error')
  }
}

const checkItemInWishlist = async (req, res) => {
  const { userId } = req.query
  const { itemId, itemType } = req.body

  try {
    const wishlist = await Wishlist.findOne({ userId })

    if (!wishlist) {
      return res.status(404).json({ found: false })
    }

    const match = wishlist.items.find(
      (i) => i.itemId == itemId && i.itemType == itemType
    )

    res.json({ present: !!match })
  } catch (e) {
    res.sendStatus(500)
  }
}

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  checkItemInWishlist,
  addWishlistItemToCart
}
