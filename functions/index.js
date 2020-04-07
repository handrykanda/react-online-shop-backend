const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const FBAuth = require("./util/FBAuth");

const {
  getProducts,
  getProduct,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
} = require("./handlers/products");
const {
  signup,
  login,
  addUserDetails,
  getAuthenticatedUser,
} = require("./handlers/users");

//products routes
app.get("/products", getProducts);
app.get("/product/details/:productId", getProduct);
app.get("/product/:productId/incart", FBAuth, addToCart);
app.get("/product/:productId/outcart", FBAuth, removeFromCart);
app.get("/product/:productId/increase", FBAuth, increaseQty);
app.get("/product/:productId/decrease", FBAuth, decreaseQty);

//user routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);
