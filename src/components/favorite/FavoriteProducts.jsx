import { useEffect, useState } from "react";
import { formatCurrency, getLocalStorege } from "../Utils/utils";
import SpinLoader from "../../layout/SpinLoader";
import { useNavigate } from "react-router-dom";

const FavoriteProducts = () => {
    const navigate = useNavigate()
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const data = getLocalStorege('favorites') || [];
    console.log('data', data);
    setFavoriteProducts(data);
    setIsLoading(false)
  }, []);
  const detailHandler = (item) => {
    const id = item._id.$oid
    console.log('detail', id)
    navigate(`/shop/detail/${id}`)
}
  if(isLoading) return <SpinLoader />

  return (
    <div className="my-4">
      {favoriteProducts.length === 0 ? (
        <div className="text-center py-10 text-neutral-500">
          No favorite products yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-gray-950 md:mx-0 mx-2">
          {favoriteProducts.slice(0, 6).map((item) => (
            <div key={item._id.$oid} className="">
              <div
                className="overflow-hidden group cursor-pointer relative"
                onClick={() => detailHandler(item)}
              >
                <img
                  src={item.img1}
                  alt={item.name}
                  className="w-full object-contain"
                />
                <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-300 transition duration-300"></div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-md italic mb-1.5">{item.name}</h3>
                <p className="text-sm text-neutral-500">
                  {formatCurrency(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default FavoriteProducts;
