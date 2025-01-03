const Guru = require("../models/guru");
const dayjs = require("dayjs");

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
        const {id_user, nama_guru, no_hp} = req.body;
        if(!id_user || !nama_guru || !no_hp){
            return res.status(400).json({ message: 'error!!' });
        }
        
        const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        await Guru.create([id_user, nama_guru, no_hp, currentDateTime]);

        res.status(200).json({ msg: "berhasil create"});
    }, 

    async update(req, res){
        const {id_guru} = req.query;
        const {nama_guru, no_hp} = req.body;
        const currentDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

        await Guru.update(id_guru, nama_guru, no_hp, currentDateTime);
        res.status(200).json({
            message: "berhasil update guru",
        })
    }
}