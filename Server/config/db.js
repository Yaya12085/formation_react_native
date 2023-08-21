const mongoose = require("mongoose");

const connectDb = () => {
  //Connexion au db
  mongoose
    .connect("mongodb://localhost:27017/Blog", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connecté à MongoDB");
    })
    .catch((error) => {
      console.log("Non connecté à MongoDB", error);
    });
};

module.exports = connectDb;
