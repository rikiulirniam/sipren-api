const Kelas = require("../models/kelas");
const Mapel = require("../models/mapel");
const Materi = require("../models/materi");
const Presensi = require("../models/presensi");
const dayjs = require("dayjs");
const Siswa = require("../models/siswa");
const DetailPresensi = require("../models/detailPresensi");
const Jadwal = require("../models/jadwal");
const db = require("../utils/db");

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
      materi,
      deskripsi_materi,
    } = req.body;

    // Validasi input dasar
    if (!id_jadwal || !materi || !deskripsi_materi) {
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

      const activePresensi = await Presensi.findOpenByJadwal(id_jadwal);
      if (activePresensi) {
        return res.status(409).json({
          message: "Jadwal ini masih memiliki presensi yang aktif",
          data: activePresensi,
        });
      }

      const pecahan_absen = jadwalUser[0].pecahan_absen;
      const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");

      const client = await db.connect();
      let id_presensi;
      try {
        await client.query("BEGIN");
        const materiResult = await client.query(
          "INSERT INTO materi (nama_materi, deskripsi) VALUES ($1, $2) RETURNING id_materi",
          [materi, deskripsi_materi]
        );
        const presensiResult = await client.query(
          `INSERT INTO presensi
            (id_materi, id_jadwal, id_user, id_kelas, jam_started, jam_ended, id_mapel, presensi_mulai)
           VALUES ($1, $2, $3, $4, EXTRACT(HOUR FROM CURRENT_TIMESTAMP)::integer, NULL, NULL, $5)
           RETURNING id_presensi`,
          [
            materiResult.rows[0].id_materi,
            id_jadwal,
            jadwalUser[0].id_user,
            jadwalUser[0].id_kelas,
            currentDateTime,
          ]
        );
        id_presensi = presensiResult.rows[0].id_presensi;
        const siswaResult = await client.query(
          "SELECT nis FROM siswa WHERE id_kelas = $1 ORDER BY nama ASC",
          [jadwalUser[0].id_kelas]
        );


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
          await client.query(
            "INSERT INTO det_presensi (id_presensi, id_siswa, keterangan, present_at) VALUES ($1, $2, $3, $4)",
            [id_presensi, item.nis, "T", null]
          );
        }
        await client.query("COMMIT");
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
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
    }

    if (data.rows[0].id_user != req.user.id) {
      return res.status(403).json({ message: "Anda bukan guru presensi ini" });
    }

    const { materi, deskripsi_materi } = req.body;
    if (!materi?.trim() || !deskripsi_materi?.trim()) {
      return res.status(422).json({ message: "Materi dan deskripsi wajib diisi" });
    }

    await Materi.update(materi.trim(), deskripsi_materi.trim(), data.rows[0].id_materi)

    return res.status(200).json({ message: "berhasil update presensi" });
  },

  async delete(req, res) {
    const { id_presensi } = req.params;
                    `INSERT INTO presensi
                      (id_materi, id_jadwal, id_user, id_kelas, jam_started, jam_ended, id_mapel, presensi_mulai)
                     VALUES ($1, $2, $3, $4, EXTRACT(HOUR FROM CURRENT_TIMESTAMP)::integer, NULL, NULL, $5)
                     RETURNING id_presensi`,
                    [
                      materiResult.rows[0].id_materi,
                      id_jadwal,
                      jadwalUser[0].id_user,
                      jadwalUser[0].id_kelas,
                      currentDateTime,
                    ]
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
    
    const ended = await Presensi.end(id_presensi, currentDateTime);
    if (!ended) {
      return res.status(409).json({ message: "Presensi sudah ditutup" });
    }

    return res.status(200).json({message : "Presensi berhasil ditutup"})


  }
};
