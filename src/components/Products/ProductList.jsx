import { useDispatch } from 'react-redux'
import { formatCurrency } from '../Utils/utils'
import { SHOW_POPUP } from '../../stores/Popup'
const ProductList = ({ data }) => {
    const dispatch = useDispatch()

    return (
        <div className='grid grid-cols-3 gap-3'>
            {data.map((item,index) =>(index < 6 && (
                <div key={item._id.$oid} className="">
                    <div className="overflow-hidden group cursor-pointer relative" onClick={()=> dispatch(SHOW_POPUP(item))}>
                        <img src={item.img1} alt={item.img1} className="w-full" />
                        <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
                    </div>
                    <div className='text-center'>
                        <h3 className='font-bold text-md italic mb-1.5'>
                            {item.name}
                        </h3>
                        <p className='text-sm text-neutral-500'>
                            {formatCurrency(item.price)}
                        </p>
                    </div>
                </div>
            )))}
        </div>
    )
}
export default ProductList

