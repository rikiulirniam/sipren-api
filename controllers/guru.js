const Guru = require("../models/guru");
const dayjs = require("dayjs")

module.exports = {
    async index(req, res){
        const data = await Guru.all();

        return res.status(200).json({ data });
    }, 

    /**
     * @param {request} req
     * @param {response} res
     */

    async create(req, res){
        const {nama_guru, no_hp} = req.body;
        const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        await Guru.create([nama_guru, no_hp, currentDateTime]);

        res.status(200).json({ msg: "berhasil create"});
    }
}