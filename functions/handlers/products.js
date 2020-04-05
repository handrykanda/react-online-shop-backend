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
