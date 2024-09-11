import { Box } from '@mui/material';

// RETURN SPESIFIC SIZE, ROUND USER PICTURE
const UserImage = ({ image, size="60px"}) => {
    return (
        <Box width={size} heigth={size}>
            <img 
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                heigth={size}
                alt="user"
                src={`http://localhost:3001/assets/${image}`}
            />
        </Box>
    );
}

export default UserImage;