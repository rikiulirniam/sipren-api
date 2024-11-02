const Presensi = require("../models/presensi");
const dayjs = require("dayjs");


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

    async create(req, res){
        const {id_materi, id_guru, id_kelas, deskripsi} = req.body;
        const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

        const data = await Presensi.create([id_materi, id_guru, id_kelas, deskripsi, currentDateTime]);

        res.status(200).json({
            message: "berhasil input presensi"
        })
    }, 

    async update(req, res){
        const {id_presensi} = req.params;
        console.log(id_presensi);

        const data = await Presensi.findByPresensi(id_presensi);

        if(data.length === 0){
            res.status(404).json({
                message: "presensi tidak ditemukan"
            })
        }else{
            const {id_materi, id_guru, id_kelas, deskripsi} = req.body;
            const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    
            await Presensi.update(id_materi, id_guru, id_kelas, deskripsi, currentDateTime, id_presensi);
    
            res.status(200).json({
                message: "berhasil update presensi"
            })
        }
    },

    async delete(req, res){
        const {id_presensi} = req.params;

        const data = await Presensi.findByPresensi(id_presensi);
        
        if(data.length === 0){
            res.status(404).json({
                message: "presensi tidak ditemukan"
            })
        }else{
            await Presensi.delete(id_presensi);
            res.status(200).json({
                message: "berhasil delete presensi"
            })
        }
    },

    async index(req, res){
        const {id_kelas} = req.query;

        const data = await Presensi.findByKelas(id_kelas);

        res.status(200).json({
            data
        })
    }
}