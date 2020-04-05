const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const FBAuth = require("./util/FBAuth");

const { getProducts, getProduct } = require("./handlers/products");
const {
  signup,
  login,
  addUserDetails,
  getAuthenticatedUser,
} = require("./handlers/users");

//products routes
app.get("/products", getProducts);
app.get("/product/details/:productId", getProduct);

//user routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);
