import { useEffect, useState } from "react";
import CategoryGroup from "./CategoryGroup";
import ProductsList from "./ProductsList";
import { useLoaderData, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveProducts } from "../../stores/products";
import { formatCurrency } from "../Utils/utils";

const MainShop = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const data = useLoaderData();
  const { category } = useParams();
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);
  const keyword = searchParam.get('search');
  const minParam = searchParam.get('min');
  const maxParam = searchParam.get('max');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveProducts(data));
    setProducts(data);
  }, [data, dispatch]);


  // xử lý params search + price filter + category
  useEffect(() => {
    console.log('products', products);
    let filtered = data;
  
    // lọc theo category nếu có
    if (category !== undefined) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
  
    // lọc theo search keyword nếu có
    if (keyword !== null) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  
    // lọc theo price range nếu có
    if (minParam !== null && maxParam !== null) {
      const min = Number(minParam);
      const max = Number(maxParam);
      filtered = filtered.filter(product =>
        product.price >= min && product.price <= max
      );
    }
  
    setProducts(filtered);
    window.scrollTo({ top: 0, behavior: "smooth" });
  
  }, [category, keyword, minParam, maxParam, data]);
  

  const filterPrice = ({ min, max }) => {
    const params = new URLSearchParams(location.search);
    params.set('min', min);
    params.set('max', max);

    navigate(`${location.pathname}?${params.toString()}`);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (search.trim().length === 0) return alert('Cần nhập nội dung tìm kiếm');

    const params = new URLSearchParams(location.search);
    params.set('search', search);

    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-10 py-8 bg-white min-h-screen text-neutral-950">
      {/* Sidebar */}
      <aside className="md:w-1/4 md:pr-6 mb-6 md:mb-0">
        <h2 className="text-lg font-semibold mb-4 italic">CATEGORIES</h2>
        <div className="space-y-2">
          <CategoryGroup title="APPLE" items={['Apple']} />
          <CategoryGroup title="IPHONE & MAC" items={['iPhone', 'iPod', 'Macbook']} />
          <CategoryGroup title="WIRELESS" items={['AirPods', 'Watch']} />
          <CategoryGroup title="OTHER" items={['Mouse', 'Keyboard', 'Other']} />
        </div>
      </aside>
  
      {/* Main content */}
      <div className="md:w-3/4 md:pl-6 w-full">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <form className="w-full md:w-1/2" onSubmit={searchHandler}>
            <input
              type="text"
              placeholder="Enter Search Here!"
              className="border border-gray-300 px-4 py-2 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
  
          <select
            className="border border-gray-300 px-2 py-2 w-full md:w-auto"
            onChange={(e) => {
              if (e.target.value === '') {
                navigate(location.pathname);
                return;
              }
              const [min, max] = e.target.value.split('-').map(Number);
              filterPrice({ min, max });
            }}
          >
            <option value="">Price</option>
            <option value="0-2000000">
              {formatCurrency(0)} - {formatCurrency(2000000)}
            </option>
            <option value="2000000-5000000">
              {formatCurrency(2000000)} - {formatCurrency(5000000)}
            </option>
            <option value="5000000-10000000">
              {formatCurrency(5000000)} - {formatCurrency(10000000)}
            </option>
            <option value="10000000-20000000">
              {formatCurrency(10000000)} - {formatCurrency(20000000)}
            </option>
            <option value="20000000-50000000">
              {formatCurrency(20000000)} - {formatCurrency(50000000)}
            </option>
          </select>
        </div>
  
        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          <ProductsList products={products} />
        </div>
  
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 text-sm text-gray-500 space-y-4 sm:space-y-0">
          <span>Showing {products.length} result(s)</span>
          <div className="flex items-center space-x-2">
            <button className="px-2">&laquo;</button>
            <button className="px-3 py-1 bg-black text-white">1</button>
            <button className="px-2">&raquo;</button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default MainShop;
