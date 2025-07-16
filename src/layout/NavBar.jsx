import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../stores/user";
import { getLocalStorege } from "../components/Utils/utils";

const NavBar = () => {
  const { user } = useSelector(state => state.user);
  const userStore = getLocalStorege('user') || user || {};
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const logOutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(logout());
  };

  // Theo dõi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`flex justify-between items-center py-3 bg-white text-black italic transition-all duration-300 z-50 w-full
          ${isScrolled ? 'fixed top-0  px-4 shadow-md max-w-[1100px]' : 'relative mb-5 px-4'}
        `}
      >
        {/* Left: Nav Links (desktop) */}
        <div className="hidden md:inline-flex gap-4">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-amber-500" : "text-black"}>Home</NavLink>
          <NavLink to="/shop" className={({ isActive }) => isActive ? "text-amber-500" : "text-black"}>Shop</NavLink>
          <NavLink to="/favorite" className={({ isActive }) => isActive ? "text-amber-500" : "text-black"}>Favorite</NavLink>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
          <NavLink to="/" className="text-xl md:text-2xl font-semibold">BOUTIQUE</NavLink>
        </div>

        {/* Right: Cart + User (desktop) */}
        <div className="hidden md:flex gap-3 items-center">
          <NavLink to="/cart" className={({ isActive }) => isActive ? "text-amber-500" : "text-black"}>
            <i className="fa fa-shopping-cart text-neutral-400" style={{ fontSize: "22px" }}></i>{" "}
            <span className="hidden sm:inline">Cart</span>
          </NavLink>

          {Object.keys(userStore).length !== 0 ? (
            <>
              <NavLink to="/">
                <i className="fa fa-user text-neutral-400" style={{ fontSize: "22px" }}></i>{" "}
                <span className="hidden sm:inline">{userStore.fullname}</span>
              </NavLink>
              <p onClick={logOutHandler} className="inline cursor-pointer text-sm text-red-500">(LogOut)</p>
            </>
          ) : (
            <NavLink to="/signin" className="text-sm">Login</NavLink>
          )}
        </div>

        {/* Hamburger menu (mobile) */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-3 italic shadow-md z-40 fixed w-40 h-full">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-amber-500 block" : "text-black block"}>Home</NavLink>
          <NavLink to="/shop" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-amber-500 block" : "text-black block"}>Shop</NavLink>
          <NavLink to="/favorite" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-amber-500 block" : "text-black block"}>Favorite</NavLink>
          <NavLink to="/cart" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-amber-500 block" : "text-black block"}>
            <i className="fa fa-shopping-cart text-neutral-400 mr-1"></i>Cart
          </NavLink>

          {Object.keys(userStore).length !== 0 ? (
            <>
              <NavLink to="/" onClick={() => setIsOpen(false)} className="block text-gray-950">
                <i className="fa fa-user text-neutral-400 mr-1"></i>{userStore.fullname}
              </NavLink>
              <button
                onClick={() => {
                  logOutHandler();
                  setIsOpen(false);
                }}
                className="text-sm text-red-500 italic block"
              >
                (LogOut)
              </button>
            </>
          ) : (
            <NavLink to="/signin" onClick={() => setIsOpen(false)} className="text-sm italic block text-gray-950">Login</NavLink>
          )}
        </nav>
      )}
    </>
  );
};

export default NavBar;
