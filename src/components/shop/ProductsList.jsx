import { useState } from 'react';
import { formatCurrency } from '../Utils/utils'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
const ProductsList = ({ products }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate()
    const detailHandler = (item) => {
        const id = item._id.$oid
        navigate(`/shop/detail/${id}`)
    }
    return (
        <>
            {products.map(item => (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, ease:  "easeOut" }}
                    className="text-center" key={item._id.$oid}
                >
                    <div className='overflow-hidden group cursor-pointer relative'
                        onClick={() => detailHandler(item)}
                    >
                        <img src={item.img1} alt={item.img1}
                            className="mx-auto mb-2 w-full h-auto object-contain"
                            onLoad={() => setIsLoaded(true)}
                        />
                        <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
                    </div>

                    <div className="text-sm text-gray-900 font-bold italic">{item.name}</div>
                    <div className="text-sm text-gray-400">{formatCurrency(item.price)} </div>
                </motion.div>
            ))}
        </>
    )
}
export default ProductsList;