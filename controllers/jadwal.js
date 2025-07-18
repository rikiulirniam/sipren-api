const Jadwal = require('../models/jadwal');
const Mapel = require('../models/mapel');
const Presensi = require('../models/presensi');
const { getHariWIB, getWaktuWIB } = require('../utils/status');

module.exports = {
  async all(req, res){
    const data = await Jadwal.all();
    if(data.rows.length === 0){
      return res.status(404).json({message : "Belum ada jadwal dibuat"})
    }
    return res.status(200).json({data : data.rows})
  },
    async index(req, res){
        const {user} = req
        
        const data = await Jadwal.findByUser(user.id, getHariWIB());
        
        if(!data || data.length <= 0){
            return res.status(404).json({message : "Jadwal anda kosong hari ini"})
        }

        
        
         const now = getWaktuWIB(); // agar tidak dipanggil berulang

        const result = await Promise.all(
          data.map(async (e) => {
            const latestPresensi = await Presensi.findPresensiByJadwal(e.id_jadwal);
            e.presensi_selesai = latestPresensi || null;

            e.status = e.jadwal_mulai <= now && e.jadwal_selesai >= now;

            return e;
          })
        );

        return res.status(200).json(result)
    },

  async create(req, res) {
    const {
      id_kelas,
      hari,
      jadwal_mulai,
      jadwal_selesai,
      pecahan_absen,
      id_mapel,
      id_ruang,
      id_user
    } = req.body;

    if (
      !id_kelas ||
      !hari ||
      !jadwal_mulai ||
      !jadwal_selesai ||
      !id_mapel ||
      !id_ruang ||
      !id_user
    ) {
      return res.status(422).json({ message: "Semua kolom harus diisi" });
    }


      if(!pecahan_absen){
        return res.status(422).json({
          message : "kolom pecahan_absen tidak boleh kosong"
        })
      }
      if(pecahan_absen !== "besar" && pecahan_absen !== "kecil" && pecahan_absen !== "semua"){
        return res.status(422).json({message : "kolom pecahan_absen harus besar, kecil, atau semua"})
      }

    try {
      // === Validasi konflik ruangan ===
      const ruangConflict = await Jadwal.checkRuangan(id_ruang, hari, jadwal_selesai, jadwal_mulai);
      if (ruangConflict.rows.length > 0) {
        return res.status(409).json({ message: "Ruangan sudah digunakan pada waktu ini." });
      }

      // === Validasi konflik kelas ===
      const kelasConflicts = await Jadwal.checkJadwal(id_kelas, hari, jadwal_selesai, jadwal_mulai);

      const existingPecahan = kelasConflicts.rows.map(row => row.pecahan_absen);

      if (existingPecahan.includes("semua") || pecahan_absen === "semua" && existingPecahan.length > 0) {
        return res.status(409).json({ message: "Kelas sudah memiliki jadwal pecahan lain, tidak bisa menggunakan 'semua'" });
      }

      if (existingPecahan.includes(pecahan_absen)) {
        return res.status(409).json({ message: `Kelas sudah memiliki jadwal absen '${pecahan_absen}' di waktu yang sama` });
      }

      // === Insert ke tabel jadwal ===
      await Jadwal.create(id_kelas, hari, jadwal_mulai, jadwal_selesai, id_mapel, id_ruang, id_user, pecahan_absen);

      return res.status(200).json({ message: "Berhasil membuat jadwal." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
  }, 
  async update(req, res){
    const {id_jadwal} = req.params
    const {
      id_kelas,
      hari,
      jadwal_mulai,
      jadwal_selesai,
      pecahan_absen,
      id_mapel,
      id_ruang,
      id_user
    } = req.body;


    if (
      !id_kelas ||
      !hari ||
      !jadwal_mulai ||
      !jadwal_selesai ||
      !id_mapel ||
      !id_ruang ||
      !pecahan_absen ||
      !id_user
    ) {
      return res.status(422).json({ message: "Semua kolom harus diisi" });
    }
    
    
    try {
  
      const data = await Jadwal.find(id_jadwal);
      if(data.length === 0) return res.status(404).json({message : "Jadwal tidak ditemukan"})
      // === Validasi konflik ruangan ===
      const ruangConflict = await Jadwal.checkRuangan(id_ruang, hari, jadwal_selesai, jadwal_mulai, id_jadwal);
      if (ruangConflict.rows.length > 0) {
        return res.status(409).json({ message: "Ruangan sudah digunakan pada waktu ini." });
      }

      // === Validasi konflik kelas ===
      const kelasConflicts = await Jadwal.checkJadwal(id_kelas, hari, jadwal_selesai, jadwal_mulai, id_jadwal);

      const existingPecahan = kelasConflicts.rows.map(row => row.pecahan_absen);

      if (existingPecahan.includes("semua") || pecahan_absen === "semua" && existingPecahan.length > 0) {
        return res.status(409).json({ message: "Kelas sudah memiliki jadwal pecahan lain, tidak bisa menggunakan 'semua'" });
      }

      if (existingPecahan.includes(pecahan_absen)) {
        return res.status(409).json({ message: `Kelas sudah memiliki jadwal absen '${pecahan_absen}' di waktu yang sama` });
      }

      // === Insert ke tabel jadwal ===
      await Jadwal.update(id_kelas, hari, jadwal_mulai, jadwal_selesai, id_mapel, id_ruang, id_user, pecahan_absen,id_jadwal);

      return res.status(200).json({ message: "Berhasil memperbarui jadwal." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }

  },

  async detail(req, res){
    const {id_jadwal} = req.params;
    const data = await Jadwal.find(id_jadwal);

    if(data.length === 0) return res.status(404).json({message : "Jadwal tidak ditemukan"})

    return res.status(200).json({data : data[0]})
  },

  async delete(req, res){
    const {id_jadwal} = req.params;
    const data = await Jadwal.find(id_jadwal);

    if(data.length === 0) return res.status(404).json({message :"Jadwal tidak ditemukan"})
      
      await Jadwal.delete(id_jadwal);
     return res.status(200).json({message : "Jadwal berhasil dihapus"})
  }
};
