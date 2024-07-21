const Post = require("../models/postModel");
const User = require("../models/userModel");
const cloudanary = require("../utils/cloudinary");

const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { image } = req.body;
        if (!text && !image) {
            return res.status(400).json({ error: "Some info needed" });
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if(image){
            const imgUrl = await cloudanary.uploader.upload(image,{
                folder:"posts",
                width: 500,
            });
            image = imgUrl.secure_url;
        }
        const post = new Post({
            postedBy: req.user._id,
        });
        if (text) post.text = text;
        if (image) post.image = image;
        user.posts.push(post._id);

        await Promise.all([post.save(), user.save()]);

        return res.status(201).json(post);
    } catch (error) {
        console.log("Error in createPost", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getPosts = async (req, res) => {
    try {
        const id = req.user._id;
        const allPost = await Post.find({ postedBy: {$ne : id} }).populate("postedBy");
        if (!allPost) {
            return res.status(404).json({ error: "User not found" });
        }else if(allPost.length === 0){
            return res.status(404).json({ error: "No posts found" });
        }else{
            allPost.map((post) => {
                post.postedBy.password = undefined;
                post.postedBy.posts = undefined;
                post.postedBy.linked = undefined;
                post.postedBy.linkers = undefined;
                post.postedBy.bio = undefined;
                return post;
            });
        }
        return res.status(200).json(allPost.sort((a,b) => b.createdAt - a.createdAt));
    } catch (error) {
        console.log("Error in getPosts", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const getPost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id).populate("postedBy").populate("comments.commentedBy");
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        post.postedBy.password = undefined;
        post.postedBy.posts = undefined;
        post.postedBy.linked = undefined;
        post.postedBy.linkers = undefined;
        post.comments.map((comment) => {
            comment.commentedBy.password = undefined;
            comment.commentedBy.posts = undefined;
            comment.commentedBy.linked = undefined;
            comment.commentedBy.linkers = undefined;
            return comment;
        });
        return res.status(200).json(post);
    } catch (error) {
        console.log("Error in getPost", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        const user = await User.findById(req.user._id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.postedBy.toString() !== user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        user.posts.pull(post._id);
        await Promise.all([user.save(), Post.findByIdAndDelete(id)]);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.log("Error in deletePost", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const likePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.likes.includes(req.user._id)) {
            post.likes.pull(req.user._id);
        } else {
            post.likes.push(req.user._id);
        }
        await post.save();
        return res.status(200).json(post);
    } catch (error) {
        console.log("Error in likePost", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const commentPost = async (req, res) => {
    try {
        const { id, text } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Some info needed" });
        }
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        post.comments.push({ text, commentedBy: req.user._id });
        await post.save();
        return res.status(200).json(post);
    } catch (error) {
        console.log("Error in commentPost", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.body;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        post.comments.pull(commentId);
        await post.save();
        return res.status(200).json(post);
    } catch (error) {
        console.log("Error in deleteComment", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { createPost, getPosts, getPost, deletePost, likePost, commentPost, deleteComment };