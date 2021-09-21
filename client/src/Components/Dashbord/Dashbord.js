import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../JS/actions/user";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar";
const Dashbord = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div>
       <NavBar/>
      <button
        onClick={() => {
          dispatch(logout());
          history.push("/");
        }}
      >Logout</button>
      <div>
      
    </div>
    </div>
    
  );
};

export default Dashbord;