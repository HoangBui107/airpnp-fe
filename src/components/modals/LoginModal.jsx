import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authThunks";
import { closeLogin, openForgetPassword, openRegister } from "../../redux/modal/modalSlice";
import Heading from "../common/Heading";
import Modal from "./Modal";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const LoginModal = () =>{
    const dispatch = useDispatch()
    const {isLoading} = useSelector((state)  => state.auth)
    const [account, setAccount] = useState({
      email: "",
      password: "",
    });
    const open = useSelector((state) => state.modal.login)
    const onClose = () =>{
        dispatch(closeLogin())
    }
    const [errors, setErrors] = useState({
      email: "",
      password: "",
      login: "", 
    });
  
  
    const handleEmail = (e) => {
      setAccount((prev) => {
        return { ...prev, email: e.target.value };
      });
      setErrors((prev) => ({ ...prev, email: "" }));
    };
  
    const handlePassword = (e) => {
      setAccount((prev) => {
        return { ...prev, password: e.target.value };
      });
      setErrors((prev) => ({ ...prev, password: "" }));
    };
  
    const validateInputs = () => {
      let isValid = true;
      const newErrors = {};
  
      if (!account.email.trim()) {
        newErrors.email = "Please enter your email.";
        isValid = false;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(account.email)) {
        newErrors.email = "Invalid email address.";
        isValid = false;
      }
  
      if (!account.password.trim()) {
        newErrors.password = "Please enter your password.";
        isValid = false;
      }
  
      setErrors((prev) => ({ ...prev, ...newErrors }));
  
      return isValid;
    };
  
    const onSubmit = async () => {
      if (validateInputs()) {
        try {
          await dispatch(login(account)).unwrap();
          onClose();
        } catch (error) {
          setErrors((prev) => ({ ...prev, login: "Email or password is incorrect." }));
        }
      }
    };
  
    const openRegisterHandler = () => {
      dispatch(closeLogin())
      dispatch(openRegister())
    }

    const openForgetHandler = () => {
      dispatch(closeLogin())
      dispatch(openForgetPassword())
    }

    const handleSuccessLogin = async (response) => {
      const token = await response.credential;
      // dispatch(loginByGoogle({ token: token }));
    };
  
    const handleErrorLogin = (error) => {
      // console.log(error);
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
          <Heading title="Welcome to Airpnp" subtitle="Welcome back!" />
          <input
            className="w-full text-center mx-0 my-2.5 px-0 py-[7px] border rounded-[10px] border-solid border-black"
            name="email"
            placeholder="Email"
            type="email"
            value={account.email}
            onChange={handleEmail}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            className="w-full text-center mx-0 my-2.5 px-0 py-[7px] border rounded-[10px] border-[solid] border-[black]"
            name="password"
            placeholder="Password"
            type="password"
            value={account.password}
            onChange={handlePassword}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
      );
    
      const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccessLogin}
              onError={handleErrorLogin}
              style={{ marginTop: "100px" }}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
            </div>
          </GoogleOAuthProvider>
          {errors.login && <p className="text-red-500">{errors.login}</p>}
          <div className="text-neutral-500 text-center mt-4 font-light">
            <p>
              Already have an account?
              <span
                className="text-neutral-800 cursor-pointer hover:underline"
                onClick={openRegisterHandler}
              >
                {" "}
                Log In
              </span>
            </p>
            <p>
              Don't have password?
              <span
                className="text-neutral-800 cursor-pointer hover:underline"
                onClick={openForgetHandler}
              >
                {" "}
                Forget Password
              </span>
            </p>
          </div>
        </div>
      );
    
      return (
        <Modal
          disabled={isLoading}
          isOpen={open}
          title="Login"
          actionLabel="Log In"
          onClose={onClose}
          onSubmit={onSubmit}
          body={bodyContent}
          footer={footerContent}
        />
      );
    };

export default LoginModal;