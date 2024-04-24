import { useNavigate } from "react-router-dom";
import MenuItem from "../common/MenuItem";
import { useCallback, useEffect, useRef, useState } from "react";
import { openLogin, openRegister } from "../../redux/modal/modalSlice";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import { logOut } from "../../redux/auth/authSlice"
import { Breadcrumb } from "antd";
const UserMenu = ({ currentUser }) => {
  const dropdownRef = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth)
  console.log(isLogin)
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
    <div className="relative">
      <div className="flex flex-row items-center gap-2">
        <div
          //   onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image || 'https://www.w3schools.com/howto/img_avatar.png'} />
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
            w-[40vw]
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
                  label="My favorites"
                  onClick={() => navigate('/favorites')}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => navigate('/reservations')}
                />
                <MenuItem
                  label="My Account"
                  onClick={() => navigate('/account-setting')}
                />
                <MenuItem
                  label="Airbnb your home"
                //   onClick={rentModal.onOpen}
                />
                <hr />
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
                <LoginModal />
                <MenuItem
                  label="Sign up"
                  onClick={() => { registerModal() }}
                />
                <RegisterModal />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu;