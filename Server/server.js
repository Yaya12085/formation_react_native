const express = require("express");
const connectDb = require("./config/db");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

const app = express();

const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});
app.use("/users", userRoute);
app.use("/posts", postRoute);

connectDb();

// Démarrer le serveur
app.listen(port, () => {
  console.log("Server connected at http://localhost:" + port);
});
