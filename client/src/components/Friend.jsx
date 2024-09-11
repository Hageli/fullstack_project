import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'state';
import FlexContent from './FlexContent';
import UserImage from './UserImage';
import { useNavigate } from 'react-router-dom';

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
    const isFriend = friends.find((friend) => friend._id === friendId);

    // ADD / REMOVE FRIEND
    const patchFriend = async () => {
        const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`, {
            method: "PATCH",
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    }

    return (
        <FlexContent>
            <FlexContent gap="1rem">
                
                {/* USER IMAGE */}
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`)
                        navigate(0);
                    }}
                >
                    {/* USER NAME AND OCCUPATION */}
                    <Typography
                        color={main}
                        variant="h5"
                        sx={{
                            "&:hover": { cursor: "pointer", color: palette.primary.light },
                            fontWeight: "500"
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexContent>

            {/* BUTTON TO ADD / REMOVE FRIEND */}
            <IconButton
                onClick={() => patchFriend()}
                sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
            </IconButton>
        </FlexContent>
    )
}

export default Friend;