const Siswa = require("../models/siswa");

module.exports = {
    /**
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */

    async index(req, res) {
        const data = await Siswa.all();

        return res.status(200).json({ data })
    }, 

    
}