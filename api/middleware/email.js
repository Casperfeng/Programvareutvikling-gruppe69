const nodemailer = require("nodemailer");
const generateSellerEmail = require("../helpfunctions").generateSellerEmail;
const generateBuyerEmail = require("../helpfunctions").generateBuyerEmail;

class emailController {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "budbua69@gmail.com",
        pass: "PUgruppe69"
      }
    });
  }
  sendEmail(emailparams) {
    const mailSeller = {
      from: "budbua69@gmail.com",
      to: emailparams.sellerEmail,
      subject: "Ditt produkt ble solgt",
      text: generateSellerEmail(emailparams)
    };
    const mailBuyer = {
      from: "budbua69@gmail.com",
      to: emailparams.buyerEmail,
      subject: "Du vant budet",
      text: generateBuyerEmail(emailparams)
    };

    this.transporter.sendMail(mailSeller, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    this.transporter.sendMail(mailBuyer, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}
module.exports = emailController;
