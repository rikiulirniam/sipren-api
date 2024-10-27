const users = require("../models/users")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");

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

    async create(req, res){
        const {username, password, level} = req.body;
        console.log(username);
        console.log(password);
        console.log(level);
        
        if(!username || !password || level !== 0){
            return res.status(400).json({ message: 'error' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password minimal 6 karakter.' });
        }

        const existingUser = await await Users.find(username);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Username sudah digunakan.' });
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        try{
            await Users.create([ username, hashPassword, level]);
            return res.status(200).json({ message: 'Create User berhasil'});
        }catch(err){
            console.error(err);
            return res.status(500).json({ message: 'terjadi error pada server. '});
        }
    }, 

    async update(req, res){
        const {id_user} = req.params;
        console.log(id_user);
        const {username, password} = req.body;

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        try{
            const user = await Users.findById(id_user);

            if(user.length === 0){
                return res.status(401).json({message: "user tidak ditemukan"})
            }

            await Users.update(id_user, username, hashPassword);
            return res.status(200).json({message: "berhasil update user"});
            
        }catch(err){
            console.error(err);
            return res.status(500).json({message: "terjadi error pada server"});
        }
    }, 

    async delete(req, res){
        const {id_user} = req.params;

        if(!Number.isInteger(Number(id_user)) || !id_user){
            return res.status(400).json({
                message: "terjadi error id_user"
            });
        }

        try{
            const data = await Users.delete(id_user);
            return res.status(200).json({
                message: "berhasil delete user"
            })
        }catch(err){
            console.error(err);
            return res.status(500).json({message: "terjadi error pada server"});
        }
    }
}