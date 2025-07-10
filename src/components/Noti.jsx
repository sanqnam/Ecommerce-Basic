import React, { useEffect } from 'react';

const Noti = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); 
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-slide-in">
            {message}
        </div>
    );
};

export default Noti;