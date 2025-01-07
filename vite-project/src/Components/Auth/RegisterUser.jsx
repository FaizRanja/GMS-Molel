import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import FaceIcon from "@mui/icons-material/Face";
// import LockIcon from "@mui/icons-material/Lock";

import { Toaster, toast } from 'react-hot-toast';
import "./sinup.css";

const RegisterUser = () => {

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const navigator = useNavigate();

  // States from Redux

  // Local states
  const [loginEmail, setLoginEmail] = useState("");
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [loginPassword, setLoginPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = user;

  // Handlers
  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const loginData = { email: loginEmail, password: loginPassword };
    dispatch(loginUser(loginData));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = { firstName, lastName, email, password , avatar };
    console.log(myForm)
   
    
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    } else if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  // Redirect handling
  const redirect = "/account";

  // Effects
  // useEffect(() => {
  //   if (message) {
  //     toast.success(message);
  //   }
  //   if (error) {
  //     toast.error(error);
  //   }
  //   if (isAuthenticated) {
  //     navigator(redirect);
  //   }
  // }, [message, error, isAuthenticated, navigator]);

const isLoading = false

  return (
    <Fragment>
      <Toaster />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <input
                    type={visible ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  {/* {visible ? (
                    <LockOpenIcon onClick={togglePasswordVisibility} />
                  ) : (
                    <LockIcon onClick={togglePasswordVisibility} />
                  )} */}
                </div>

                <Link to="/password/forgot">Forgot Password?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  {/* <FaceIcon /> */}
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    name="firstName"
                    value={firstName}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpName">
                  {/* <FaceIcon /> */}
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    name="lastName"
                    value={lastName}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpEmail">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpPassword">
                  {/* <LockOpenIcon /> */}
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>

                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};



export default RegisterUser
