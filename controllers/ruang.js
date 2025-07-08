const Ruang = require("../models/ruang")

module.exports = {
    async all(req, res){
        const data = await Ruang.all();
        return res.status(200).json({data})
    },

    async create(req, res){
        const {nama_ruang} = req.body;

        if(!nama_ruang){
            return res.status(422).json({message : "Nama ruang harus diisi"})
        }
        
        const ruangExist =await Ruang.find(nama_ruang);
        if(ruangExist.length !== 0) {
            return res.status(402).json({message : "Ruang sudah ada"})
        }
        try {            
            const newRuang = await Ruang.create(nama_ruang);
            return res.status(200).json({message : `Berhasil membuat ruang ${newRuang}`})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message : "Ada masalah pada server"})   
        }
    },

    async delete(req,res){
        const {id_ruang} = req.params;
        const ruangExist = await Ruang.findById(id_ruang);
        if(ruangExist.length === 0){
            return res.status(404).json({message : "Ruang not found"})
        }
        
        try {
            const deletedRuang = await Ruang.delete(id_ruang);
            return res.status(200).json({message : `Ruang ${deletedRuang} berhasil dihapus`})
        } catch (err) {
            console.log(err);
            return res.status(500).json({message : "Ada masalah pada server"})
        }

    }
}