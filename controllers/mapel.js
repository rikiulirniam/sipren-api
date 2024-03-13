const Mapel = require('../models/mapel');

module.exports = {
    async index(req, res) {
        const { produktif } = req.query;

        const data = await Mapel.all(produktif);

        res.status(200).json({ data });
    }
}