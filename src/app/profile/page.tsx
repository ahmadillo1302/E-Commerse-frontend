"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useGetUserQuery, useUpdateUserMutation } from "@/lib/services/api";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("buyurtmalar");
  const [editable, setEditable] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const [userId, setUserId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        try {
          const decodedToken: { id: string } = jwtDecode(accessToken);
          setUserId(decodedToken.id);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Tokenni dekod qilishda xatolik:", error);
          setIsLoggedIn(false);
          router.push("/login");
        }
      }
    }
  }, [router, setIsLoggedIn]);

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        last_name: user.last_name || "",
        first_name: user.first_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setEditable(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  const [updateUser] = useUpdateUserMutation();
  const handleSave = async () => {
    if (userId && user) {
      const updateData: Record<string, string> = {};

      Object.keys(formData).forEach((key) => {
        if (
          formData[key as keyof typeof formData] !==
          user[key as keyof typeof user]
        ) {
          updateData[key] = formData[key as keyof typeof formData];
        }
      });

      if (Object.keys(updateData).length === 0) {
        setEditable(false);
        return;
      }
      try {
        await updateUser({ id: userId, ...updateData }).unwrap();
        setEditable(false);
      } catch (error) {
        console.error("Ma'lumotlarni yangilashda xatolik:", error);
      }
    }
  };

  if (!userId) return null;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-6">Shaxsiy Profil</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex gap-4 bg-gray-100 p-2 rounded-lg mb-6">
          <TabsTrigger value="buyurtmalar" className="w-full">
            Buyurtmalar
          </TabsTrigger>
          <TabsTrigger value="profil" className="w-full">
            Profil
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profil">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {isLoading ? (
                  <p>Yuklanmoqda...</p>
                ) : error ? (
                  <p>Xatolik yuz berdi</p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Familiya</Label>
                        <Input
                          id="last_name"
                          value={formData.last_name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="first_name">Ism</Label>
                        <Input
                          id="first_name"
                          value={formData.first_name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Elektron pochta</Label>
                        <Input id="email" value={formData.email} readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone_number">Telefon raqami</Label>
                        <Input
                          id="phone_number"
                          value={formData.phone_number}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <Button variant="destructive" onClick={handleLogout}>
                        Tizimdan chiqish
                      </Button>
                      {editable && (
                        <Button variant="outline" onClick={handleSave}>
                          Ma'lumotlarni saqlash
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buyurtmalar">
          <Card className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">
              Buyurtmalar ro'yxati
            </h2>
            <p className="text-gray-600 mb-6">
              Sizda faol buyurtma mavjud emas.
            </p>
            <Link href="/">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Xaridlarni boshlash
              </Button>
            </Link>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
