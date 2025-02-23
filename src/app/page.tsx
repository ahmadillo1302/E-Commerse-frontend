"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  useGetAllProductsQuery,
  useGetAllReviewsQuery,
} from "@/lib/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductInterfaces, ReviewInterfaces } from "@/lib/interfaces";
import { jwtDecode } from "jwt-decode"; // JWT tokenni dekod qilish uchun

export default function HomePage() {
  const router = useRouter();

  // Boshlang'ich user holati token asosida beriladi
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  let initialUser = null;

  if (accessToken) {
    try {
      const decodedToken: { id: string; email: string } =
        jwtDecode(accessToken);
      initialUser = { id: decodedToken.id, email: decodedToken.email };
    } catch (error) {
      console.error("Tokenni dekod qilishda xatolik:", error);
    }
  }

  const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);
  const [user, setUser] = useState<{ id: string; email: string } | null>(
    initialUser
  );

  useEffect(() => {
    if (!user && accessToken) {
      try {
        const decodedToken: { id: string; email: string } =
          jwtDecode(accessToken);
        setUser({ id: decodedToken.id, email: decodedToken.email });
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Tokenni dekod qilishda xatolik:", error);
        setIsLoggedIn(false);
      }
    }
  }, [accessToken, user]);

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
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} />

      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoggedIn ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Mahsulotlar
              </CardTitle>
            </CardHeader>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products?.map((product: ProductInterfaces) => {
                    const productReviews =
                      reviews?.filter(
                        (review: ReviewInterfaces) =>
                          review?.product?.id === product.id
                      ) || [];
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        reviews={productReviews}
                        user={user}
                      />
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-4xl font-extrabold">
                Sotuv Uz-ga Xush Kelibsiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600 max-w-lg mx-auto">
                Eng yaxshi mahsulotlarni arzon narxlarda toping va xarid qiling!
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}
