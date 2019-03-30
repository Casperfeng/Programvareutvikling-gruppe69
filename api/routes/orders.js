//Here we add all the functions for usershandling
const express = require("express");
const router = express.Router();
const sendQuery = require("../database");
let server = require("../../server"); //get pool-connection from server
const generateValuelist = require("../helpfunctions").generateValuelist;
const bodyparser = require("body-parser");

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

//hente relevante orders
router.get("/myOrders", async (req, res) => {
  const userID = req.query.userID;

  const sqlquery =
    "SELECT \
  CONCAT(buyer.firstName,' ',buyer.lastName) AS buyer,\
  buyer.email as buyerEmail,\
  buyer.userID as buyerID,\
  CONCAT(seller.firstName,' ',seller.lastName) AS seller,\
  seller.email as sellerEmail,\
  seller.userID as sellerID,\
  products.title AS product ,\
  products.highestBid AS price , \
  products.productID AS productID,\
  IF(seller.userID=" +
    userID +
    ",0,1) as isSeller \
  FROM orders as o \
  INNER JOIN users as buyer ON o.buyerID=buyer.userID \
  INNER JOIN users as seller ON o.sellerID=seller.userID\
  INNER JOIN products ON o.productID=products.productID WHERE seller.userID=" +
    userID +
    " OR buyer.userID=" +
    userID +
    ";";
  orders = await sendQuery(server.pool, sqlquery);
  for (i = 0; i < orders.length; i++) {
    orders[i] = JSON.parse(JSON.stringify(orders[i]));
  }
  res.send(orders);
});

module.exports = router;
