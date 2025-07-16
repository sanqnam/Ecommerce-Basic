
import { useEffect, useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { formatCurrency, getLocalStorege, saveProductToHistory } from "../Utils/utils";
import { useDispatch } from "react-redux";
import { addProducts } from "../../stores/products";
import Noti from "../Noti";
import FavoriteButton from "../FavoriteButton";
import SpinLoader from "../../layout/SpinLoader";

const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const [selectedImage, setSelectedImage] = useState('');
    const [productCategory, setProductCategory] = useState([])
    const data = useLoaderData()
    const { idProduct } = useParams()
    const imageKeys = ['img1', 'img2', 'img3', 'img4'];
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const [showNoti, setShowNoti] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [viewHistory, setViewHistory] = useState([])


    // sử lý dự liệu lưu trong store
    const dispatch = useDispatch()

    useEffect(() => {
        const result = data.find(prd => prd._id.$oid === idProduct)
        const history = getLocalStorege('viewHistory')
        setViewHistory(history)
        const category = result.category
        const resultCate = data.filter(prd => prd.category === category)
        setProductCategory(resultCate)
        console.log(resultCate)
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSelectedImage(result.img1)
        setProduct(result)
        setIsLoading(false)
    }, [data, idProduct])

    // xử lý click detal
    const detailHandler = (item) => {
        const id = item._id.$oid
        saveProductToHistory(item)
        console.log('detail', id)
        setQuantity(1)
        navigate(`/shop/detail/${id}`)
    }
    // sử lý sự kiện addproduct
    const addCartHandler = () => {
        const newProduct = { ...product, quantity: quantity, total: quantity * product.price }
        dispatch(addProducts(newProduct))
        setShowNoti(true)
    }
    if (isLoading) return <SpinLoader />

    return (
        <>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[100px_400px_auto] gap-6 md:gap-10">
                {/* Left: Images */}
                <div className="flex md:block space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-visible">
                    {imageKeys.map((key, index) => (
                        <img
                            key={index}
                            src={product[key]}
                            onClick={() => setSelectedImage(product[key])}
                            className={`w-20 h-20 object-contain border p-1 cursor-pointer ${selectedImage === product[key] ? "border-black" : "border-gray-200"
                                }`}
                            alt={`Option ${index}`}
                        />
                    ))}
                </div>

                {/* Main Image */}
                <div>
                    <img
                        src={selectedImage}
                        alt="Main product"
                        className="w-full mb-4 object-contain max-h-[400px]"
                    />
                </div>

                {/* Right: Info */}
                <div>
                    <h2 className="text-2xl font-semibold text-neutral-950">{product.name}</h2>
                    <p className="text-lg text-red-600 mt-2">{formatCurrency(product.price)}</p>
                    <p className="text-sm text-gray-600 mt-4">{product.short_desc}</p>

                    {/* Options */}
                    <div className="mt-6 space-y-4">
                        <div>
                            <label className="text-sm text-gray-600">CATEGORY</label>
                            <div className="mt-1">Apple Watch</div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                className="w-20 border text-neutral-950 border-gray-300 rounded px-2 py-1"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <button
                                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                                onClick={addCartHandler}
                            >
                                Add to Cart
                            </button>
                            <FavoriteButton product={product} />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2 mt-10 italic">
                    <h3 className="text-md font-semibold mb-2 border-b border-gray-900 py-2 px-4 bg-gray-950 inline-block text-white">
                        DESCRIPTION
                    </h3>
                    <h5 className="text-gray-950 italic my-3 font-medium">PRODUCT DESCRIPTION</h5>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                        {product.long_desc}
                    </p>
                </div>


            </div>
            <div className="md:col-span-2 mt-12">
                <h3 className="text-lg font-semibold mb-4 text-neutral-950 italic mx-2 sm:mx-0">RELATED PRODUCTS</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mx-2 sm:mx-0">
                    {productCategory.map((item, index) => (
                        <div className="text-center" key={index}>
                            <div
                                className="overflow-hidden group cursor-pointer relative"
                                onClick={() => detailHandler(item)}
                            >
                                <img
                                    src={item.img1}
                                    alt={item.name}
                                    className="w-full h-[200px] object-contain mb-2"
                                />
                                <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                            </div>
                            <div className="text-sm text-gray-950 mb-2">{item.name}</div>
                            <div className="text-sm text-gray-500">{formatCurrency(item.price)}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/* view history product */}
            {/* View History */}
            <div className="md:col-span-2 mt-12">
                <h3 className="text-lg font-semibold mb-4 text-neutral-950 italic mx-2 sm:mx-0">VIEW HISTORY PRODUCTS</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mx-2 sm:mx-0">
                    {viewHistory.map((item, index) => (
                        <div className="text-center" key={index}>
                            <div
                                className="overflow-hidden group cursor-pointer relative"
                                onClick={() => detailHandler(item)}
                            >
                                <img
                                    src={item.img1}
                                    alt={item.name}
                                    className="w-full h-[200px] object-contain mb-2"
                                />
                                <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                            </div>
                            <div className="text-sm text-gray-950 mb-2">{item.name}</div>
                            <div className="text-sm text-gray-500">{formatCurrency(item.price)}</div>
                        </div>
                    ))}
                </div>
            </div>
            );
            {showNoti && (
                <Noti message="🛒 Đã thêm sản phẩm vào giỏ hàng!" onClose={() => setShowNoti(false)} />
            )}
        </>
    )
}
export default ProductDetail