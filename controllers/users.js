const users = require("../models/users")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

module.exports = {
            /**
     * @param {Request} req 
     * @param {Response} res 
     * @returns 
     */

    async all(req, res){
        const data = await users.all();


        return res.status(200).json({data})
    },

    /**
     * @param {request} req
     * @param {response} res
     */

    async register(req, res){
        const {username , password, level, token, id_guru} = req.body;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        await users.create([
            username, 
            hashPassword,
            level,
            token, 
            id_guru
        ]);
        res.status(200).json({
            msg: "Register berhasil"
        });


        //input data
        // try{
        //     await users.create({
        //         name : name,
        //         email : email,
        //     })
        // }catch (error){
        //     console.log(error)
        // }
    },

    /**
     * @param {request} req
     * @param {response} res
     */

    async login(req, res){
        // const id_user = user[0].id_user;
        // const token = user[o].token;
        // const level = user[o].level;
        // const id_guru = user[o].id_guru;
        try{
            const user = await users.find(req.body.username);
        // res.status(200).json({ user })
            const match = await bcrypt.compare(req.body.password, user[0].password);
            if(!match) return res.status(400).json({msg: "wrong password"});
            else return res.status(200).json({msg: "benar"});      
        }catch (error){
            res.status(400).json({msg: "Email tidak ditemukan"})
        }
    }
}