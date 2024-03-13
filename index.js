const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/main"));
app.use('/jurusan', require('./routes/jurusan'));
app.use('/kelas', require('./routes/kelas'));
app.use('/mapel', require('./routes/mapel'));
app.use('/materi', require('./routes/materi'));

app.listen(port, () => {
  console.log(
    "[server] server berhasil dijalankan di http://127.0.0.1:" + port
  );
});
