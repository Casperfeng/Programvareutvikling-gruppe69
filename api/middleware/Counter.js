const sendQuery = require("../database");
const addOrder = require("../helpfunctions").addOrder;
const emailController = require("../middleware/email");

class Counter {
  constructor(productID, endDate, pool) {
    this.timer = null;
    this.productID = productID;
    this.endDate = endDate;
    this.startTimer(productID, pool);
  }
  startTimer(productID, pool) {
    const timeRemaining = this.endDate - new Date().getTime();
    this.timer = setTimeout(async () => {
      let sqlquery =
        "SELECT productID,sellerID,highestBidder,endDate from products WHERE productID=" +
        productID +
        ";";
      const product = await sendQuery(pool, sqlquery);
      if (product[0]) {
        if (product[0].highestBidder != 0) {
          sqlquery =
            "SELECT CONCAT(seller.firstName,' ',seller.lastName) as sellerName, \
          seller.email as sellerEmail, \
          seller.phoneNumber as sellerPhone, \
          CONCAT(buyer.firstName,' ',buyer.lastName) as buyerName, \
          buyer.email as buyerEmail,\
          buyer.phoneNumber as buyerPhone, \
          product.title as title, \
          product.highestBid as price \
          FROM products as product \
          INNER JOIN users as seller ON product.sellerID = seller.userID \
          INNER JOIN users as buyer ON product.highestBidder = buyer.userID \
          WHERE product.productID = " +
            product[0].productID +
            "; ";
          const emailparams = await sendQuery(pool, sqlquery);
          const EC = new emailController();
          EC.sendEmail(emailparams[0]);

          addOrder(
            pool,
            product[0].highestBidder,
            product[0].sellerID,
            product[0].productID,
            0,
            0
          );
        }
      }
    }, timeRemaining);
  }
}
module.exports = Counter;
