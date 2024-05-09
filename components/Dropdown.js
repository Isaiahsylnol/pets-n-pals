import React, { useEffect, useState } from "react";
import Image from "next/image";
//import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logout } from "../slices/auth";
import ClickOutsideHandler from "../utils/clickOutside";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import accountPic from "../assets/account-icon.png";
import { createCart } from "../slices/cart";
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setCurrentUser] = useState();
  const { user: currentUser } = useSelector((state) => state.auth);

  const [cartItems, setCartItems] = useState([]);
  const itemPrice = cartItems?.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemPrice * 0.13;
  const shippingPrice = itemPrice > 2000 ? 0 : 20;
  const totalPrice = itemPrice + taxPrice + shippingPrice;

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")));
  }, []);

  const dispatch = useDispatch();
  let navigate = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigateAndClose = (arg) => {
    navigate.push(arg);
    toggleDropdown();
  };

  useEffect(() => {
    setCurrentUser(currentUser);
  }, []);

  const handleSignOut = async () => {
    dispatch(
      createCart({
        userId: currentUser?.id,
        status: true,
        total: totalPrice,
        products: cartItems,
      })
    );
    dispatch(logout());
    setCurrentUser();

    navigate.push("/");
  };

  return (
    <div className="text-white sm:mr-10 text-center h-full dropdown">
      {user ? (
        <button
          className="text-gray-200 font-normal no-underline hover:text-white text-base"
          onClick={() => toggleDropdown()}
        >
          <Image
            src={accountPic}
            alt="News thumbnail"
            width={25}
            height={25}
            className="object-contain"
          />
        </button>
      ) : (
        <a
          href="/login-register"
          className="text-white p-2 bg-blue-500 hover:bg-blue-600 rounded-sm -mt-4 mr-8 h-8 w-20"
        >
          Sign in
        </a>
      )}
      {isOpen && (
        // dropdown-content
        <div className="bg-gray-700 sm:w-28 sm:-ml-20 mt-3 sm:absolute rounded text-base">
          <ClickOutsideHandler
            containerClass=".dropdown"
            action={toggleDropdown}
          />
          <ul className="space-y-1 w-full">
            <li className="hover:bg-gray-800 hover:rounded w-full h-12 flex justify-center items-center">
              {" "}
              <button onClick={() => navigateAndClose("/profile")}>
                View profile
              </button>
            </li>
            <li className="hover:bg-gray-800 hover:rounded w-full h-12 flex justify-center items-center cursor-pointer">
              Settings
            </li>
            <li className="hover:bg-gray-800 hover:rounded w-full h-12 flex justify-center items-center cursor-pointer">
              FAQS
            </li>
            <li className="hover:bg-gray-800 hover:rounded w-full h-12 flex justify-center items-center cursor-pointer">
              {" "}
              <button onClick={handleSignOut}>Sign out</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
