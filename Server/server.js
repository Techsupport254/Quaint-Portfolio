require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "*" }));

// connect to MongoDB using promises
mongoose
	.connect(
		"mongodb+srv://OptiSoft:PHAyTp3oLZoNlINf@optisoft.97dvunu.mongodb.net/OptiSoft?retryWrites=true&w=majority"
	)

	.then(() => {
		console.log("MongoDB connection established");

		// set up routes after the database connection is established
		app.get("/", (req, res) => {
			res.send("Hello, world!");
		});

		app.use("/api", require("./Routes/MailRoute"));

		// debug the connection
		mongoose.connection.on("error", (err) => {
			console.error("MongoDB connection error:", err);
		});

		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
	});

module.exports = app;
