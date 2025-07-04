const User = require('../model/User')

async function getUserById(req, res) {
  try {
    const userId = req.query.userId
    const user = await User.find(userId).select('usernamee email phoneNumber')

    if (!user || user.length === 0) {
      return res.status(404).send({ msg: 'user missing' })
    }

    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ err: err })
  }
}

module.exports = { getuserById }
