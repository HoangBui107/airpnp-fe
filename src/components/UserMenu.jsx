import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import { useCallback, useState } from "react";
import { openLogin, openRegister } from "../redux/modal/modalSlice";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useDispatch } from "react-redux";

const UserMenu = ({currentUser}) =>{

    const navigate = useNavigate()
    const dispatch =useDispatch();

   
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleOpen = useCallback(() => {
      setIsOpen((value) => !value);
    }, []);
  
    const loginModal = () => {
        dispatch(openLogin())
      };

    return(
        <div className="relative">
      <div className="flex flex-row items-center gap-3">
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
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
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
            {currentUser ? (
              <>
                <MenuItem 
                  label="My trips" 
                  onClick={() => navigate.push('/trips')}
                />
                <MenuItem 
                  label="My favorites" 
                  onClick={() => navigate.push('/favorites')}
                />
                <MenuItem 
                  label="My reservations" 
                  onClick={() => navigate.push('/reservations')}
                />
                <MenuItem 
                  label="My properties" 
                  onClick={() => navigate.push('/properties')}
                />
                <MenuItem 
                  label="Airbnb your home" 
                //   onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem 
                  label="Logout" 
                //   onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Login" 
                  onClick={()=>{loginModal()}}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={openRegister()}
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