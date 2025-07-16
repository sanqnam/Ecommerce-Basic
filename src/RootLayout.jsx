import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import Popup from "./components/Popup";
import SpinLoader from "./layout/SpinLoader";
import { FaFacebookMessenger } from "react-icons/fa6";
import SupportPopup from "./components/SupportPopup";
import { useState } from "react";

const RootLayout = () => {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);

    const supportHandler = () => {
        setOpen(!open);
    };



    return (
        <>
            <Popup />
            <div className="max-w-[1100px] mx-auto">
                <NavBar />
                {navigation.state === "loading" && <SpinLoader />}
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />

            <SupportPopup open={open}  />

            
            <button
                className="bg-gray-900 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all fixed bottom-13 right-10 sm:text-4xl text-2xl cursor-pointer"
                aria-label="Support"
                onClick={supportHandler}
            >
                <FaFacebookMessenger />
            </button>
        </>
    );
};

export default RootLayout;
