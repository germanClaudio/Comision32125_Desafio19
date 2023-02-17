const { Router } = require('express')
const routerUsers = Router()
const crypto = require('crypto')

const GetUsers = require('../controllers/usuarios.controller.js')
const getUsers = GetUsers.UsersController
const users = new getUsers()

routerUsers.get('/', users.getAllUsers)

routerUsers.get('/:id', users.getUserById)

routerUsers.get('/username/:username', users.getUserByUsername)

routerUsers.post('/register', users.createNewUser)

routerUsers.post('/:username', users.updateUser)

routerUsers.get('/delete/:id', users.deleteUserById)

routerUsers.post('/login', users.getUserByUsernameAndPassword)

// routerUsers.get("/newUser", (req, res) => {
    
//   let username = req.query.username || "";
//     const password = req.query.password || "";

//     username = username.replace(/[!@#$%^&*]/g, "");

//     if (!username || !password || users[username]) {
//         return res.sendStatus(400);
//     }

//     const salt = crypto.randomBytes(128).toString("base64");
//     const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");

//     users[username] = { salt, hash };

//     res.sendStatus(200);
// })

routerUsers.get("/auth-bloq", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";
  
    username = username.replace(/[!@#$%^&*]/g, "");
  
    if (!username || !password || !users[username]) {
      process.exit(1)
      // return res.sendStatus(400);
    }
  
    const { salt, hash } = users[username];
    const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");
  
    if (crypto.timingSafeEqual(hash, encryptHash)) {
      res.sendStatus(200);
    } else {
      process.exit(1)
      // res.sendStatus(401);
    }
})

routerUsers.get("/auth-nobloq", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";
    username = username.replace(/[!@#$%^&*]/g, "");
  
    if (!username || !password || !users[username]) {
      process.exit(1)
      //return res.sendStatus(400);
    }
    crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
      if (users[username].hash.toString() === hash.toString()) {
        res.sendStatus(200);
      } else {
        process.exit(1)
        //res.sendStatus(401);
      }
    });
});

module.exports = routerUsers