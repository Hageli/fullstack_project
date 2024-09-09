import User from '../models/User.js'

// GET CURRENT USER
export const getUser = async (req, res) => {
    try {
        // FIND CURRENT ACCOUNT
        const { id } = req.params
        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: "Cannot get current user", error: err.message })
    }
}

// GET CURRENT USER'S FRIENDS
export const getFriends = async (req, res) => {
    try {
        // FIND CURRENT ACCOUNT
        const { id } = req.params;
        const user = await User.findById(id);

        // FIND AND FORMAT CURRENT ACCOUNT'S FRIENDS
        const friends = await Promise.all(user.friends.map((id) => User.findById(id)))
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath}) => {
            return { _id, firstName, lastName, occupation, location, picturePath }})
        
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: "Cannot get friends", error: err.message })
    }
}

// MANAGE FRIENDSHIP
export const manageFriend = async (req, res) => {
    try {
        // FIND CURRENT ACCOUNT AND FRIEND ACCOUNT
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        // REMOVE EACH OTHER AS FRIENDS IF ALREADY ON FRIENDLIST
        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((tempId) => tempId !== friendId)
            friend.friends = friend.friends.filter((tempId) => tempId !== id)
        
        // ADD EACH OTHER AS FRIENDS IF NOT ON FRIENDLIST
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        // FIND AND FORMAT CURRENT ACCOUNT'S FRIENDS
        const friends = await Promise.all(user.friends.map((id) => User.findById(id)))
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath}) => {
            return { _id, firstName, lastName, occupation, location, picturePath }})
        
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: "Friend manage failed", error: err.message })
    }
}