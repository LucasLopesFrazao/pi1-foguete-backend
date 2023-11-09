const express = require("express");
const sensorRouter = require("./routers/sensor");

const PORT = 8080;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.use("/sensor", sensorRouter);

app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));
