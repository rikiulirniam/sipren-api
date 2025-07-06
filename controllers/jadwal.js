const Jadwal = require('../models/jadwal');
const { getHariWIB, getWaktuWIB } = require('../utils/status');

module.exports = {
  async all(req, res){
    const data = await Jadwal.all();
    if(data.rows.length){
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

        data.map((e) => {
          if(
            e.jadwal_mulai <= getWaktuWIB() && 
            e.jadwal_selesai >= getWaktuWIB()
          ){
            e.status = true;
          }else{
            e.status = false
          }
        })

        return res.status(200).json(data)
    },
  async create(req, res) {
    const {
      id_kelas,
      hari,
      jadwal_mulai,
      jadwal_selesai,
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

    try {
      // === Validasi konflik ruangan ===
      const ruangConflict = await Jadwal.checkRuangan(id_ruang, hari, jadwal_selesai, jadwal_mulai);
      if (ruangConflict.rows.length > 0) {
        return res.status(409).json({ message: "Ruangan sudah digunakan pada waktu ini." });
      }

      // === Validasi konflik kelas ===
      const kelasConflict = await Jadwal.checkJadwal(id_kelas, hari, jadwal_selesai, jadwal_mulai);

      if (kelasConflict.rows.length > 0) {
        return res.status(409).json({ message: "Kelas sudah memiliki jadwal lain di waktu ini." });
      }

      // === Insert ke tabel jadwal ===
      await Jadwal.create(id_kelas, hari, jadwal_mulai, jadwal_selesai, id_mapel, id_ruang, id_user);

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
    
    
    try {
  
      const data = await Jadwal.find(id_jadwal);
      if(data.length === 0) return res.status(404).json({message : "Jadwal tidak ditemukan"})
      // === Validasi konflik ruangan ===
      const ruangConflict = await Jadwal.checkRuangan(id_ruang, hari, jadwal_selesai, jadwal_mulai, id_jadwal);
      if (ruangConflict.rows.length > 0) {
        return res.status(409).json({ message: "Ruangan sudah digunakan pada waktu ini." });
      }

      // === Validasi konflik kelas ===
      const kelasConflict = await Jadwal.checkJadwal(id_kelas, hari, jadwal_selesai, jadwal_mulai, id_jadwal);

      if (kelasConflict.rows.length > 0) {
        return res.status(409).json({ message: "Kelas sudah memiliki jadwal lain di waktu ini." });
      }

      // === Insert ke tabel jadwal ===
      await Jadwal.update(id_kelas, hari, jadwal_mulai, jadwal_selesai, id_mapel, id_ruang, id_user,id_jadwal);

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
