import express from "express";
import api from "./routes/api";

const app = express();
app.use(express.static("images"));

app.use("/api", api);

app.listen(3000, () => {
  console.log("App is running on port 3000");
});

export default app;
