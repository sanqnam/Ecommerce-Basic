import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { HIDE_POPUP } from "../stores/popup";
import { formatCurrency } from "./Utils/utils";
import { NavLink } from "react-router-dom";

const Popup = () => {
  const { isPopup, product } = useSelector((state) => state.popup);
  const dispatch = useDispatch();
  const dialogRef = useRef(null);

  // Hiển thị dialog khi isPopup = true
  useEffect(() => {
    const dialog = dialogRef.current;

    if (isPopup && product && dialog) {
      dialog.showModal();
      document.body.classList.add("overflow-hidden");
    } else if (dialog && dialog.open) {
      dialog.close();
      document.body.classList.remove("overflow-hidden");
    }

    const handleClose = () => {
      dispatch(HIDE_POPUP());
      document.body.classList.remove("overflow-hidden");
    };

    dialog?.addEventListener("close", handleClose);

    return () => {
      dialog?.removeEventListener("close", handleClose);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isPopup, product, dispatch]);

  if (!product || Object.keys(product).length === 0) return null;

  return (
    <dialog
      ref={dialogRef}
      className="p-4 md:p-6 w-[90%] md:w-1/2 max-w-xl m-auto pt-10 overflow-hidden rounded-md shadow relative"
    >
      <button
        onClick={() => dispatch(HIDE_POPUP())}
        className="absolute top-2 right-2 text-2xl cursor-pointer border-none px-2 outline-none"
      >
        &times;
      </button>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/2 overflow-hidden">
          <img
            src={product.img1}
            alt={product.name}
            className="w-full object-contain"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-lg md:text-xl font-bold italic">{product.name}</h2>
          <p className="mt-2 font-semibold text-gray-500 text-lg md:text-xl italic">
            {formatCurrency(product.price)}
          </p>
          <p className="mt-2 text-sm text-gray-600 line-clamp-7 overflow-hidden text-ellipsis mb-3">
            {product.short_desc}
          </p>

          <NavLink
            to={`/shop/detail/${product._id.$oid}`}
            onClick={() => dispatch(HIDE_POPUP())}
            className="bg-gray-800 text-gray-50 italic py-2 px-4 inline-block"
          >
            <i className="!text-gray-50 fa fa-shopping-cart"></i> View Detail
          </NavLink>
        </div>
      </div>
    </dialog>
  );
};

export default Popup;
