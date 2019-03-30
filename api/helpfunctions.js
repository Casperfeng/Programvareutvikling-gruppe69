sendQuery = require("./database");

generateValuelist = valueArray => {
  //INPUT: array of values
  //OUTPUT: string with format "(value1,value2,value3,....)"
  let sqlquery = "(";
  for (let i = 0; i < valueArray.length; i++) {
    if (typeof valueArray[i] === "string") {
      sqlquery += '"' + valueArray[i] + '"';
    } else {
      sqlquery += valueArray[i];
    }
    if (i < valueArray.length - 1) {
      sqlquery += ",";
    } else {
      sqlquery += ");";
    }
  }
  return sqlquery;
};

addOrder = async (
  pool,
  buyerID,
  sellerID,
  productID,
  ratedByBuyer,
  ratedBySeller
) => {
  const valueList = [buyerID, sellerID, productID, ratedByBuyer, ratedBySeller];
  let sqlquery =
    "INSERT INTO orders (buyerID, sellerID, productID, ratedByBuyer, ratedBySeller) VALUES ";
  sqlquery = sqlquery + generateValuelist(valueList);
  await sendQuery(pool, sqlquery);
};

generateSellerEmail = emailparams => {
  let msg =
    "Hei " +
    emailparams.sellerName +
    ", \n \nAuksjonen er nå ferdig og ditt produkt ble solgt for " +
    emailparams.price +
    " kroner. Ta kontakt med kjøper for å fullføre handelen. Her er kontaktinformasjon til kjøper:\n\n\
Navn: " +
    emailparams.buyerName +
    "\n\
Telefonnummer " +
    emailparams.buyerPhone +
    "\n\
Epost " +
    emailparams.buyerEmail +
    "\n\n\
Om kjøperen ikke fullfører sine betalingsforpliktelser kan du rapportere under 'Mine handler' på profilsiden.\n\
mvh\n\
Budbua AS";
  return msg;
};

generateBuyerEmail = emailparams => {
  let msg =
    "Gratulerer " +
    emailparams.buyerName +
    ",\nDu vant budrunden på " +
    emailparams.title +
    "\
  med ditt bud på " +
    emailparams.price +
    " kroner.\n\
Ta kontakt med selger for å fullføre handelen. Her er kontaktinformasjon til selger:\n\n\
Navn: " +
    emailparams.sellerName +
    "\n\
Telefonnummer " +
    emailparams.sellerPhone +
    "\n\
Epost " +
    emailparams.sellerEmail +
    "\n\n\
Om selger ikke leverer produktet eller det produktet ikke stemmer overens med produktbeskrivelsen kan du rapportere under 'Mine handler' på profilsiden.\n\
mvh\n\
Budbua AS";
  console.log(msg);
  return msg;
};

module.exports.generateValuelist = generateValuelist;
module.exports.addOrder = addOrder;
module.exports.generateSellerEmail = generateSellerEmail;
module.exports.generateBuyerEmail = generateBuyerEmail;
