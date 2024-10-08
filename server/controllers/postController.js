import Post from '../models/Post.js'
import User from '../models/User.js';

// CREATE A NEW POST
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);

        // CREATING A NEW POST
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save();

        const posts = await Post.find();
        res.status(201).json({posts});

    } catch (err) {
        res.status(409).json({ messaege: "Create post failed", error: err.message})
    }
}

// GET ALL POSTS FOR USER FEED
export const getFeed = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ posts }) 
    } catch (err) {
        res.status(409).json({ messaege: "Couldn't get feed", error: err.message})
    }
}

// GET ALL USERS POSTS
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId });
        console.log(posts)
        res.status(200).json({ posts }) 
    } catch (err) {
        res.status(409).json({ messaege: "Couldn't get user posts", error: err.message})
    }
}

// LIKE A POST
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        // TOGGLE POST LIKE
        if(isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        // UPDATE POST LIKES
        const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes });
        res.status(200).json({ updatedPost })
    } catch (err) {
        res.status(409).json({ messaege: "Couldn't like post", error: err.message})
    }
}