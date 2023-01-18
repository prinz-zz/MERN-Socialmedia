const express = require('express');
const router = express.Router();
const User = require('../models/User');
const cryptoJS = require('crypto-js');


//UPDATE
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                req.body.password = cryptoJS.AES.encrypt(req.body.password, process.env.PASS_CODE).toString();
            } catch (err) {
                res.status(400).json("hello error");
            }
        }
        try {
            const updaterUser = await User.findByIdAndUpdate(req.params.id,
                {
                $set: req.body,
                },
                {new : true}
            );
            res.status(200).json(updaterUser);
        }
        catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json('You are not authorised!')
    }
})

//DELETE
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted!");
        }
        catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(400).json('You are not authorised!')
    }
});


//GET 
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;

    try {
        const user = userId ? await User.findById(userId)
                            : await User.findOne({ username: username });
        const { password, createdAt, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }

});


//FOLLOW A USER
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push : {followers : req.body.userId}});
                await currentUser.updateOne({ $push: { following: req.params.id } });
                res.status(200).json("user has been followed!")
            } else {
                res.status(403).json('You already follow this user!');
            }

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You cnat follow yourself!")
    }
})


//UNFOLLOW A USER
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull : {followers : req.body.userId}});
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json("user has been unfollowed!")
            } else {
                res.status(403).json('You already unfollow this user!');
            }

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You cnat unfollow yourself!")
    }
})

//GET FRIENDS
router.get('/friends/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.following.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendsList = [];
        friends.map((friend) => {
            const { _id, username, profilePic } = friend;
            friendsList.push({_id, username, profilePic});
        })
        
        res.status(200).json(friendsList);
    }
    catch (err) {
        Status(500).json(err)
    }

})


module.exports = router;
