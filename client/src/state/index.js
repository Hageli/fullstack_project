import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // CHANGE MODE OF WEBSITE
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        // LOG IN CURRENT USER
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        // LOG OUT CURRENTLY LOGGED IN USER
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        // SETTING FRIENDS FOR CURRENTLY LOGGED IN USER
        setFriends: (state, action) => {
            if(state.user) {
                state.user.friends = action.payload.friends
            } else {
                console.error("User friends not found");
            }
        },
        // SET POSTS FOR CURRENTLY LOGGED IN USER
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        // SET A SINGLE POST
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            })
            state.posts = updatedPosts;
        }
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;