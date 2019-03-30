const request = require("supertest");
const app = require("../server").app;
let userID = null;
let token = null;
let productID = null;

describe("Register user", function() {
  const newUser = {
    firstName: "test",
    lastName: "testing",
    phoneNumber: 12345678,
    email: "test@testing.com",
    password: "password",
    zipCode: 1234,
    streetName: "my street 1"
  };

  it("registers a new user", function(done) {
    request(app)
      .post("/api/users/register")
      .send(newUser)
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        userID = res.body.userID;

        token = res.get("x-auth-token");
        done();
      });
  });
});

describe("Log in", function() {
  const login = {
    email: "test@testing.com",
    password: "password"
  };
  it("log in with user credentials", function(done) {
    request(app)
      .post("/api/auth")
      .send(login)
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("Create auction", function() {
  it("should create an auction", function(done) {
    product = {
      title: "Mitt product",
      description: "Selling my great product",
      image: "",
      startingBid: "100",
      sellerID: userID,
      endDate: new Date().getTime() + 6000
    };
    request(app)
      .post("/api/products/newProduct")
      .set({ Accept: "application/json", "x-auth-token": token })
      .send(product)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        productID = res.body.productID;
        done();
      });
  });
});

describe("Delete auction", function() {
  it("should delete an auction", function(done) {
    request(app)
      .delete("/api/products?productID=" + productID)
      .set({ Accept: "application/json" })
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe("Delete user", function() {
  it("delete a user", function(done) {
    request(app)
      .delete("/api/users?userID=" + userID)
      .set("Accept", "application/json")
      .expect(200)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
