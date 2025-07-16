import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { HIDE_POPUP } from "../stores/Popup";
import { formatCurrency } from "./Utils/utils";
import { NavLink } from "react-router-dom";

const Popup = () => {
    const { isPopup, product } = useSelector(state => state.popup);
    const dispatch = useDispatch();
    const dialogRef = useRef(null);

    // Hiển thị dialog khi isPopup = true
    useEffect(() => {
        const dialog = dialogRef.current;

        if (isPopup && product && dialog) {
            dialog.showModal();
            document.body.classList.add('overflow-hidden'); 
        } else if (dialog && dialog.open) {
            dialog.close();
            document.body.classList.remove('overflow-hidden'); // Gỡ bỏ
        }

        // Sự kiện khi dialog bị đóng (nhấn ESC hoặc gọi .close())
        const handleClose = () => {
            dispatch(HIDE_POPUP());
            document.body.classList.remove('overflow-hidden'); // Gỡ khi ESC
        };

        dialog?.addEventListener("close", handleClose);

        // Cleanup sự kiện khi unmount
        return () => {
            dialog?.removeEventListener("close", handleClose);
            document.body.classList.remove('overflow-hidden'); // Gỡ khi ESC
        };
    }, [isPopup, product, dispatch]);


    if (!product || Object.keys(product).length === 0) return null;

    return (
        <dialog ref={dialogRef} className="p-6 md:w-1/2 w-10/12 m-auto pt-10 overflow-hidden rounded-md shadow">
            <button
                onClick={() => dispatch(HIDE_POPUP())}
                className="absolute top-2 right-2 text-2xl cursor-pointer border-none px-2 outline-none"
            >
                &times;
            </button>

            <div className="flex gap-4">
                <div className="w-1/2 overflow-hidden">
                    <img src={product.img1} alt={product.name} className="w-full" />
                </div>
                <div className="w-1/2">
                    <h2 className="md:text-xl text-sm font-bold italic">{product.name}</h2>
                    <p className="mt-2 font-semibold text-gray-500 md:text-xl text-sm italic">{formatCurrency(product.price)}</p>
                    <p className="mt-2 md:text-sm text-[12px] text-gray-600 md:line-clamp-7 line-clamp-3 overflow-hidden text-ellipsis mb-3">{product.short_desc}</p>

                    <NavLink  to={`/shop/detail/${product._id.$oid}`} onClick={()=>dispatch(HIDE_POPUP())} className="bg-gray-800 text-gray-50 italic py-2 px-4 md:text-xl text-sm">
                    <i className="!text-gray-50 fa fa-shopping-cart"></i>  View Detail
                    </NavLink>
                </div>
            </div>            
        </dialog>
    );
};

export default Popup;
