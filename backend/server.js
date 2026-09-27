const express = require("express");
const cors = require("cors");
require("dotenv").config();

const applicationsRouter = require("./routes/applications");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/applications", applicationsRouter);

app.listen(PORT, () => {
  console.log(`Job Tracker API running on port ${PORT}`);
});
