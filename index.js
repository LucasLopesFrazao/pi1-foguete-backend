const express = require("express");
const cors = require("cors");

const sensorRouter = require("./routers/sensor");
const foguetesRouter = require("./routers/rocket");
const launchRouter = require("./routers/launch");

const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.use("/sensor", sensorRouter);
app.use("/rocket", foguetesRouter);
app.use("/launch", launchRouter);


app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));
