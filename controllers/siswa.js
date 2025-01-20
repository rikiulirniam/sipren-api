const Siswa = require("../models/siswa");
const fs = require("fs");
const fastCsv = require("fast-csv");
const multer = require("multer");
const path = require("path");

module.exports = {
  /**
   * @param {Request} req
   * @param {Response} res
   * @returns
   */

  async all(req, res) {
    const { id_kelas } = req.query;
    const data = await Siswa.all(id_kelas);

    return res.status(200).json({ data });
  },

  async index(req, res) {
    const { nis } = req.params;

    try {
      const data = await Siswa.find(nis);

      if (data.length === 0) {
        return res.status(404).json({ message: "tidak menemukan data" });
      }

      return res.status(200).json({ data });
    } catch (err) {
      return res.status(400).json({ message: "error" });
    }
  },

  async create(req, res) {
    const { nis, rfid, nama, id_kelas } = req.body;

    try {
      const data = await Siswa.create([nis, rfid, nama, id_kelas]);
      return res.status(200).json({ message: "berhasil create siswa" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "sudah ada siswa dengan data tersebut" });
    }
  },

  async update(req, res) {
    const { nis } = req.params;

    const { rfid, nama } = req.body;

    try {
      const data = await Siswa.update(rfid, nama, nis);
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
      const data = await Siswa.delete(nis);
      return res.status(200).json({ message: "berhasil delete siswa" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "error delete" });
    }
  },


  async upload(req, res)
  {
    try{
      if(!req.file){
        return res.status(400).json({message: "File CSV tidak ditemukan"});
      }

      const {id_kelas} = req.body;
      const filePath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();

      let csvData = [];

      if(ext === ".csv"){
        
      }

      const stream = fs.createReadStream(filePath);
      const csvStream = fastCsv
      .parse({ headers: true})
      .on("data", (row) => {
        // if (!row.nis || !row.rfid || !row.nama) {
        //   throw new Error("Kolom pada file CSV tidak sesuai!");
        // }
        csvData.push({...row, id_kelas});
      })
      .on("end", async () => {
        fs.unlinkSync(filePath);

        try{
          const values = csvData.map((row) => [row.nis, row.rfid, row.nama, row.id_kelas]);
          await Siswa.upload(values);
          return res.status(200).json({message:"File CSV berhasil diunggah!"});
        }catch (err){
          if (err.code === "ER_DUP_ENTRY") {
            console.error("Duplicate entry error:", err);
            return res.status(400).json({ message: "Data duplikat terdeteksi! Harap periksa kembali file CSV Anda." });
          } else {
            console.error("Error saat menyimpan ke database:", err);
            return res.status(500).json({ message: "Gagal menyimpan data ke database!" });
          }
        }
      })
      .on("error", (err) => {
        console.error("error bro:", err);
        return res.status(500).json({ message: "Gagal memproses file CSV!" });
      });

      stream.pipe(csvStream);
    }catch (err) {
      onsole.error("Terjadi error pada upload:", err);
      return res.status(400).json({ message: "Siswa dengan data tersebut sudah ada" });
    }
  }
};
