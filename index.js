const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require("./routes");
app.use("/", routes);
app.get("/", async (req, res) => {
  try {
    console.log("hello world");
    res.send("hello world!");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});
app.listen(5000, () => {
  console.log("server running on port 5000 http://localhost:5000/test");
});
