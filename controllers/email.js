const send_email = require('../functions/send_email')

const home = async (req, res) => {
  res.render('home')
}

const email = async (req, res) => {

  const { name, email, phone, message } = req.body

  // email admin
  var emailAdmin = 'fnavarrete@voxpop.com.mx'

  // function of send_email
  // 
  // Not # 0: send_email(whichNotification, name, emailAdmin, phone, message)
  send_email(0, name, emailAdmin, phone, message)

  // Not # 1: send_email(whichNotification, name, email, phone, message)
  send_email(1, name, email, phone, message)

  res.render('thanks', { userName: name })
  // try {
  //   res.json({ ok: true })
  // } catch (err) {
  //   res.json(err.message)
  // }
}

module.exports = {
  home,
  email
}