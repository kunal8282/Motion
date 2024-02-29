import { useState } from "react";
import PropTypes from "prop-types";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import authServices from "../utils/AuthServices";
import {useDispatch} from "react-redux";
import { userLoggedOut } from "../store/authSlice";

const ProfileDropBox = ({ name }) => {
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);

  const dropDownItems = [
    {
      id: 1,
      name: "Profile",
      icon: <CgProfile />,
      link: "/profile",
    },
    {
      id: 2,
      name: "Order",
      icon: <BsBoxSeam />,
      link: "/settings",
    },
    {
      id: 3,
      name: "WishList",
      icon: <FaHeart />,
      link: "",
    },
    {
      id: 4,
      name: "Log Out",
      icon: <CgLogOut />,
      onclick: () => {
        authServices
          .logout()
          .then(() => {
            dispatch(userLoggedOut())
          })
          .catch(() => {
            document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            window.location.reload();
            alert('Try Again!')
          });
      },
    },
  ];

  return (
    <div className="relative" onMouseLeave={() => setShowDropDown(false)}>
      <div
        className=" flex items-center text-lg px-2 py-1 cursor-pointer"
        onMouseEnter={() => setShowDropDown(true)}
      >
        <div className="px-2">
          <CgProfile />
        </div>
        <div className="font-medium">Hi, {name}</div>
        <div
          className={`text-2xl ${
            showDropDown ? "rotate-180" : ""
          } transition-all delay-100 ease-in-out`}
        >
          <RiArrowDropDownLine />
        </div>
      </div>

      {showDropDown && (
        <div className="absolute top-full left-4 w-48 bg-white border rounded-md shadow-lg">
          <ul className="space-y-2 py-1">
            {dropDownItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-gray-100 text-base "
                onClick={item.onclick}
              >
                <div>{item.icon}</div>
                <div>{item.name}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

ProfileDropBox.propTypes = {
  name: PropTypes.string,
}

export default ProfileDropBox;
