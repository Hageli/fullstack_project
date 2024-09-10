import { Box, useMediaQuery } from '@mui/material'
import Navbar from 'scenes/navbar'
import { useSelector } from 'react-redux'
import UserWidget from 'scenes/widgets/UserWidget';
import UserPostWidget from 'scenes/widgets/UserPostWidget';
import FeedPostsWidget from 'scenes/widgets/FeedPostsWidget';
import AdvertWidget from 'scenes/widgets/AdvertWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';

function Home() {
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box 
        width="100%" 
        padding="2rem 6%" 
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}> 
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined: "2rem"}
        >
          <UserPostWidget picturePath={picturePath}/>
          <FeedPostsWidget userId={_id} />
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Home