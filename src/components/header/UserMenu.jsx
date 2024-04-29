import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openLogin, openRegister } from "../../redux/modal/modalSlice";
import MenuItem from "../common/MenuItem";
import Avatar from "./Avatar";

import { logOut } from "../../redux/auth/authSlice";
const UserMenu = ({ currentUser }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth)

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const loginModal = () => {
    dispatch(openLogin())
  };
  const registerModal = () => {
    dispatch(openRegister())
  };

  const logout = () => {
    dispatch(logOut())
  };

  return (
    <div className="relative flex items-center justify-center h-6 w-[20%]">
      <div className="flex flex-row items-center  h-full gap-2 ">
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-3
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          justify-center
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.avatarUrl || 'https://www.w3schools.com/howto/img_avatar.png'} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[100vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {isLogin ? (
              <>
                <MenuItem
                  label="My Orders"
                  onClick={() => navigate('/orders')}
                />
                <MenuItem
                  label="My Account"
                  onClick={() => navigate('/account-setting')}
                />
               
                <MenuItem
                  label="Logout"
                  onClick={() => { logout() }}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => { loginModal() }}
                />

                <MenuItem
                  label="Sign up"
                  onClick={() => { registerModal() }}
                />
          
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu;