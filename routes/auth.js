const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// REGISTER
router.post('/register', async (req, res) => {
    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    // create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const saveUser = await user.save();
        res.send(saveUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

// LOGIN
router.post('/login', async(req, res) => {
    // check email is exist
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email is wrong');

    // check password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    // res.send({message: 'Login success', ...user});
    res.send('Login success');
});

router.get('/', async (req, res) => {
    try {
        const userList = await User.find();
        res.send(userList);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;