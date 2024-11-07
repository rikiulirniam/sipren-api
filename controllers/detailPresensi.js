const DetailPresensi = require("../models/detailPresensi");

module.exports = {
  async all(req, res) {
    const data = await DetailPresensi.all();

    return res.status(200).json({
      data,
    });
  },

  async create(req, res) {
    const { id_presensi, id_siswa, keterangan } = req.body;

    await DetailPresensi.create([id_presensi, id_siswa, keterangan]);

    return res.status(200).json({
      message: "berhasil create detail presensi",
    });
  },

  async show(req, res) {
    const { id_presensi } = req.params;

    const det = await DetailPresensi.find(id_presensi);

    return res.status(200).json({
      data: det,
    });
  },

  async updateKeterangan(req, res){
    const {rfid} = req.body;

    const data = await DetailPresensi.UpdateKeterangan(rfid);

    return res.status(200).json({
      message: "success update"
    })
  }
};
