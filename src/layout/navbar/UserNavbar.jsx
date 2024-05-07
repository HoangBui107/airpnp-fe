import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { FaAirbnb } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileByToken } from "../../redux/profile/profileThunk";
import UserMenu from "../../components/header/UserMenu";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { IoIosSearch } from "react-icons/io";
import { getAllRooms } from "../../redux/room/roomThunks";
import TextField from '@mui/material/TextField';

export default function UserNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const dispatch = useDispatch();

  const [name, setName] = useState()
  useEffect(() => {
      dispatch(getAllRooms({ name: name }))
  }, [name])

  const handleChange = (event) => {
      setName(event.target.value || '');
  };
  
  const handleRefresh = (event) => {
    window.location.href = "/";

};
  useEffect(() => {
    if (isLoggedIn){
      dispatch(getProfileByToken())
    }
  }, [])
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

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
    <div>
      <ThemeProvider theme={darkTheme}>

        <AppBar position="static" sx={{ divShadow: '0px 0px 0px rgba(0, 0, 0, 0.1)', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }} >
          <Toolbar>
            <div onClick ={(e)=>{handleRefresh(e)}}
              className="flex flex-row items-center cursor-pointer sm:ml-4 md:ml-6 lg:ml-16 "
              >
              <FaAirbnb className="font-semibold transform rotate-180 cursor-pointer" color="#F5385D" size={40} />
              <h1 className="text-primary text-lg font-semibold font-circular pl-3">EarthPnP</h1>
            </div>
            <div className='flex items-center justify-center w-full'>
            <div
            className="h-[48px]  lg:h-[64] flex flex-row items-center justify-between border rounded-full"
        >
            <div className="hidden lg:block">
                <div className="flex flex-row items-center justify-between">
                    <div className="cursor-pointer w-[250px] h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <TextField fullWidth variant="standard" placeholder="Please enter name hotel"
                            InputProps={{
                                disableUnderline: true,
                            }} id="fullWidth"  value={name} onChange={(e)=>{handleChange(e)}}/>
                    </div>
                </div>
            </div>

            <Link to={"/list"} className="p-2 h-10 w-10 flex justify-center items-center rounded-full bg-primary lg:mr-2 cursor-pointer" >
                <div className="cursor-pointer p-2 lg:p-4 bg-airbnb hover:bg-airbnb-dark transition rounded-full text-white" >
                    <IoIosSearch size={24} />
                </div>
            </Link>

        </div>
            </div>
              <UserMenu />
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </ThemeProvider>
    </div>
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