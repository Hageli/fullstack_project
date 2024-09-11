import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import UserImage from 'components/UserImage';
import FlexContent from 'components/FlexContent';
import WidgetWrapper from 'components/widgetWrapper';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

// THIS WIDGET IS USED TO DISPLAY USER INFORMATION
const UserWidget = ({ userId, picturePath }) => {
    const [ user, setUser ] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    // GET USER BASED ON USERID
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if(!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user;

    return (
        <WidgetWrapper>
            <FlexContent
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                {/* USER IMAGE, NAME AND FRIEND AMOUNT */}
                <FlexContent gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                },
                                fontWeight: "500"
                            }}>
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{friends.length} Friends</Typography>
                    </Box>
                </FlexContent>
                <ManageAccountsOutlined />
            </FlexContent>
            <Divider />

            {/* USER LOCATION AND OCCUPATION DISPLAY */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main}} />
                    <Typography colro={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                        <BadgeOutlinedIcon fontSize="large" sx={{ color: main }} />
                        <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>
            <Divider />

            {/* USER POST IMPRESSIONS AND PROFILE VIEWS !NOTICE! ARBITARY VALUES IN THIS CASE */}
            <Box p="1rem 0">
                <FlexContent mb="0.5rem">
                    <Typography color={medium}>Profile viewers</Typography>
                    <Typography color={main} sx={{ fontWeight:"500" }}>{viewedProfile}</Typography>
                </FlexContent>
                <FlexContent>
                    <Typography color={medium}>Post Impressions</Typography>
                    <Typography color={main} sx={{ fontWeight:"500" }}>{impressions}</Typography>
                </FlexContent>
            </Box>
            <Divider />

            {/* USER SOCIAL MEDIA LINKS */}
            <Box p="1rem">
                <Typography fontSize="1rem" color={main} sx={{ fontWeight: "500" }} mb="1rem">Other social media</Typography>
                    <FlexContent gap="1rem" mb="0.5rem">
                        <FlexContent gap="1rem">
                            <img src="../assets/twitter.png" alt="twitter" />
                            <Box>
                                <Typography color={main} sx={{ fontWeight: "500" }}>Twitter</Typography>
                                <Typography color={medium}>@{firstName}</Typography>
                            </Box>
                        </FlexContent>
                        <EditOutlined sx={{ color: main }} />
                    </FlexContent>

                    <FlexContent gap="1rem">
                        <FlexContent gap="1rem">
                            <img src="../assets/linkedin.png" alt="linkedin" />
                            <Box>
                                <Typography color={main} sx={{ fontWeight: "500" }}>LinkedIn</Typography>
                                <Typography color={medium}>@{firstName}</Typography>
                            </Box>
                        </FlexContent>
                        <EditOutlined sx={{ color: main }} />
                    </FlexContent>
                </Box>
        </WidgetWrapper>
    )
};
export default UserWidget;