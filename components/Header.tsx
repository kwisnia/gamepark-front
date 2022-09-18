import { useState } from "react";
import { axiosClient } from "../constants";
import useUser from "../hooks/useUser";
import LoginModal from "./login/LoginModal";

const Header = () => {
  const { user, mutate, loggedOut } = useUser();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formType, setFormType] = useState<"login" | "register">("login");

  const openForm = (type: "login" | "register") => {
    setFormType(type);
    setIsFormVisible(true);
  };

  const logout = () => {
    localStorage.removeItem("gaming-token");
    axiosClient.defaults.headers.common.Authorization = "";
    mutate();
  };

  return (
    <div className="w-full h-12 text-white bg-slate-700 flex justify-between">
      <div>Gaming</div>
      <div className="flex items-center">
        {!loggedOut ? (
          <div className="flex items-center">
            <div className="mr-2">{user.username}</div>
            <button
              className="bg-slate-600 text-white p-2 rounded-md m-2"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex">
            <button
              className="bg-slate-600 text-white p-2 rounded-md"
              onClick={() => openForm("login")}
            >
              Login
            </button>
            <button onClick={() => openForm("register")}>Register</button>
          </div>
        )}
      </div>
      <LoginModal
        isOpen={isFormVisible}
        initialState={formType}
        onRequestClose={() => setIsFormVisible(false)}
        mutate={mutate}
      />
    </div>
  );
};

export default Header;
