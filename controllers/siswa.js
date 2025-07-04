const Siswa = require("../models/siswa");

module.exports = {
  /**
   * @param {Request} req
   * @param {Response} res
   * @returns
   */

  async all(req, res) {
    const fetch = await Siswa.all();
    const data = fetch.rows;
    return res.status(200).json({ data });
  },

  async index(req, res) {
    const { nis } = req.params;

    try {
      const fetch = await Siswa.find(nis);
      const data = fetch.rows[0];
      if (fetch.rows.length === 0) {
        return res.status(404).json({ message: "tidak menemukan data" });
      }
      
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(500).json({ message: "error" });
    }
  },

  async create(req, res) {
    const { nis, rfid, nama, id_kelas } = req.body;

    try {
      const isDataExist = await Siswa.find(nis)
      if(isDataExist.rows.length != 0){
        return res.status(200).json({message : "Siswa sudah ada"})
      }
      const data = await Siswa.create([nis, rfid, nama, id_kelas]);
      return res.status(200).json({ message: "berhasil create siswa" });
    } catch (err) {
      return res.status(500).json({ message: "error" });
    }
  },

  async createMany(req, res) {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(422).json({ message: "Input harus array" });
  }

  const results = {
    skipped: [],
    failed: []
  };

  for (const item of data) {
    const { nis, rfid, nama, id_kelas } = item;

    try {
      const existing = await Siswa.find(nis);

      if (existing.rows.length > 0) {
        results.skipped.push({ nis, reason: "Sudah ada" });
        continue;
      }

      await Siswa.create([nis, rfid, nama, id_kelas]);
    } catch (err) {
      results.failed.push({ nis, error: err.message });
    }
  }

  return res.status(200).json({
    message: "create siswa selesai",
    ...results
  });
  },

  async update(req, res) {
    const { old_nis } = req.params;

    const { rfid, nama, nis } = req.body;

    try {
      const isDataExist = await Siswa.find(old_nis)
      if(isDataExist.rows.length === 0){
        return res.status(200).json({message : "Data tidak ditemukan"})
      }
    
      const data = await Siswa.update(old_nis, rfid, nama, nis);
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
      const isDataExist = await Siswa.find(nis)
      if(isDataExist.rows.length === 0){
        return res.status(200).json({message : "Data tidak ditemukan"})
      }
      const data = await Siswa.delete(nis);
      return res.status(200).json({ message: "berhasil delete siswa" });
    } catch (err) { 
      console.log(err);
      return res.status(500).json({ message: "error delete" });
    }
  },
};
