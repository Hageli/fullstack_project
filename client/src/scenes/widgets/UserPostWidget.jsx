import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined
} from '@mui/icons-material';
import { 
    Box, 
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery
} from '@mui/material';
import FlexContent from 'components/FlexContent';
import Dropzone from 'react-dropzone';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/widgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';

// POST INPUT WIDGET
const UserPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [ isImage, setIsImage ] = useState(false);
    const [ image, setImage ] = useState(null);
    const [ post, setPost ] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    // SENDS THE POST
    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        if(image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
        const response = await fetch("http://localhost:3001/posts", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        const posts = await response.json();
        dispatch(setPosts(posts));
        setPost("");
        setImage(null);
    }

    return (
        <WidgetWrapper>
            <FlexContent gap="1.5rem">
                {/* USER IMAGE ANDTEXT INPUT FIELD */}
                <UserImage image={picturePath} />
                <InputBase 
                    placeholder='Make a post'
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{ 
                        width: "100%", 
                        backgroundColor: palette.neutral.light, 
                        borderRadius: "2rem", 
                        padding: "1rem 2rem" }}
                />
            </FlexContent>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexContent>
                                <Box
                                    { ...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    wdith="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                        {!image ? (
                                        <p>Add Image</p>
                                        ) : (
                                            <FlexContent>
                                                <Typography>{image.name}</Typography>
                                                <EditOutlined />
                                            </FlexContent>
                                        )}
                                </Box>
                                {image && (
                                    <IconButton onClick={() => setImage(null)} sx={{ wdith: "15%"}}>
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </FlexContent>
                        )}
                    </Dropzone>
                </Box>
            )}
            <Divider sx={{ margin: "1.25rem 0"}} />

            <FlexContent>
                <FlexContent gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&:hover": { cursor: "pointer", color: medium }}}
                    >
                        Image
                    </Typography>
                </FlexContent>

                {isNonMobileScreen ? (
                    <>
                    <FlexContent gap="0.25rem">
                        <GifBoxOutlined sx={{ color: mediumMain }} />
                        <Typography color={mediumMain}>Clip</Typography>
                    </FlexContent>

                    <FlexContent gap="0.25rem">
                        <AttachFileOutlined sx={{ color: mediumMain }} />
                        <Typography color={mediumMain}>Attachment</Typography>
                    </FlexContent>

                    <FlexContent gap="0.25rem">
                        <MicOutlined sx={{ color: mediumMain }} />
                        <Typography color={mediumMain}>Audio</Typography>
                    </FlexContent>
                    </>
                ) : (
                    <FlexContent gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexContent>
                )}
                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                Post
                </Button>
            </FlexContent>
        </WidgetWrapper>
    )
};

export default UserPostWidget;