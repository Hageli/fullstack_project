import { Box, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from 'scenes/navbar'
import FriendListWidget from 'scenes/widgets/FriendListWidget'
import UserPostWidget from 'scenes/widgets/UserPostWidget'
import FeedPostsWidget from 'scenes/widgets/FeedPostsWidget'
import UserWidget from 'scenes/widgets/UserWidget'

function Profile() {
  const [ user, setUser] = useState(null)
  const { userId } = useParams()
  const token = useSelector((state) => state.token)
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if(!user) {
    return null;
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        {/* USERINFORMATION AND FRIENDLIST */}
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={user._id} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>

        {/* USER'S POSTS */}
        <Box flexBasis={isNonMobileScreen ? "42%" : undefined} mt={isNonMobileScreen ? undefined : "2rem"}>
          <UserPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FeedPostsWidget userId={userId} isProfile/>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile
