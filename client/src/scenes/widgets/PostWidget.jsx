import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import FlexContent from 'components/FlexContent';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/widgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';
import axios from 'axios';

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,    
    userPicturePath,
    likes,
    comments,
    isProfile,
    getUserPosts,
    getPosts
}) => {
    const [ isComments, setIsComments ] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId])
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    // TOGGLE LIKE AND CALL GETPOSTS() / GETUSERPOSTS()
    const patchLike = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
        const response = await axios.patch(`http://localhost:3001/posts/${postId}/like`, JSON.stringify({ userId: loggedInUserId }), config)
        dispatch(setPost({ post: response.data }));

        if(isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && (
                <img 
                    width="100%"
                    heigth="100%"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <FlexContent mt="0.25rem">
                <FlexContent gap="1rem">

                    {/* LIKE BUTTON */}
                    <FlexContent gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexContent>

                    {/* COMMENT BUTTON */}
                    <FlexContent gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexContent>
                </FlexContent>


                {/* SHARE BUTTON */}
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexContent>

            {/* COMMENT SECTION */}
            {isComments && (
               <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem"}}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
               </Box>
            )}
        </WidgetWrapper>
    )
};

export default PostWidget;