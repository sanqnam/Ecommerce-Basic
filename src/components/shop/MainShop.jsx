import { useEffect, useState } from "react";
import CategoryGroup from "./CategoryGroup";
import ProductsList from "./ProductsList";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveProducts } from "../../stores/products";

const MainShop = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate()
    const data = useLoaderData();
    const { category } = useParams()
    const location = useLocation();
    const searchParam = new URLSearchParams(location.search)
    const keyword = searchParam.get('search')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(saveProducts(data))
        setProducts(data);
    }, [data,dispatch]);
    // sử lý lọc category
    useEffect(() => {
        if (category !== undefined) {
            const dataNew = data.filter(product => product.category.toLowerCase() === category.toLowerCase())
            setProducts(dataNew)
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [category, data])

    // sử lý search
    useEffect(()=>{
        if(keyword !== null){
            console.log('key', keyword)
            const dataNew = data.filter(product => product.name.toLowerCase().includes(keyword.toLocaleLowerCase()))
            setProducts(dataNew)
        }   
    },[keyword,data])

    const searchHandler = (e) =>{
        e.preventDefault()
        if(search.trim().length ===0) return alert('cần nhập nội dung tìm kiếm')
        navigate(`?search=${search}`)
    }

    return (
        <div className="flex px-10 py-8 bg-white min-h-screen text-neutral-950">
            {/* Sidebar */}
            <aside className="w-1/4 pr-6">
                <h2 className="text-lg font-semibold mb-4 italic">CATEGORIES</h2>

                <div className="space-y-2">
                    <CategoryGroup title="APPLE" items={['Apple']} />
                    <CategoryGroup title="IPHONE & MAC" items={['iPhone', 'iPod', 'Macbook']} />
                    <CategoryGroup title="WIRELESS" items={['AirPods', 'Watch']} />
                    <CategoryGroup title="OTHER" items={['Mouse', 'Keyboard', 'Other']} />
                </div>
            </aside>

            {/* Main content */}
            <div className="w-3/4 pl-6">
                {/* Top bar */}
                <div className="flex justify-between items-center mb-6">
                    <form action="" className="w-full" onSubmit={searchHandler}>
                        <input
                            type="text"
                            placeholder="Enter Search Here!"
                            className="border border-gray-300 px-4 py-2 w-1/2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                    <select className="border border-gray-300 px-2 py-2">
                        <option>Default sorting</option>
                        <option>Sort by price</option>
                        <option>Sort by popularity</option>
                    </select>
                </div>

                {/* Product grid */}
                <div className="grid grid-cols-3 gap-8">
                    <ProductsList
                        products={products}
                    />
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-8 text-sm text-gray-500">
                    <span>Showing 1–9 of 9 results</span>
                    <div className="flex items-center space-x-2">
                        <button className="px-2">&laquo;</button>
                        <button className="px-3 py-1 bg-black text-white">1</button>
                        <button className="px-2">&raquo;</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainShop;


