const Siswa = require("../models/siswa");

module.exports = {
  /**
   * @param {Request} req
   * @param {Response} res
   * @returns
   */

  async all(req, res) {
    const data = await Siswa.all();

    return res.status(200).json({ data });
  },

  async index(req, res) {
    const { nis } = req.params;

    try {
      const data = await Siswa.find(nis);

      if (data.length === 0) {
        return res.status(404).json({ message: "tidak menemukan data" });
      }

      return res.status(200).json({ data });
    } catch (err) {
      return res.status(400).json({ message: "error" });
    }
  },

  async create(req, res) {
    const { nis, rfid, nama, id_kelas } = req.body;

    try {
      const data = await Siswa.create([nis, rfid, nama, id_kelas]);
      return res.status(200).json({ message: "berhasil create siswa" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "error" });
    }
  },

  async update(req, res) {
    const { nis } = req.params;

    const { rfid, nama } = req.body;

    try {
      const data = await Siswa.update(rfid, nama, nis);
      return res.status(200).json({
        message: "Berhasil update data",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "error" });
    }
  },

  async delete(req, res) {
    const { nis } = req.params;
    try {
      const data = await Siswa.delete(nis);
      return res.status(200).json({ message: "berhasil delete siswa" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "error delete" });
    }
  },
};
