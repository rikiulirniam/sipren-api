const Siswa = require("../models/siswa");

module.exports = {
    /**
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */

    async all(req, res) {
        const data = await Siswa.all();

        return res.status(200).json({ data })
    }, 

    async index(req, res){
        const {id_kelas} = req.params

        try{
            const data = await Siswa.find(id_kelas);

            if(data.length === 0){
                return res.status(404).json({message: "tidak menemukan data"})
            }

            return res.status(200).json({data})
        }catch(err){
            return res.status(400).json({message: "error"})
        }
    }

    
}