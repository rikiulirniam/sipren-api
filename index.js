const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Import middleware CORS
const Verify = require("./middleware/verifyUser");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*", // Izinkan permintaan dari frontend Vite
    methods: ["GET", "POST", "PUT", "DELETE"], // Izinkan metode HTTP yang dibutuhkan
    allowedHeaders: ["Content-Type", "Authorization"], // Headers yang diizinkan
    credentials: true, // Jika kamu butuh mengirim cookie lintas origin
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", require("./routes/main"));
app.use("/jurusan", require("./routes/jurusan"));
app.use("/kelas", require("./routes/kelas"));
app.use("/mapel", require("./routes/mapel"));
app.use("/materi", require("./routes/materi"));
app.use("/presensi", Verify.verifyToken, require("./routes/presensi"));
app.use("/det_presensi", require("./routes/detailPresensi"));
app.use("/guru", require("./routes/guru"));
app.use("/siswa", require("./routes/siswa"));
app.use("/tingkat", require("./routes/tingkat"));
app.use(
  "/users",
  Verify.verifyToken,
  Verify.verifyLevel,
  require("./routes/users")
);
app.use("/auth", require("./routes/auth"));

// Jalankan server
app.listen(port, () => {
  console.log(
    "[server] server berhasil dijalankan di http://127.0.0.1:" + port
  );
});
