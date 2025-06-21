const Mapel = require('../models/mapel');

module.exports = {
    async index(req, res) {
        const { produktif } = req.params;
        if(!produktif){
            return res.status(400).json({ message: 'error!!' });
        }

        const data = await Mapel.detail(produktif);

        res.status(200).json({ data });
    },

    async all(req, res){
        const data = await Mapel.all();

        res.status(200).json({data});
    }
}