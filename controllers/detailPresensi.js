const DetailPresensi = require("../models/detailPresensi");
const Presensi = require("../models/presensi");
const Siswa = require("../models/siswa");

module.exports = {
  async all(req, res) {
    const data = await DetailPresensi.all();

    return res.status(200).json({
      data : data.rows[0],
    });
  },

  async show(req, res) {
    const { id_presensi } = req.params;

    const det = await DetailPresensi.find(id_presensi);

    return res.status(200).json({
      data: det,
    });
  },

  async editKeterangan(req, res){
    const {id_detail_presensi} = req.params
    const {keterangan} = req.body;

    if(!keterangan){
      return res.status(200).json({message : "keterangan harus diisi"})
    }
    const detail_presensi = await DetailPresensi.findById(id_detail_presensi);
      if(detail_presensi.rows.length === 0) {
      return res.status(404).json({message : "data tidak ditemukan"})
    }

    await DetailPresensi.updateKeterangan(keterangan, id_detail_presensi);
    
    return res.status(200).json({message : "keterangan berhasil diubah!"})
  }
  ,
  async present(req, res){
    const {id_presensi} = req.params;
    const {rfid} = req.body;
    
    const presensi = await Presensi.findByPresensi(id_presensi);
    if (presensi.rows.length === 0) {
      return res.status(404).json({
        message: "presensi tidak ditemukan",
      });
    }
    
    const siswa = await Siswa.findByRfid(rfid);
    if(siswa.rows.length === 0){
      return res.status(422).json({
        message: "kartu siswa tidak terdaftar"
      })
    }

    if(presensi.rows[0].id_kelas != siswa.rows[0].id_kelas){
      return res.status(200).json({
        message: `siswa bukan berasal dari kelas ${presensi.rows[0].tingkat} ${presensi.rows[0].akronim} ${presensi.rows[0].no_kelas}`
      })
    }

    const isPresent = await DetailPresensi.findIsPresent(id_presensi, siswa.rows[0].nis);

    if(isPresent.rows[0].keterangan === "H"){
      return res.status(422).json({
        message : "siswa sudah presensi"
      })
    }

    const data = await DetailPresensi.present(rfid, id_presensi);

    return res.status(200).json({
      message: `${data} hadir!`
    })
  }
};
