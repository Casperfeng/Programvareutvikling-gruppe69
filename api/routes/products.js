//Here we add all the functions for usershandling
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const sendQuery = require("../database");
const bodyparser = require("body-parser");
let server = require("../../server"); //get pool-connection from server
const generateValuelist = require("../helpfunctions").generateValuelist;

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

//sette inn auksjon
router.post("/newProduct", auth, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image; //forsiktig med filtype
  const startingBid = parseInt(req.body.startingBid);
  const highestBid = parseInt(startingBid);
  const highestBidder = 0; //dersom ingen byr på objektet kan vi sjekke om highestbidder er 0, og terminere annonsen uten en kjøper
  const sellerID = req.body.sellerID;
  const endDate = req.body.endDate; //forsiktig med datatype

  const userValueArray = [
    title,
    description,
    image,
    highestBid,
    highestBidder,
    startingBid,
    sellerID,
    endDate
  ];

  sqlquery =
    "INSERT INTO products (title, description, image, highestBid, highestBidder, startingBid, sellerID, endDate) VALUES " +
    generateValuelist(userValueArray);
  result = await sendQuery(server.pool, sqlquery);
  server.CounterController.addCounter(result.insertId, endDate);
  res.send({ productID: result.insertId });
});

//oppdatere highestBidder
router.put("/newBid", auth, async (req, res) => {
  const userID = req.body.userID;
  const productID = req.body.productID;
  const highestBid = req.body.highestBid;

  const sqlquery =
    "UPDATE products SET highestBid = " +
    highestBid +
    ", highestBidder = " +
    userID +
    " WHERE productID = " +
    productID +
    ";";
  await sendQuery(server.pool, sqlquery);
  res.send("Updated highestBidder where productID = " + productID);
});

//henter auksjoner
router.get("/all", async (req, res) => {
  const sqlquery = "SELECT * FROM products ORDER BY endDate ASC";
  const auctions = await sendQuery(server.pool, sqlquery);
  res.send(auctions);
});

router.delete("/", async (req, res) => {
  const productID = req.query.productID;
  const sqlquery = "DELETE FROM products WHERE productID=" + productID + ";";
  try {
    await sendQuery(server.pool, sqlquery);
  } catch {
    res.status(400);
  }
  res.send("Product deleted where productID = " + productID);
});

module.exports = router;
