"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Star, Heart, ShoppingCart } from "lucide-react";
import {
  useCreateCartItemMutation,
  useGetCartByUserQuery,
} from "@/lib/services/api";
import type { ProductCardProps, CartInterfaces } from "@/lib/interfaces";
import { useToast } from "@/components/ui/use-toast";

export const useUserCart = (userId?: string) => {
  return useGetCartByUserQuery(userId, { skip: !userId });
};
console.log(useUserCart);

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  reviews,
  user,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const { toast } = useToast();

  const { data: cart } = useGetCartByUserQuery(user?.id, {
    skip: !user,
  });

  const [createCartItem] = useCreateCartItemMutation();

  const handleAddToCart = async () => {
    if (!user || !cart) {
      console.error("Foydalanuvchi tizimga kirmagan yoki savat mavjud emas!");
      return;
    }
    const cartId = cart[0].id;
    try {
      const cartItem = {
        cart: cartId,
        product: product.id,
        quantity,
        price: product.price * quantity,
      };

      await createCartItem(cartItem).unwrap();
      setIsInCart(true);
      toast({
        title: "Muvaffaqiyatli",
        description: "Mahsulot savatga qo'shildi",
        duration: 2000,
      });
    } catch (error) {
      console.error("Savatga qo'shishda xatolik:", error);
      toast({
        title: "Xatolik",
        description: "Mahsulotni savatga qo'shib bo'lmadi",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-64 relative">
      {/* Like (Heart) tugmasi */}
      <button className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors z-10">
        <Heart
          className={`w-5 h-5 ${
            isLiked ? "text-red-500 fill-current" : "text-gray-400"
          }`}
        />
      </button>

      {/* Savatchaga qo‘shish (ShoppingCart) tugmasi */}
      <button
        onClick={handleAddToCart}
        className="absolute top-16 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 active:scale-95 transition-all duration-200 z-10"
      >
        <ShoppingCart
          className={`w-5 h-5 ${
            isInCart ? "text-blue-500 fill-current" : "text-gray-400"
          }`}
        />
      </button>

      {/* Rasm qismi */}
      <div className="relative w-full h-48 mb-4">
        {product.images.length > 0 ? (
          <Image
            src={`http://localhost:4000${product.images[0].image_url}`}
            alt={product.name}
            fill
            className="object-cover rounded-lg z-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center z-0">
            <span className="text-gray-400">Rasm mavjud emas</span>
          </div>
        )}
      </div>

      {/* Mahsulot nomi va ma'lumotlari */}
      <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.category.name}</p>
      <p className="text-lg font-bold text-gray-800 mt-2">
        {product.price.toLocaleString()} so'm
      </p>
      <div className="flex items-center mt-2">
        <Star className="w-5 h-5 text-yellow-500 fill-current" />
        <span className="ml-1 text-sm text-gray-600">
          {averageRating} ({reviews.length} ta sharh)
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
