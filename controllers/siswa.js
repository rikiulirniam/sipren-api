const siswa = require('../models/siswa.js');

module.exports = {
    async index(req, res) {
        const data = await siswa.all();
        
        return res.status(200).json({ data });
    },
    /**
     * @param {Request} req 
     * @param {Response} res 
     */

    async store(req, res){
        const {rfid, nama, jenis_kelamin, tempat_lahir, tanggal_lahir,alamat,no_hp,id_kelas} = req.body;
        const data = await siswa.create([rfid, nama, jenis_kelamin, tempat_lahir, tanggal_lahir,alamat,no_hp,id_kelas]);

        return res.status(200).json({
            message:"berhasil insert",
            data: {
                insertID : data.insertID
            },
            status: 201
        })
    },
    /**
     * @param {Request} req
     *@param {response} res
     */

    async update(req, res){
        const {nis} = req.params;
        const {rfid, nama, jenis_kelamin, tempat_lahir, tanggal_lahir,alamat,no_hp,id_kelas} = req.body;

        const updateSiswa = {
            rfid: rfid,
            nama: nama,
            jenis_kelamin: jenis_kelamin,
            tempat_lahir: tempat_lahir,
            tanggal_lahir: tanggal_lahir,
            alamat: alamat,
            no_hp: no_hp,
            id_kelas: id_kelas
        }

        const data = await siswa.update(nis, updateSiswa);

        return res.status(200).json({
            message: 'berhasil update',
            data: {
                nis: nis.nis,
                updatedData :data.updatedData,
            },
            status: 201
        })
    },

    /**
     * @param {Request} req
     * @param {response} res
     */

    async delete(req, res){
        const {nis} = req.params;

        const data = await siswa.delete(nis);

        return res.status(200).json({
            message: 'berhasil delete',
            status: 201,
        })
    }


    
}