const express = require("express");
const db = require("./Config/db");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const Port = 8800;
const router = require("./routes/index");
const errorMiddleware = require("./middlewares/errorMiddleware");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");


const __dirname__ = path.resolve(path.dirname(""));
dotenv.config();
app.use(express.static(path.join(__dirname__, "views/build")))
db();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(router);
app.use(errorMiddleware);

app.listen(Port, (err, res) => {
    if (err) {
        console.log("error: " + err);
    }
    console.log("server running on port:" + Port);
});
