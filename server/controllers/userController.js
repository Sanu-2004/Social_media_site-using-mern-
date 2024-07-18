const User = require("../models/userModel");
const { cloudinary_js_config } = require("../utils/cloudinary");

const getMyProfile = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id).populate("posts").populate("linkers").select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.linkers.map((linker) => {
            linker.password = undefined;
            return linker;
        });
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMyProfile", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getProfile = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({username}).populate("posts").populate("linkers").select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.linkers.map((linker) => {
            linker.password = undefined;
            return linker;
        });
        return res.status(200).json(user);
    
    } catch (error) {
        console.log("Error in getProfile", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const updateProfile = async (req, res) => {
    try {
        const {name, username, email, bio, profilePic, link} = req.body;
        if(!name && !username && !email && !bio && !profilePic && !link){
            return res.status(400).json({error: "Please provide at least one field to update"});
        }
        if(username){
            const usernameExists = await User.findOne({username});
            if(usernameExists){
                return res.status(400).json({error: "Username already exists"});
            }
        }
        if(email){
            const emailExists = await User.findOne({email});
            if(emailExists){
                return res.status(400).json({error: "Email already exists"});
            }
        }
        const id = req.user._id;
        const user = await User.findById(id).select("-password");
        if(name){
            user.name = name;
        }
        if(username){
            user.username = username;
        }
        if(email){
            user.email = email;
        }
        if(bio){
            user.bio = bio;
        }
        if(profilePic){
            const image = await cloudinary_js_config.uploader.upload(profilePic, {
                folder: "profilePics",
                width: 200,
                height: 200,
            });
            user.profilePic = image.secure_url;
        }
        if(link){
            user.link = link;
        }
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in updateProfile", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id).select("-password");
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        await User.findByIdAndDelete(id);
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in deleteProfile", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { getMyProfile, updateProfile, deleteProfile, getProfile };
