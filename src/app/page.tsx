"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import {
  useGetAllProductsQuery,
  useGetAllReviewsQuery,
} from "@/lib/services/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProductInterfaces, ReviewInterfaces } from "@/lib/interfaces";
import { jwtDecode } from "jwt-decode";
import { useCategory } from "@/hooks/useCategory";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const { categories, isLoading, error } = useCategory();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      try {
        const decodedToken: { id: string; email: string } =
          jwtDecode(accessToken);
        setUser({ id: decodedToken.id, email: decodedToken.email });
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Tokenni dekod qilishda xatolik:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetAllProductsQuery(undefined, { skip: !isLoggedIn });

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewsError,
  } = useGetAllReviewsQuery(undefined, { skip: !isLoggedIn });

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoggedIn ? (
        <>
          {/* Kategoriyalar */}
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {isLoading ? (
              <p className="text-lg text-gray-600">Yuklanmoqda...</p>
            ) : error ? (
              <p className="text-lg text-red-500">Xatolik yuz berdi</p>
            ) : (
              categories?.map((category: { id: string; name: string }) => (
                <span
                  key={category.id}
                  className="px-6 py-3 text-black font-bold rounded-lg shadow-lg text-lg bg-white border-2 border-transparent animate-border"
                >
                  {category.name}
                </span>
              ))
            )}
          </div>

          {/* Mahsulotlar ro'yxati */}
          <Card>
            <CardContent>
              {isProductsLoading || isReviewsLoading ? (
                <p className="text-lg text-gray-600 text-center">
                  Yuklanmoqda...
                </p>
              ) : isProductsError || isReviewsError ? (
                <p className="text-lg text-red-500 text-center">
                  Xatolik yuz berdi
                </p>
              ) : (
                <motion.div
                  className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {products?.map((product: ProductInterfaces) => {
                    const productReviews =
                      reviews?.filter(
                        (review: ReviewInterfaces) =>
                          review?.product?.id === product.id
                      ) || [];
                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                      >
                        <ProductCard
                          product={product}
                          reviews={productReviews}
                          user={user}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="text-center">
          <CardHeader>
            <p className="text-4xl font-extrabold">Sotuv Uz-ga Xush Kelibsiz</p>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              Eng yaxshi mahsulotlarni arzon narxlarda toping va xarid qiling!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
