const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { index } = require("./jurusan");
const guru = require("./guru");
// const { register } = require("./users");

//Login, Register, getUser, Logout
//Accesstoken hanya di generate waktu login
//token tidak disimpan dalam database bersamaan dengan kolom user dikarenakan akan melakukan update ketika login

module.exports = {
  async index(req, res) {
    const username = req.username.username;
    const token = req.headers.authorization.split(" ")[1]; // Bearer token
    // Mengambil ID pengguna dari token
    try {
      // Ambil data pengguna dari database menggunakan ID
      const user = await Users.find(username);

      if (!user) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan" });
      }
      user[0].accessToken = token;
      // Mengembalikan informasi pengguna sebagai respons
      res.json({ user: user[0]}); // Sesuaikan dengan properti pengguna yang ingin ditampilkan
      // res.json({ id: user.id, email: user.email, name: user.name }); // Sesuaikan dengan properti pengguna yang ingin ditampilkan
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  },

  async login(req, res) {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username dan password diperlukan" });
      }

      const userData = await Users.find(username);

      if (userData.length === 0) {
        return res.status(401).json({ message: "User tidak ditemukan " });
      }

      const user = userData[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "password salah." });
      }

      const accessToken = jwt.sign(
        { id: user.id_user, username: user.username },
        process.env.ACCESS_JWT_SECRET,
        { expiresIn: "10000s" }
      );
      const refreshToken = jwt.sign(
        { id: user.id_user, username: user.username },
        process.env.REFRESH_JWT_SECRET,
        { expiresIn: "1d" }
      );

      await Users.refreshToken(refreshToken, user.id_user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "login berhasil",
        accessToken,
        user: {
          id: user.id,
          username: user.username,
          level: user.level,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "terjadi error pada server. ", err });
    }
  },

  async register(req, res) {
    const { username, password, level, id_guru } = req.body;
    console.log(username);
    console.log(password);
    console.log(level);
    console.log(id_guru);

    if (!username || !password || !level || !id_guru) {
      return res.status(400).json({ message: "error" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password minimal 6 karakter." });
    }

    const existingUser = await await Users.find(username);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username sudah digunakan." });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      await Users.create([username, hashPassword, level, id_guru]);
      res.status(200).json({ message: "Register Success" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "terjadi error pada server. " });
    }
  },

  async refreshToken(req, res) {
    // digunakan untuk re-Create AccessToken yang digunakan untuk login
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken)
        return res.status(401).json("anda tidak memiliki refreshToken");
      const user = await Users.findRefreshToken(refreshToken);
      if (!user[0]) return res.sendStatus(403);
      jwt.verify(
        refreshToken,
        process.env.REFRESH_JWT_SECRET,
        (err, decoded) => {
          if (err) return res.sendStatus(403);
          const accessToken = jwt.sign(
            { id: user[0].id_user, username: user[0].username },
            process.env.ACCESS_JWT_SECRET,
            { expiresIn: "10000s" }
          );
          res.json({ token: accessToken });
        }
      );
    } catch (error) {
      res.json({ error: error });
    }
  },

  async logout(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findRefreshToken(refreshToken);
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id_user;
    await Users.refreshToken(null, userId);
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "berhasil logout" });
  },
};
