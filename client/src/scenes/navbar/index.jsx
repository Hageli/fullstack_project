import { useState } from 'react';
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery
} from '@mui/material/';
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from '../../state';
import { useNavigate } from 'react-router-dom';
import FlexContent from '../../components/FlexContent.jsx';

function Navbar() {
  const [ isMobileMenuToggle, setIsMobileMenuToggle ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <FlexContent padding="1rem 6%" backgroundColor={alt} >
      <FlexContent gap="1.75rem">

        {/* SITE TITLE */}
        <Typography
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate('/home')}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer"
            },
            fontWeight: "bold"
          }}
        >
          SkillsConnect
        </Typography>

        {/* SEARCH FIELD FOR DESKTOP */}
        {isNonMobileScreen && (
          <FlexContent backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
            <InputBase placeholder="Find a professional" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexContent>
        )}
      </FlexContent>
      
      {/* NAVBAR FOR DESKTOP */}
      {isNonMobileScreen ? (
        <FlexContent gap="2rem">
          
          { /* MENU ITEMS */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px"}} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px"}} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px"}} />
          <Notifications sx={{ fontSize: "25px"}} />
          <Help sx={{ fontSize: "25px"}} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{ 
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem"
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              {/* LOGOUT BUTTON */}
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexContent>
        ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}
        >
          <Menu />
        </IconButton>
        )}

      {/* NAVBAR FOR MOBILE */}
      {!isNonMobileScreen && isMobileMenuToggle && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >

        { /* CLOSE MENU BUTTON */}
        <Box display="flex" justifyContent="flex-end" p="1rem">
          <IconButton
            onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}
          >
            <Close />
          </IconButton>
        </Box>
        <FlexContent display="flex" flexDirection="column" justifyContent="center" gap="3rem">
          
          { /* MENU ITEMS */}
          <IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: "25px" }}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px"}} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px"}} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px"}} />
          <Notifications sx={{ fontSize: "25px"}} />
          <Help sx={{ fontSize: "25px"}} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{ 
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem"
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
            >
              {/* LOGOUT BUTTON */}
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexContent>
      </Box>
      )}
    </FlexContent>
  )
}

export default Navbar;
