const {Router} = require('express')
const router = Router()
const register = require('../../models/registerDB.js')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


const express = require("express")
const app = express()
app.use(express.urlencoded({extended: false}))

router.post('/register', async (req, res) => {
    try {
        const registerData = new register({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        });

        const newRegister = await registerData.save();
        res.redirect('/');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// router.post('/', async (req, res) => {
//     try {
//         const user = await register.findOne({ email: req.body.email });
    
//         if (!user) {
//             return res.render("index", { title: 'Login' });
//         }
//         if (user.password === req.body.password) {
//             jwt.sign({ user }, 'secretkey', (err, token) => {
//                 if (err) {
//                     console.error("Error generating token:", err);
//                     return res.status(500).send("An error occurred");
//                 }
//                 // Send the token back to the client
//                 res.json({ message: 'Login Succesful',token });
//             });
//             return res.render("mainpage", { title: 'To Do List' });
//         } else {
//             return res.render("index", { title: 'Login' });
            
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("An error occurred");
//     }
// });



// router.post('/', async (req, res) => {
//     try {
//         const user = await register.findOne({ email: req.body.email });
    
//         if (!user) {
//             return res.status(400).json({ message: 'User not found' });
//         }
        
//         if (user.password !== req.body.password) {
//             return res.status(401).json({ message: 'Incorrect password' });
//         }
        
//         jwt.sign({ user }, 'secretkey', (err, token) => {
//             if (err) {
//                 console.error("Error generating token:", err);
//                 return res.status(500).json({ message: 'An error occurred' });
//             }
//             // Send the token back to the client
//             res.json({ message: 'Login successful', token });
//         });
        
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: 'An error occurred' });
//     }
// });

router.post('/', async (req, res) => {
    try {
        const user = await register.findOne({ email: req.body.email });
    
        if (!user) {
            return res.status(400).render("index", { title: 'Login', errorMessage: 'User not found' });
        }
        
        if (user.password !== req.body.password) {
            return res.status(401).render("index", { title: 'Login', errorMessage: 'Incorrect password' });
        }
        
        jwt.sign({ user }, 'secretkey', (err, token) => {
            if (err) {
                console.error("Error generating token:", err);
                return res.status(500).render("index", { title: 'Login', errorMessage: 'An error occurred' });
            }
            // Render the mainpage HTML with the token variable
            res.render("mainpage", { title: 'To Do List', token });
        });
        
    } catch (error) {
        console.error("Error:", error);
        res.status(500).render("index", { title: 'Login', errorMessage: 'An error occurred' });
    }
});

app.post('/mainpage', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post created...',
                authData
            })
        }
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
    }
}

// router.get('/register', async (req, res) => {
//     try {
//         const registerAccount = await register.find()
//         if (!registerAccount) {
//             return res.status(404).json({message: 'Todo list items not found'})
//         }
//         res.status(200).json(registerAccount)
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

//post




module.exports = router