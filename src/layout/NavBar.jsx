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

    const logOutHandler = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(logout());
    };

    // Theo dõi cuộn trang
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setIsScrolled(offset > 100); // Khi cuộn quá 100px thì chuyển sang fixed
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className={`flex justify-between py-3 bg-white text-black items-center italic transition-all duration-300 z-50 w-[1100px] ${isScrolled ? 'fixed top-0 px-6' : 'relative mb-5'}`}>
                <div className="inline-flex gap-2">
                    <NavLink to='/' className={({ isActive }) => (isActive ? 'text-amber-500 mr-1.5' : 'text-black mr-1.5')}>
                        Home
                    </NavLink>
                    <NavLink to='/shop' className={({ isActive }) => (isActive ? 'text-amber-500' : 'text-black')}>
                        Shop
                    </NavLink>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <NavLink to='/' className='text-2xl'>
                        BOUTIQUE
                    </NavLink>
                </div>
                <div className="flex gap-3">
                    <NavLink to='/cart' className={({ isActive }) => (isActive ? 'text-amber-500' : 'text-black')} >
                        <i className="fa fa-shopping-cart text-neutral-400 " style={{ fontSize: '22px' }}></i> Cart
                    </NavLink>
                    {Object.keys(userStore).length !== 0 ? (
                        <>
                            <NavLink>
                                <i className="fa fa-user text-neutral-400" style={{ fontSize: '22px' }}></i> {userStore.fullname}
                            </NavLink>
                            <p onClick={logOutHandler} className="inline cursor-pointer">(LogOut)</p>
                        </>
                    ) : (
                        <NavLink to='/signin'>Login</NavLink>
                    )}
                </div>
            </div>
        </>
    );
};

export default NavBar;
