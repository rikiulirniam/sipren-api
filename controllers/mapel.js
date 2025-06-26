const Mapel = require('../models/mapel');
const { update } = require('./users');

module.exports = {
    async index(req, res) {
        const { produktif } = req.params;
        if(!produktif){
            return res.status(422).json({ message: 'endpoint tidak lengkap' });
        }

        const data = await Mapel.detail(produktif);

        res.status(200).json({ data: data.rows });
    },

    async all(req, res){
        const data = await Mapel.all();

        res.status(200).json({data});
    },

    async create(req, res){
        const { nama_mapel, produktif } = req.body;
        if(!nama_mapel){
            return res.status(422).json({message : "Semua kolom harus diisi"});
        }
        
        if (produktif !== 0 && produktif !== 1) {
        return res.status(422).json({ message: 'Field produktif harus 0 atau 1' });
        }
        const data = await Mapel.create(nama_mapel, produktif)

        return res.status(200).json({message : "Mapel berhasil dibuat"});
    },


    async delete(req, res){
        const {id_mapel} = req.params
        const mapel = await Mapel.find(id_mapel);
        
        if(mapel.rows.length === 0){
            return res.status(404).json({
                message : "Mapel tidak ditemukan"
            })
        }

        await Mapel.delete(id_mapel);

        return res.status(200).json({
            message : `Mapel ${mapel.rows[0].nama_mapel} berhasil dihapus`
        })

    }
}