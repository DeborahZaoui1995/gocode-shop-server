const fs = require("fs");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});


const Product = mongoose.model("Product", productSchema);

//Get all products / Get Product according to min, max of the slider and category
//Get Product according to title
app.get("/products", (req, res) => {
  try {
    const { min, max, category, title } = req.query;

    Product.find((err, products) => {
      if (title) {
        products = products.filter((product) =>
          product.title
            ? product.title.toLowerCase().includes(title.toLowerCase())
            : false
        );
      }

      if (min) {
        products = products.filter((product) => product.price >= min);
      }

      if (max) {
        products = products.filter((product) => product.price <= max);
      }

      if (category) {
        products = products.filter((product) => product.category === category);
      }

      res.send(products);
    });
  } catch (error) {
    res.send(error);
  }
});

//Get Product By Id
app.get("/products/:id", (req, res) => {
  try {
    const { id } = req.params;

    //Je trouve le product qui a cet id et je le renvoie
    Product.findById(id, (err, product) => {
      res.send(product);
    });
  } catch (error) {
    res.send("Not found");
  }
});

//Add Product
app.post("/products", (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;

    const product = new Product({
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
    });

    product.save();
    res.send("OK!");
  } catch (error) {
    res.send("Not added");
  }
});

//Update product
app.put("/products/:id", (req, res) => {
  try {
    const { id } = req.params;
    // const updatedFields = {};
    // let i = 0;
    // for (field in req.body) {
    //   field ? (updatedFields[field] = req.body[Object.keys(req.body)[i]]) : null;
    //   i++
    // }
    Product.findByIdAndUpdate(id, req.body, (err, product) => {
      res.send(product);
    });
  } catch (error) {
    res.send("Not found");
  }
});

//Delete Product
app.delete("/products/:id", (req, res) => {
  try {
    const { id } = req.params;

    Product.findByIdAndDelete(id, (err, product) => {
      res.send(product);
    });
  } catch (error) {
    res.send("Not found");
  }
});

function initProducts() {
  Product.findOne((err, product) => {
    if (!product) {
      //if the database is empty
      fs.readFile("./initialProducts.json", "utf8", (err, data) => {
        let initialProducts = JSON.parse(data);
        initialProducts = initialProducts.map((product) => ({
          ...product,
          id: uuidv4(),
        }));

        Product.insertMany(initialProducts, (err, products) => {});
      });
    }
  });
}

initProducts();

//connection to the database
mongoose.connect(
  "mongodb://localhost/gocode_shop",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    console.log(error);
    app.listen(8000);
  }
);

// function initProducts() {
//   fs.readFile("./products.json", "utf8", (err, data) => {
//     if (!data) {
//       //si le fichier est vide
//       fs.readFile("./initialProducts.json", "utf8", (err, data) => {
//         let initialProducts = JSON.parse(data);
//         initialProducts = initialProducts.map((product) => ({
//           ...product,
//           id: uuidv4(),
//         }));

//         fs.writeFile("./products.json", JSON.stringify(initialProducts),(err) => {});
//       });
//     }
//   });
// }

// //Get all products / Get Product according to min, max of the slider and category
// app.get("/products", (req, res) => {
//   try {
//     fs.readFile("./products.json", "utf8", (err, data) => {
//       if (!err) {
//         let products = JSON.parse(data);
//         const { min, max, category, title } = req.query;

//         //Get Product according to min, max of the slider and category
//         if (min && max && category) {
//           products = products.filter(
//             (product) =>
//               product.price >= min &&
//               product.price <= max &&
//               product.category === category
//           );
//           res.send(products);
//         }

//         //Get Product according to title
//         else if (title) {
//           products = products.filter((product) =>
//             product.title
//               ? product.title.toLowerCase().includes(title.toLowerCase())
//               : false
//           );
//           res.send(products);
//         } else {
//           res.send(products); //Envoie tout le array au client
//         }
//       } else {
//         res.send(err);
//       }
//     });
//   } catch (error) {
//     res.send(error);
//   }
// });

// //Get Product By Id
// app.get("/products/:id", (req, res) => {
//   try {
//     const { id } = req.params;

//     fs.readFile("./products.json", "utf8", (err, data) => {
//       if (!err) {
//         const products = JSON.parse(data);
//         //L'id des produits est numerique alors que l'id qu'on recoit est un string
//         const product = products.find((product) => product.id === id);
//         if (product)
//         {
//           res.send(product);
//         }
//         else
//         {
//           res.send("Id not found");
//         }
//       }
//       else
//       {
//         res.send(err);
//       }
//     });
//   }
//    catch (error)
//    {
//     res.send("Not found");
//   }
// });

// //Add Product
// app.post("/products", (req, res) => {
//     try
//     {
//         const id = uuidv4();
//         const { title, price, category } = req.body;

//         fs.readFile("./products.json", "utf8", (err, data) => {
//           const products = JSON.parse(data);

//           products.push({ id: id, title: title, price: price, category: category });

//           //Je le rajoute dans le fichier
//           fs.writeFile("./products.json", JSON.stringify(products), (err) => {
//             res.send("OK");
//           });
//         });
//     }
//     catch(error)
//     {
//         res.send("Not added");
//     }

// });

// //Update product
// app.put("/products/:id", (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title } = req.body;

//     fs.readFile("./products.json", "utf8", (err, data) => {
//       const products = JSON.parse(data);
//       //comparaison string to string
//       const product = products.find((product) => product.id === id);

//       if (product) {
//         product.title = title;
//         fs.writeFile("./products.json", JSON.stringify(products), (err) => {
//           res.send("OK");
//         });
//       } else {
//         res.send("Id not found");
//       }
//     });
//   } catch (error) {
//     res.send("Not found");
//   }
// });

// //Delete Product
// app.delete("/products/:id", (req, res) => {
//   try {
//     const { id } = req.params;

//     fs.readFile("./products.json", "utf8", (err, data) => {
//       const products = JSON.parse(data);
//       const newProducts = products.filter((product) => product.id !== id);

//       fs.writeFile("./products.json", JSON.stringify(newProducts), (err) => {
//         res.send("OK");
//       });
//     });
//   } catch (error) {
//     res.send("Not found");
//   }
// });
