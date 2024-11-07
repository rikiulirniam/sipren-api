const Kelas = require("../models/kelas");

module.exports = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    const { id_jurusan, tingkat } = req.query;

    const data = await Kelas.all(id_jurusan, tingkat);

    return res.json({ data });
  },

  async create(req, res) {
    const { id_jurusan, tingkat, no_kelas } = req.body;

    if (!id_jurusan || !tingkat || !no_kelas) {
      return res.status(400).json({
        message: "semua field harus diisi.",
      });
    }

    if (
      !Number.isInteger(Number(id_jurusan)) ||
      !Number.isInteger(Number(no_kelas))
    ) {
      return res
        .status(400)
        .json({ message: "id_jurusan atau no_kelas harus berupa angka" });
    }

    if (no_kelas > 4 || no_kelas < 1) {
      return res.status(400).json({ message: "no_kelas melewati batas" });
    }

    const data = await Kelas.create([id_jurusan, tingkat, no_kelas]);

    return res.status(200).json({
      message: "berhasil insert kelas",
    });
  },

  async update(req, res) {
    const { id_kelas } = req.params;
    const { id_jurusan, tingkat, no_kelas } = req.body;

    await Kelas.update(id_jurusan, tingkat, no_kelas, id_kelas);

    return res.status(200).json({
      message: "berhasil update kelas",
    });
  },

  async delete(req, res) {
    const { id_kelas } = req.params;
    console.log(id_kelas);
    await Kelas.delete(id_kelas);

    return res.status(200).json({
      message: "berhasil delete kelas",
    });
  },

  async detail(req, res) {
    const { id_kelas } = req.query;
    // console.log(tingkat, akronim, no_kelas);

    const data = await Kelas.find(id_kelas);
    // const { id_jurusan, tingkat } = req.query;
    // console.log(id_jurusan, tingkat);
    return res.status(200).json({
      data,
    });

    // const data = await Kelas.all(id_jurusan, tingkat);
    // return res.status(200).json({
    //     data
    // })
  },
};
