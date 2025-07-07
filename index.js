const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Import middleware CORS
const Verify = require("./middleware/verifyUser");

dotenv.config();

const app = express();
const host = process.env.HOST || "http://localhost"
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
app.use("/jurusan",Verify.verifyToken, require("./routes/jurusan"));
app.use("/kelas",Verify.verifyToken, require("./routes/kelas"));
app.use("/mapel",Verify.verifyToken, require("./routes/mapel"));
app.use("/materi",Verify.verifyToken, require("./routes/materi"));
app.use("/presensi", Verify.verifyToken, require("./routes/presensi"));
app.use("/detail_presensi",Verify.verifyToken, require("./routes/detailPresensi"));
app.use("/siswa",Verify.verifyToken, require("./routes/siswa"));
app.use("/jadwal", Verify.verifyToken, require("./routes/jadwal"));
app.use("/tingkat",Verify.verifyToken, require("./routes/tingkat"));
app.use("/ruang", Verify.verifyToken, require("./routes/ruang"));
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
    `[server] server berhasil dijalankan di ${host}:${port}` 
  );
});
