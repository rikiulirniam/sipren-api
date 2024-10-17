const express = require("express");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const port = process.env.PORT ;

app.use(cookieParser()) 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/main"));
app.use('/jurusan', require('./routes/jurusan'));
app.use('/kelas', require('./routes/kelas'));
app.use('/mapel', require('./routes/mapel'));
app.use('/materi', require('./routes/materi'));
app.use('/presensi', require('./routes/presensi'));
app.use('/guru', require('./routes/guru'));
app.use('/siswa', require('./routes/siswa'));
app.use('/tingkat', require('./routes/tingkat'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(
    "[server] server berhasil dijalankan di http://127.0.0.1:" + port
  );
});
