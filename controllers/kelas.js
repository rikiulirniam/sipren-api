const Kelas = require("../models/kelas");
const Siswa = require("../models/siswa");

module.exports = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    const { id_jurusan, tingkat, no_kelas } = req.query;

    const data = await Kelas.all(id_jurusan, tingkat, no_kelas);

    return res.json({data: data.rows});
  },

  async create(req, res) {
    const { id_jurusan, tingkat, no_kelas } = req.body;

    if (!id_jurusan || !tingkat || !no_kelas) {
      return res.status(422).json({
        message: "semua kolom harus diisi.",
      });
    }

    if (
      !Number.isInteger(Number(id_jurusan)) ||
      !Number.isInteger(Number(no_kelas))
    ) {
      return res
        .status(422)
        .json({ message: "id_jurusan atau no_kelas harus berupa angka" });
    }

    if (no_kelas > 4 || no_kelas < 1) {
      return res.status(422).json({ message: "no_kelas melewati batas" });
    }

    const findExistData = await Kelas.getIdKelas(tingkat, id_jurusan, no_kelas);
    if(findExistData.length != 0){
      return res.status(422).json({message : "kelas sudah ada"})
    }    
    const data = await Kelas.create(id_jurusan, tingkat, no_kelas);

    return res.status(200).json({
      message: "berhasil insert kelas",
      data: data
    });
  },

  async update(req, res) {
    const { id_kelas } = req.params;
    const { id_jurusan, tingkat, no_kelas } = req.body;

    if (!id_jurusan || !tingkat || !no_kelas) {
      return res.status(422).json({
        message: "semua kolom harus diisi.",
      });
    }

    const findExistData = await Kelas.find(id_kelas);
    if(findExistData.rows.length == 0){
      console.log(findExistData.rows)
      return res.status(404).json({message : "kelas tidak ditemukan."})
    }    

    if (
      !Number.isInteger(Number(id_jurusan)) ||
      !Number.isInteger(Number(no_kelas))
    ) {
      return res
        .status(422)
        .json({ message: "id_jurusan atau no_kelas harus berupa angka" });
    }

    if (no_kelas > 5 || no_kelas < 1) {
      return res.status(422).json({ message: "no_kelas melewati batas" });
    }

    const findExistNewData = await Kelas.getIdKelas(tingkat, id_jurusan, no_kelas);
    if(findExistNewData.length != 0){
      return res.status(422).json({message : "kelas sudah ada"})
    }    


    await Kelas.update(id_jurusan, tingkat, no_kelas, id_kelas);

    return res.status(200).json({
      message: "berhasil update kelas",
    });
  },

  async delete(req, res) {
    const { id_kelas } = req.params;
    if(!id_kelas){
      return res.status(422).json({ message: 'error!!' });
    }

    const existData = await Kelas.find(id_kelas);
    if(existData.rows.length == 0 ){
      return res.status(404).json({message : 'kelas tidak ditemukan'});
    }

    await Kelas.delete(id_kelas);

    return res.status(200).json({
      message: "berhasil delete kelas",
    });
  },

  async detail(req, res) {
    const { id_kelas } = req.params;

    if(!id_kelas){
      return res.status(422).json({ message: 'id_kelas tidak valid' });
    }

    const data = await Kelas.find(id_kelas);

    if(data.rows.length == 0 ){
      return res.status(404).json({message : 'kelas tidak ditemukan'});
    }

    const siswa = await Siswa.findByKelas(id_kelas);
    data.rows[0].daftar_siswa = siswa.rows;

    return res.status(200).json({
      data : data.rows[0]
    });
  },
};
