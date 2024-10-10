import { combineReducers } from "redux";
import Auth from "./Auth.js";
import Sidebar from "./sidebar.js";


export default combineReducers(
  {
    Auth: Auth,
    Sidebar: Sidebar
  });
