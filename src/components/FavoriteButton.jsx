import React, { useEffect, useState } from 'react';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { isFavorite, toggleFavorite } from './Utils/utils';

const FavoriteButton = ({product}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Kiểm tra xem sản phẩm có trong favorite không khi mount
    const id = product._id.$oid
    setLiked(isFavorite(id));
  }, [product]);

  const handleToggle = () => {
    toggleFavorite(product);
    setLiked(!liked);
  };

  return (
    <button onClick={handleToggle} className="focus:outline-none">
      {liked ? (
        <SolidHeartIcon className="w-8 h-8 text-red-500 transition transform scale-110 cursor-pointer" />
      ) : (
        <OutlineHeartIcon className="w-8 h-8 text-gray-500 hover:text-red-500 transition cursor-pointer" />
      )}
    </button>
  );
};

export default FavoriteButton;
