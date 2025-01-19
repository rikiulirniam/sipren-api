const Kelas = require("../models/kelas");
const Mapel = require("../models/mapel");
const Materi = require("../models/materi");
const Presensi = require("../models/presensi");
const dayjs = require("dayjs");
const Siswa = require("../models/siswa");
const DetailPresensi = require("../models/detailPresensi");

module.exports = {
  /**
   * @param {Request} req
   * @param {Response} res
   * @returns
   */

  async all(req, res) {
    const data = await Presensi.all();

    return res.status(200).json({ data });
  },

  async create(req, res) {
    const {
      id_kelas,
      id_user,
      id_mapel,
      jam_started,
      jam_ended,
      materi,
      deskripsi,
    } = req.body;

    if (
      (!id_kelas || !id_user,
      !id_mapel || !jam_started || !jam_ended || !materi || !deskripsi)
    ) {
      return res.status(500).json({
        message: "input data tidak valid",
      });
    }

    const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

    const id_materi = await Materi.create([id_mapel, materi, deskripsi]);
    console.log(id_materi);

    if (!id_materi) {
      return res.status(500).jsos({
        message: "can't get data",
      });
    }

    try {
      const data = await Presensi.create([
        id_materi,
        id_user,
        id_kelas,
        jam_started,
        jam_ended,
        currentDateTime,
      ]);
      if (!data) {
        return res.status(500).json({
          message: "can't get data",
        });
      }

      const siswa = await Siswa.findByKelas(id_kelas);
      for (let item of siswa) {
        await DetailPresensi.create([data, item.nis, "T"]);
      }
      // const data = await Presensi.create([id_materi, id_user, id_kelas, deskripsi, currentDateTime]);
      return res.status(200).json({
        message: "berhasil input presensi",
        data: {
          id_presensi: data,
        },
      });
    } catch (err) {
      return res.status(404).json({ message: "Not Found" });
    }
  },

  async update(req, res) {
    const { id_presensi } = req.params;
    console.log(id_presensi);

    const data = await Presensi.findByPresensi(id_presensi);

    if (data.length === 0) {
      res.status(404).json({
        message: "presensi tidak ditemukan",
      });
    } else {
      const { id_materi, id_user, id_kelas, deskripsi } = req.body;
      const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

      await Presensi.update(
        id_materi,
        id_user,
        id_kelas,
        deskripsi,
        currentDateTime,
        id_presensi
      );

      res.status(200).json({
        message: "berhasil update presensi",
      });
    }
  },

  async delete(req, res) {
    const { id_presensi } = req.params;

    const data = await Presensi.findByPresensi(id_presensi);

    if (data.length === 0) {
      res.status(404).json({
        message: "presensi tidak ditemukan",
      });
    } else {
      await Presensi.delete(id_presensi);
      res.status(200).json({
        message: "berhasil delete presensi",
      });
    }
  },

  async index(req, res) {
    try {
      const { id_kelas } = req.query;
      // console.log("tesss");
      console.log("id_kelas:", id_kelas); // Pastikan ini muncul

      const data = await Presensi.findByKelas(id_kelas);
      res.status(200).json({ data });
    } catch (error) {
      console.error("Error in index function:", error);
      res.status(500).json({ message: "Terjadi kesalahan" });
    }
  },

  async detail(req, res) {
    try {
      const { id_presensi } = req.query;
      console.log(id_presensi);

      const dataPresensi = await Presensi.findByPresensi(id_presensi);
      const dataDetailPresensi = await DetailPresensi.find(id_presensi);
      console.log(dataDetailPresensi);

      dataPresensi[0].detailPresensi = dataDetailPresensi;
      return res.status(200).json({
        Presensi: dataPresensi,
      });
    } catch (err) {
      return res.status(500).json({ message: "error" });
    }
  },
};
