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
}