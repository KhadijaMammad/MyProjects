const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const syncDbConnection = require("./config/syncDBConnection");
const allRoutes = require("./routes/routes");
const startCleanupJob = require('./jobs/cleanupJobs')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

syncDbConnection();
startCleanupJob();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use("/api", allRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
