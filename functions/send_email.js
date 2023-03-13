const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '414900537239-nj9tss7hvv5t5h0vij1bhgsk004k3gmo.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04eQaZaR1XkhhCgYIARAAGAQSNwF-L9Ir041oXA4Y3g6z6dnrbMnDs0fFW7W1dgv3RarmrYVyJNDDe-gtWCURGCIZQw7x0aoBZdQ'

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
)

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const accessToken = oAuth2Client.getAccessToken()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'fnavarrete@voxpop.com.mx',
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken
  }
})

module.exports = function (whichNotification, name, email, phone, message) {

  // Notifications
  // 0 notification form of contact - admin
  // 1 notification form of contact - client

  let notifications = [
    {
      subject: 'New contact form sent',
      title: 'New form submitted',
      notification: 'Hello admin. A new contact form has been sent. Here are the data. Nombre: ' + name + ', Email: ' + email + ', Phone: ' + phone + ', Message: ' + message
    },
    {
      subject: 'We have received your message',
      title: 'Soon we will be with you',
      notification: 'Hello ' + name + 'We have received your message and our support team will contact you shortly.'
    }
  ]

  // Template email
  const templateHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        p,a,h1,h2,h3,h4,h5, h6 { font-family: 'Montserrat', sans-serif !important;}
        h1 {font-size: 60px !important;}
        h2 {font-size: 45px !important;}
        h3 {font-size: 35px !important;}
        h4 {font-size: 25px !important;}
        p,a {font-size: 18px !important;}
        
        .button {
          width: 30%;
          background-color: #fCAE3B;
          border-color: 2px solid #fCAE3B;
          color: #000000;
          padding: 16px 32px;
          text-align: center;
          text-decoration: none;
          font-weight: bold;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          transition-duration: 0.5s;
          cursor: pointer;
        }
        .button:hover {
          background-color: #000000;
          color: #f3f3f3;
          border-radius: 40px;
          transition-duration: 0.5s;
        }
      </style>
    </head>
    <body>
      <div style="width: 100%; background-color: #333333">
        <div style="padding: 10px 10px 10px 10px;">
          
          <!-- Logo -->
          <div style="background-color: #f3f3f3; padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
            <img style='width: 150px; height: 100px;' src="cid:logo" alt="">
          </div>
          
          <!-- Principal content -->
          <div style="background-color: #FFFFFF; padding: 20px 0px 5px 0px; width: 100%;text-align: center;">
            <h2>${notifications[whichNotification].title}</h2>
            <p style="padding-left: 30px; padding-right: 30px;">${notifications[whichNotification].notification}</p>
            
            <!-- Thanks -->
            <p>Thanks you for you time.</p>
            <p style="margin-bottom: 50px;"><i> Sincerely:</i> <br> Abbott Group</p>
    
            <!-- Button -->
            <a href="https://www.google.com/" target="_blank" class="button">Go to Abbott Group</a>
          </div>
    
          <!-- Footer -->
          <div style="background-color: #000000; color: #f3f3f3; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
          <h4>Support</h4>
          <p style="font-size: 13px !important; padding: 0px 20px 0px 20px;">Fugiat cumque aut sint ut corporis voluptatibus delectus. <br>
          Mail: <a style="color: #f3f3f3 !important; text-decoration: none; font-size: 13px !important;" href="mailto:lorem@abbottgroup.com">lorem@abbottgroup.com</a>
          </p>
          <p style="background: #f2f2f2; padding: 10px 0px 10px 0px; font-size: 12px !important; color: #333333;">
            Copyright © All rights reserved.
          </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    // Notify or send email
    transporter.verify().then(console.log).catch(console.error)
    transporter.sendMail({
      from: '"Nodemailer" fnavarrete@voxpop.com.mx',
      to: email,
      subject: notifications[whichNotification].subject,
      text: notifications[whichNotification].notification,
      html: templateHtml,
      attachments: [
        {
          filename: 'logo.png',
          path: './public/images/logo.png',
          cid: 'logo'
        }
      ]
    }).then(info => {
      console.log({ info })
    }).catch(console.error)
  } catch (err) {
    console.log(err)
  }

}