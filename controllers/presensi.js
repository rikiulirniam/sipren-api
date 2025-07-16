const Kelas = require("../models/kelas");
const Mapel = require("../models/mapel");
const Materi = require("../models/materi");
const Presensi = require("../models/presensi");
const dayjs = require("dayjs");
const Siswa = require("../models/siswa");
const DetailPresensi = require("../models/detailPresensi");
const Jadwal = require("../models/jadwal");

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
      id_jadwal,
      id_mapel,
      materi,
      deskripsi_materi,
    } = req.body;

    // Validasi input dasar
    if ( !id_jadwal || !id_mapel || !materi || !deskripsi_materi) {
      return res.status(422).json({
        message: "Input data tidak valid",
      });
    }

    try {
      // Cek validitas jadwal dan apakah user yang login adalah pemiliknya
      const jadwalUser = await Jadwal.find(id_jadwal);
      if (jadwalUser.length === 0) {
        return res.status(404).json({ message: "Jadwal tidak valid" });
      }

      if (jadwalUser[0].id_user != req.user.id) {
        return res.status(403).json({ message: "Anda bukan guru jadwal ini" });
      }

      const pecahan_absen = jadwalUser[0].pecahan_absen;
      const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

      // Buat materi
      const id_materi = await Materi.create(materi, deskripsi_materi);

      // Buat presensi utama
      const id_presensi = await Presensi.create(
        id_materi,
        id_jadwal,
        currentDateTime
      );

      // Ambil daftar siswa berdasarkan kelas
      const siswaResult = await Siswa.findByKelas(jadwalUser[0].id_kelas);


      // Fungsi bagi siswa sesuai pecahan
      function bagiSiswa(siswa) {
        const tengah = Math.ceil(siswa.length / 2);
        return {
          kecil: siswa.slice(0, tengah),
          besar: siswa.slice(tengah),
          semua: siswa
        };
      }

      const siswaTerpilih = bagiSiswa(siswaResult.rows)[pecahan_absen];

      // Insert semua siswa ke detail_presensi dengan status default "T" (tidak hadir)
      for (const item of siswaTerpilih) {
        await DetailPresensi.create(id_presensi, item.nis, "T", null);
      }

      return res.status(200).json({
        message: "Presensi berhasil dibuat",
        data: {
          id_presensi,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  },

  async update(req, res) {
    const { id_presensi } = req.params;
    const data = await Presensi.findByPresensi(id_presensi);

    if (data.rows.length === 0) {
      return res.status(404).json({
        message: "presensi tidak ditemukan"
      });
    } else {
      const { materi, deskripsi_materi } = req.body;

      await Materi.update(materi, deskripsi_materi, data.rows[0].id_materi)

      res.status(200).json({
        message: "berhasil update presensi",
      });
    }
  },

  async delete(req, res) {
    const { id_presensi } = req.params;

    const data = await Presensi.findByPresensi(id_presensi);

    if (data.rows.length === 0) {
      return res.status(404).json({
        message: "presensi tidak ditemukan",
      });
    } else {
      await DetailPresensi.deleteByPresensi(id_presensi)
      await Presensi.delete(id_presensi);
      return res.status(200).json({
        message: "berhasil delete presensi",
      });
    }
  },

  async index(req, res) {
    try {
      const data = await Presensi.findByUser(req.user.id);
      return res.status(200).json({ data: data.rows });
    } catch (error) {
      return res.status(500).json({ message: "Terjadi kesalahan" });
    }
  },

  async detail(req, res) {
    const { id_presensi } = req.params;
    try {
      const dataPresensi = await Presensi.findByPresensi(id_presensi);
      if(dataPresensi.rows.length === 0) return res.status(404).json({message : "Presensi tidak ditemukan"})
      const dataDetailPresensi = await DetailPresensi.find(id_presensi);
      if(dataDetailPresensi.length === 0) return res.status(404).json({message: "tidak ada siswa yang terdaftar pada Presensi ini"})

      dataPresensi.rows[0].detail_presensi = dataDetailPresensi;

      return res.status(200).json({
        data: dataPresensi.rows[0]
      });
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "internal server error" });
    }
  },

  async end(req, res){
    const {id_presensi} = req.params;

    const presensi = await Presensi.find(id_presensi);
    if(presensi.length === 0){
      return res.status(404).json({message : "Presensi tidak ditemukan"})
    }
    const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    
    await Presensi.end(id_presensi, currentDateTime);

    return res.status(200).json({message : "Presensi berhasil ditutup"})


  }
};
