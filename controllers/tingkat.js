const tingkat = require("../models/tingkat")

module.exports = {
        /**
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */

    async all(req, res){
        const data = await tingkat.all();

        return res.status(200).json({data})
    }
}