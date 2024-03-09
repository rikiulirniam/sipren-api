const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", require("./routes/main"));

app.listen(port, () => {
  console.log(
    "[server] server berhasil dijalankan di http://127.0.0.1:" + port
  );
});
