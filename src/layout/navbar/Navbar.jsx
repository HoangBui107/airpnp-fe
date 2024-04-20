// import { useEffect, useState } from "react";
// import { FaAirbnb } from "react-icons/fa6";
// import UserMenu from "../../components/UserMenu";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getProfileByToken } from "../../redux/profile/profileThunk";

// const Navbar = () => {
//   const navigate = useNavigate()
//   const [type, setType] = useState('current')
//   const dispatch = useDispatch();
//   const handleChangeType = (currentType) => {
//     setType(currentType)
//   }
//   // const [scrolling, setScrolling] = useState(false);
//   // useEffect(() => {
//   //   const handleScroll = () => {
//   //     if (window.scrollY > 0) {
//   //       setScrolling(true);
//   //     } else {
//   //       setScrolling(false);
//   //     }
//   //   };

//   //   window.addEventListener("scroll", handleScroll);

//   //   return () => {
//   //     window.removeEventListener("scroll", handleScroll);
//   //   };
//   // }, []);

//   useEffect(() => {
//     dispatch(getProfileByToken())
//   }, [])
//   const { profile } = useSelector((state) => state.profile)

//   return (
//     <>
//       <div
//         className={`h-20 flex items-center w-full sm:pl-6  bg-white border-b `}>
//         <div
//           className="flex flex-row items-center cursor-pointer"
//           onClick={() => { navigate('/') }}>
//           <FaAirbnb className="font-semibold transform rotate-180 cursor-pointer" color="#F5385D" size={40} />
//           <h1 className="text-primary text-lg font-semibold font-circular pl-3">Airpnp</h1>
//         </div>


//         <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
//           <button
//             className={`py-2 px-6 ${type === "current" ? " text-black rounded-full font-bold" : ""
//               }`}
//             onClick={() => {
//               handleChangeType("current");
//             }}
//           >
//             Stay
//           </button>
//           <button
//             className={`py-2 px-6 ${type === "listOrder" ? "text-black rounded-full font-bold" : ""
//               }`}
//             onClick={() => {
//               handleChangeType('listOrder');
//             }}
//           >
//             Experient
//           </button>
//         </nav>
//         <div className="flex justify-end w-1/3 ">
//           <UserMenu currentUser={profile} />
//         </div>
//       </div>
//       <div className="border border-gray-200 w-full mb-2"></div>
//     </>
//   )
// }

// export default Navbar;

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useEffect, useState } from "react";
import { FaAirbnb } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileByToken } from "../../redux/profile/profileThunk";
import UserMenu from "../../components/header/UserMenu";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

    const navigate = useNavigate()
  const [type, setType] = useState('current')
  const dispatch = useDispatch();
  const handleChangeType = (currentType) => {
    setType(currentType)
  }
  // const [scrolling, setScrolling] = useState(false);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setScrolling(true);
  //     } else {
  //       setScrolling(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    dispatch(getProfileByToken())
  }, [])
  const { profile } = useSelector((state) => state.profile)

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
            <ThemeProvider theme={darkTheme}>

      <AppBar position="static">
        <Toolbar>
          <Box
          className="flex flex-row items-center cursor-pointer"
          onClick={() => { navigate('/') }}>
          <FaAirbnb className="font-semibold transform rotate-180 cursor-pointer" color="#F5385D" size={40} />
          <h1 className="text-primary text-lg font-semibold font-circular pl-3">Airpnp</h1>
        </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <UserMenu currentUser={profile} />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      </ThemeProvider>

    </Box>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FFF',
    },
  },
});