const { db } = require("../util/admin");
// get products
exports.getProducts = (req, res) => {
  db.collection("products")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let products = [];
      data.forEach((doc) => {
        products.push({
          productId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(products);
    })
    .catch((err) => console.error(err));
};

// get one product by its id
exports.getProduct = (req, res) => {
  let productData = {};
  db.doc(`/products/${req.params.productId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Product not found!" });
      }
      productData = doc.data();
      productData.productId = doc.id;

      return res.json(productData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// add to cart
exports.addToCart = (req, res) => {
  let tocartProductData = {};
  const incartProductDocument = db
    .collection("incartProducts")
    .where("username", "==", req.user.username)
    .where("productId", "==", req.params.productId)
    .limit(1);

  const productDocument = db.doc(`/products/${req.params.productId}`);

  let stock;

  productDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        stock = doc.data().stock;

        return incartProductDocument.get();
      } else {
        return res.status(404).json({ error: "Product not found!" });
      }
    })
    .then((data) => {
      if (data.empty) {
        if (stock > 0) {
          return db
            .collection("incartProducts")
            .add({
              productId: req.params.productId,
              username: req.user.username,
              quantity: 1,
              createdAt: new Date().toISOString(),
            })
            .then(() => {
              let remainingStock = stock - 1;
              return productDocument.update({
                stock: remainingStock,
              });
            })
            .then(() => {
              tocartProductData.productId = req.params.productId;
              tocartProductData.username = req.user.username;
              tocartProductData.quantity = 1;
              tocartProductData.createdAt = new Date().toISOString();
              return res.json(tocartProductData);
            });
        } else {
          return res.status(200).json({ error: "Oops, we are out of stock!" });
        }
      } else {
        return res.status(400).json({ error: "Product already in cart!" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// remove from cart
exports.removeFromCart = (req, res) => {
  const incartProductDocument = db
    .collection("incartProducts")
    .where("username", "==", req.user.username)
    .where("productId", "==", req.params.productId)
    .limit(1);

  const productDocument = db.doc(`/products/${req.params.productId}`);

  let stock;

  productDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        stock = doc.data().stock;
        return incartProductDocument.get();
      } else {
        return res.status(404).json({ error: "Product not found!" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res
          .status(400)
          .json({ error: "Product not added to cart before!" });
      } else {
        return db
          .doc(`/incartProducts/${data.docs[0].id}`)
          .delete()
          .then(() => {
            let newStock = stock + 1;
            return productDocument.update({
              stock: newStock,
            });
          })
          .then(() => {
            return res.json({ message: "Removed successfully" });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
