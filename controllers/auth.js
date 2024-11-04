const Users = require("../models/users");
const Guru = require("../models/guru");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { register } = require("./users");

//Login, Register, getUser, Logout
//Accesstoken hanya di generate waktu login
//token tidak disimpan dalam database bersamaan dengan kolom user dikarenakan akan melakukan update ketika login

module.exports = {
    async login(req, res){
        const {username, password} = req.body;
    
        try{
            if(!username || !password){
                return res.status(400).json({ message: 'Username dan password diperlukan' });
            }
    
            const userData = await Users.find(username);
    
            if(userData.length === 0){
                return res.status(401).json({message: 'User tidak ditemukan '});
            }
    
            const user = userData[0];
    
            const isMatch = await bcrypt.compare(password, user.password);
    
            if(!isMatch) {
                return res.status(401).json({ message: 'password salah.' });
            }  
    
            const accessToken = jwt.sign(
                { id: user.id_user, username: user.username, level: user.level },
                process.env.ACCESS_JWT_SECRET,
                { expiresIn: '27000s' } // token akan kedaluwarsa setelah 600 detik
            );
            const refreshToken = jwt.sign({ id: user.id_user, username: user.username, level: user.level}, process.env.REFRESH_JWT_SECRET, { expiresIn: '1d'});

            await Users.refreshToken(refreshToken, user.id_user);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            
            if(user.level === 0){
                res.status(200).json({
                    message: "Login berhasil sebagai guru",
                    accessToken,
                    user : {
                        id_user : user.id_user,
                        username : user.username,
                        nama : user.nama,
                        level : user.level
                    }
                })
            }else{
                res.status(200).json({
                    message: 'login berhasil sebagai admin',
                    accessToken, 
                    user: {
                        id_user: user.id_user,
                        username: user.username,
                        nama : user.nama,
                        level: user.level,
                    }
                })
            }
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'terjadi error pada server. '});
        }
    },


    async register(req, res){
        const {username, nama, password, level} = req.body;
        console.log(nama)
        
        if(!username || !nama|| !password || level !== 0){
            return res.status(400).json({ message: 'error' });
        }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password minimal 6 karakter." });
    }

    const existingUser = await await Users.find(username);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Username sudah digunakan." });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

        try{
            await Users.create([ username, hashPassword, level]);
            res.status(200).json({ message: 'Register Success'});
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'terjadi error pada server. '});
        }
    },

    async refreshToken(req, res) {
        // digunakan untuk re-Create AccessToken yang digunakan untuk login
        try {
          const refreshToken = req.cookies.refreshToken;
          if (!refreshToken)
            return res.status(401).json("anda tidak memiliki refreshToken");
          const user = await Users.findRefreshToken(refreshToken);
          if (!user[0]) return res.sendStatus(403);
          jwt.verify(
            refreshToken,
            process.env.REFRESH_JWT_SECRET,
            (err, decoded) => {
              if (err) return res.sendStatus(403);
              const accessToken = jwt.sign(
                { id: user[0].id_user, username: user[0].username },
                process.env.ACCESS_JWT_SECRET,
                { expiresIn: "10000s" }
              );
              res.json({ token: accessToken });
            }
          );
        } catch (error) {
          console.log(error);
        }
      }, 
    

    async logout(req, res){
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const user = await Users.findRefreshToken(refreshToken);
        if(!user[0]) return res.sendStatus(204);
        const userId = user[0].id_user;
        await Users.refreshToken(null, userId);
        res.clearCookie('refreshToken');
        return res.status(200).json({message : "berhasil logout"});
    },


  //mendapatkan data user yang login dari token
};
