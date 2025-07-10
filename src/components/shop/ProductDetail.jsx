
import { useEffect, useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { formatCurrency } from "../Utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../stores/products";
import Noti from "../Noti";

const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const [selectedImage, setSelectedImage] = useState('');
    const [productCategory, setProductCategory] = useState([])
    const data = useLoaderData()
    const { idProduct } = useParams()
    const imageKeys = ['img1', 'img2', 'img3', 'img4'];
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const [showNoti, setShowNoti] =useState(false)

    // sử lý dự liệu lưu trong store
    const dispatch = useDispatch()

    useEffect(() => {
        const result = data.find(prd => prd._id.$oid === idProduct)
        const category = result.category
        const resultCate = data.filter(prd => prd.category === category)
        setProductCategory(resultCate)
        console.log(resultCate)
        window.scrollTo({ top: 0, behavior: "smooth" });
        setSelectedImage(result.img1)
        setProduct(result)
    }, [data, idProduct])

    const detailHandler = (item) => {
        const id = item._id.$oid
        setQuantity(1)
        navigate(`/shop/detail/${id}`)
    }
    // sử lý sự kiện addproduct
    const addCartHandler = () => {
        const newProduct = { ...product, quantity: quantity, total: quantity * product.price }
        dispatch(addProducts(newProduct))
        setShowNoti(true)
    }

    return (
        <>
            <div className="max-w-6xl mx-auto  grid grid-cols-2 md:grid-cols-[100px_400px_auto] gap-10">
                {/* Left: Images */}
                <div className="space-x-4">
                    {imageKeys.map((key, index) => (
                        <img
                            key={index}
                            src={product[key]}
                            onClick={() => setSelectedImage(product[key])}
                            className={`w-full h-auto object-contain border p-1 cursor-pointer ${selectedImage === product[key] ? "border-black" : "border-gray-200"
                                }`}
                            alt={`Option ${index}`}
                        />
                    ))}
                </div>
                <div >
                    <img src={selectedImage} alt="Main product" className="w-full mb-4" />

                </div>

                {/* Right: Info */}
                <div>
                    <h2 className="text-2xl font-semibold text-neutral-950">{product.name}</h2>
                    <p className="text-lg text-red-600 mt-2">{formatCurrency(product.price)}</p>
                    <p className="text-sm text-gray-600 mt-4">
                        {product.short_desc}
                    </p>
                    {/* Options */}
                    <div className="mt-6 space-y-4">
                        <div>
                            <label className="text-sm text-gray-600">CATEGORY</label>
                            <div className="mt-1">Apple Watch</div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                className="w-20 border text-neutral-950 border-gray-300 rounded px-2 py-1"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" onClick={addCartHandler}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2 mt-10 italic">
                    <h3 className="text-md font-semibold mb-2 border-b border-gray-900 py-2 px-4 bg-gray-950 inline-block">
                        DESCRIPTION
                    </h3>
                    <h5 className="text-gray-950 italic my-3 font-medium">
                        PRODUCT DESCRIPTION
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line ">
                        {product.long_desc}
                    </p>
                </div>

                {/* Related Products */}

            </div>
            <div className="md:col-span-2 mt-12">
                <h3 className="text-lg font-semibold mb-4 text-neutral-950 italic">RELATED PRODUCTS</h3>
                <div className="grid grid-cols-4 gap-3 space-x-6">
                    {productCategory.map((item, index) => (
                        <div className="text-center" key={index}>
                            <div className="overflow-hidden group cursor-pointer relative" onClick={() => detailHandler(item)}>
                                <img
                                    src={item.img1}
                                    alt={item.name}
                                    className="w-ful h-[254px] mx-auto object-contain mb-2"
                                />
                                <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
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