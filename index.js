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

dotenv.config();

// Resolve the absolute path of the current directory
const __dirname__ = path.resolve();

// Set up the static files directory
const viewsDirectoryPath = path.join(__dirname__, 'views/build');
app.use(express.static(viewsDirectoryPath));

// Connect to the database
db();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use(router);

// Error middleware
app.use(errorMiddleware);

// Start the server
app.listen(Port, () => {
    console.log("Server is running on port:", Port);
});
