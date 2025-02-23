"use client";

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { ProductCardProps } from "@/lib/interfaces";

const getUserFromToken = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    try {
      return jwtDecode<{ id: string; email: string }>(token);
    } catch (error) {
      console.error("Tokenni dekod qilishda xatolik:", error);
    }
  }
  return null;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, reviews }) => {
  const initialUser = getUserFromToken();
  const [user, setUser] = useState(initialUser);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decodedToken = jwtDecode<{ id: string; email: string }>(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Tokenni qayta dekod qilishda xatolik:", error);
      }
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64 relative">
      {/* Like tugmasi */}
      <button className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors">
        <Heart
          className={`w-5 h-5 ${
            isLiked ? "text-red-500 fill-current" : "text-gray-400"
          }`}
        />
      </button>

      <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
      <p className="text-sm text-gray-600">
        {product.category ? product.category.name : "Kategoriya yo‘q"}
      </p>
      <p className="text-lg font-bold text-gray-800 mt-2">
        {product.price.toLocaleString()} so‘m
      </p>
      <div className="flex items-center mt-2">
        <Star className="w-5 h-5 text-yellow-500 fill-current" />
        <span className="ml-1 text-sm text-gray-600">
          {reviews.length > 0
            ? (
                reviews.reduce((sum, review) => sum + review.rating, 0) /
                reviews.length
              ).toFixed(1)
            : "0"}{" "}
          ({reviews.length} ta sharh)
        </span>
      </div>
      {reviews.length > 0 && (
        <p className="text-sm text-gray-500 mt-2 italic truncate">
          "{reviews[0].comment}"
        </p>
      )}
    </div>
  );
};

export default ProductCard;
