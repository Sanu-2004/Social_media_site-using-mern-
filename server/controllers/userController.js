const User = require("../models/userModel");
const cloudinary = require("../utils/cloudinary");
const bycrypt = require("bcryptjs");


const getProfile = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username }).populate("posts").populate({
            path: "posts", populate: {
                path: 'postedBy',
                select: ["email", "name","username","profilePic"],
            },
        }).populate({path:"linkers", select:["email","name","username","profilePic","_id"]}).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.posts.sort((a, b) => b.createdAt - a.createdAt);
        return res.status(200).json(user);

    } catch (error) {
        console.log("Error in getProfile", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, username, email, bio, profilePic, link } = req.body;
        if (!name && !username && !email && !bio && !profilePic && !link) {
            return res.status(400).json({ error: "Please provide at least one field to update" });
        }
        if (username) {
            const usernameExists = await User.findOne({ username });
            if (usernameExists) {
                return res.status(400).json({ error: "Username already exists" });
            }
        }
        if (email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ error: "Email already exists" });
            }
        }
        const id = req.user._id;
        const user = await User.findById(id).select("-password");
        if (name) {
            user.name = name;
        }
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (bio) {
            user.bio = bio;
        }
        if (profilePic) {
            const image = await cloudinary.uploader.upload(profilePic, {
                folder: "profilePics",
                width: 200,
                height: 200,
            });
            user.profilePic = image.secure_url;
            try{
            await cloudinary.uploader.destroy(profilePic.split("/").pop().split(".")[0]);
            }catch(error){
                console.log("Error in deleting image from cloudinary",error);
            }
        }
        if (link) {
            user.link = link;
        }
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in updateProfile", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const updatePassWord = async (req, res)=>{
    try {
        const {password ,confirmPassword} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords do not match"});
        }
        const id = req.user._id;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password,salt);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({message:"Password updated successfully"});
    } catch (error) {
        console.log("error in updatePassword" + error);
        res.status(500).json({ error: "Internal Server" });
    }

}

const deleteProfile = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await User.findByIdAndDelete(id);
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in deleteProfile", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const userSuggestions = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id);
        const users = await User.aggregate([
            { $match: { _id: { $ne: id, $nin: req.user.linked } } },
            { $sample: { size: 15 } },
            { $project: { email: 1, name: 1, profilePic: 1, username:1, linkers:1 } },
        ]);
        return res.status(200).json(users.slice(0, 5));
    } catch (error) {
        console.log("Error in userSuggestions", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const linkUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userProfile = await User.findById(id);
        if (!userProfile) {
            return res.status(404).json({ error: "User not found" });
        }
        const myProfile = await User.findById(req.user._id).select(["-password", "-posts"]);
        if (myProfile.linked.includes(id)) {
            myProfile.linked.pull(id);
            userProfile.linkers.pull(req.user._id);
        }else{
            myProfile.linked.push(id);
            userProfile.linkers.push(req.user._id);
        }
        await Promise.all([myProfile.save(), userProfile.save()]);
        return res.status(200).json(myProfile);
    } catch (error) {
        console.log("Error in linkUser", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const searchUser = async (req, res) => {
    try {
        const username = req.query.u;
        const users = await User.find({$text:{$search:username}}).select(["email", "name","username","profilePic","_id", "linkers"]);
        return res.status(200).json(users);
    } catch (error) {
        console.log("Error in searchUser", error);
        res.status(500).json({ error: "Internal server error" });        
    }
};




module.exports = { updateProfile, deleteProfile, getProfile, userSuggestions, linkUser, searchUser, updatePassWord };
