import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, updateProducts } from "../../stores/products";
import { NavLink } from "react-router-dom";

const ShoppingCart = () => {
    const { productsCart, total } = useSelector(state => state.products)
    const dispatch = useDispatch()
    return (
        <>
            <h2 className="text-xl italic font-normal mb-4 text-neutral-950 uppercase">Shopping Cart</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-neutral-950">
                {/* Cart Table */}
                <div className="lg:col-span-2">

                    <div className="overflow-x-auto bg-white shadow rounded-lg">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-50 text-center italic">
                                <tr>
                                    <th className="p-4">IMAGE</th>
                                    <th className="p-4">PRODUCT</th>
                                    <th className="p-4">PRICE</th>
                                    <th className="p-4">QUANTITY</th>
                                    <th className="p-4">TOLAL</th>
                                    <th className="p-4">REMOVE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsCart.map((item) => (
                                    <tr key={item._id.$oid} className="border-b text-center">
                                        <td className="p-4">
                                            <img src={item.img1} alt={item.name} className="h-16" />
                                        </td>
                                        <td className="p-4">{item.name}</td>
                                        <td className="p-4">{Number(item.price).toLocaleString()} VND</td>
                                        <td className="p-4 text-center align-middle">
                                            <div className="inline-flex items-center space-x-2">
                                                <button onClick={() => dispatch(updateProducts({ type: 'reduce', id: item._id.$oid }))} className="px-2 cursor-pointer">◀</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => dispatch(updateProducts({ type: 'increase', id: item._id.$oid }))} className="px-2 cursor-pointer">▶</button>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {item.total.toLocaleString()} VND
                                        </td>
                                        <td className="p-4">
                                            <button className="cursor-pointer" onClick={() => dispatch(deleteProducts(item._id.$oid))} >
                                               <i className="fa fa-trash-o !text-xl"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between mt-6">
                        <NavLink to='/shop' className="flex items-center gap-2 text-sm text-gray-600 hover:underline">

                            ⬅ Continue shopping
                        </NavLink>
                        <button className="border border-gray-800 px-6 py-2 text-sm flex items-center gap-2">
                            Proceed to checkout ➡

                        </button>
                    </div>.
                </div>

                {/* Cart Total */}
                <div className=" shadow rounded-lg p-6 h-fit italic bg-gray-50 ">
                    <h2 className="text-lg font-semibold mb-4 uppercase">Cart Total</h2>
                    <div className="flex justify-between py-2 border-b uppercase">
                        <span>Subtotal</span>
                        <span>{total.toLocaleString()} VND</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold text-lg uppercase">
                        <span>Total</span>
                        <span>{total.toLocaleString()} VND</span>
                    </div>

                    <input
                        type="text"
                        placeholder="Enter your coupon"
                        className="w-full border px-3 py-2 mt-4 "
                    />
                    <button className="w-full bg-gray-800 text-white py-2">🎁 Apply coupon</button>
                </div>
            </div>
        </>

    )
}
export default ShoppingCart