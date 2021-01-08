const router = require('express').Router();
const auth = require ("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require ("jsonwebtoken");
const User = require("../models/userModel");

router.post ("/register", async (req, res) => {
    try {
        let {email, password, passwordCheck, displayName} = req.body;

        // Validate user entry
        
        if (!email || !password || !passwordCheck)
            return res.status(400).json({msg: "Please enter all required fields"});
        if (password.length < 5)
            return res
                .status(400)
                .json({msg: "Your password is less than 5 characters long"});
        if (password !== passwordCheck)
            return res
                .status(400)
                .json({msg: "Your passwords do not match"});
        
        const existingUser = await User.findOne({email: email})
        if (existingUser)
            return res
                .status(400)
                .json({msg: "Email already exists"});
        
        if (!displayName) displayName = email;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            email,
            password: passwordHash,
            displayName
        });
        const savedUser = await newUser.save();
            res.json(savedUser);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

router.post ("/login", async (req,res) => {
    try {
        const {email, password} = req.body;

        // Validate credentials
        if (!email || !password) 
            return res.status(400).json({msg: "Please enter all required fields"});

        const user = await User.findOne ({email: email});
        if (!user) 
            return res
                .status(400)
                .json({msg: "No account with email registered"});
                
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json ({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
            },
        });
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

router.delete ("/delete", auth, async (req,res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

router.post("/tokenIsValid", async (req,res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);
        
        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        
        return res.json(true); 
    } catch (error) {
        res.status(500).json({error: 'fnork' + error.message})
    }
});

router.get ("/", auth, async (req,res) =>{
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        id: user._id,
    });
})

module.exports = router;
