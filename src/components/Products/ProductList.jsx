import { useDispatch } from 'react-redux'
import { formatCurrency } from '../Utils/utils'
import { SHOW_POPUP } from '../../stores/popup'
const ProductList = ({ data }) => {
    const dispatch = useDispatch()

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-4">
            {data.slice(0, 6).map((item) => (
                <div key={item._id.$oid}>
                    <div
                        className="overflow-hidden group cursor-pointer relative"
                        onClick={() => dispatch(SHOW_POPUP(item))}
                    >
                        <img src={item.img1} alt={item.name} className="w-full object-contain" />
                        <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
                    </div>
                    <div className="text-center mt-2">
                        <h3 className="font-bold text-md italic mb-1.5">{item.name}</h3>
                        <p className="text-sm text-neutral-500">{formatCurrency(item.price)}</p>
                    </div>
                </div>
            ))}
        </div>

    )
}
export default ProductList

