const users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

module.exports = {
  /**
   * @param {Request} req
   * @param {Response} res
   * @returns
   */

  async all(req, res) {
    const data = await users.all();
    return res.status(200).json({ data });
  },

  async create(req, res) {
    const { username, nama, password, level } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Lengkapi Form!" });
    }

    if (!nama) {
      return res.status(400).json({ message: "Nama minimal 4 karakter." });
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
      await Users.create([username, nama, hashPassword, level]);
      return res.status(200).json({ message: "Create User berhasil" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "terjadi error pada server. " });
    }
  },

  async update(req, res) {
    const { id_user } = req.params;

    const { username, nama, password, level } = req.body;
    
    try {
      const user = await Users.findById(id_user);

      if (user.length === 0) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      let hashPassword = user.password; // Gunakan password lama jika tidak ada password baru

      if (password) {
        const salt = await bcrypt.genSalt();
        hashPassword = await bcrypt.hash(password, salt);
      }

      // Pastikan parameter sesuai dengan urutan yang diharapkan di model Users.update
      await Users.update(id_user, username, nama, hashPassword, level);

      return res.status(200).json({ message: "Berhasil update user" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Terjadi error pada server" });
    }
  },
  async delete(req, res) {
    const { id_user } = req.params;

    if (!Number.isInteger(Number(id_user)) || !id_user) {
      return res.status(400).json({
        message: "terjadi error id_user",
      });
    }

    try {
      const data = await Users.delete(id_user);
      return res.status(200).json({
        message: "berhasil delete user",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "terjadi error pada server" });
    }
  },

  async show(req, res) {
    const { id_user } = req.params;
    try {
      const user = await Users.findById(id_user);

      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: "Terjadi error pada server" });
    }
  },
};
