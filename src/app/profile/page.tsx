"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetAllOrdersQuery, useGetUserQuery } from "@/lib/services/api";

export default function ProfilePage() {
  const { data: user, isLoading: userLoading } = useGetUserQuery();
  const { data: orders, isLoading: ordersLoading } = useGetAllOrdersQuery();
  const [activeTab, setActiveTab] = useState("orders");

  if (userLoading || ordersLoading) {
    return (
      <p className="text-center text-gray-600">Ma'lumotlar yuklanmoqda...</p>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {user ? (
        <>
          <h1 className="text-3xl font-semibold">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">Telefon: {user.phone_number}</p>

          {/* Tabs */}
          <div className="flex gap-4 mt-4">
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "orders" ? "bg-gray-300" : "bg-gray-100"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Buyurtmalarim
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                activeTab === "info" ? "bg-gray-300" : "bg-gray-100"
              }`}
              onClick={() => setActiveTab("info")}
            >
              Ma'lumotlarim
            </button>
          </div>

          {/* Buyurtmalar */}
          {activeTab === "orders" && (
            <div className="mt-6">
              {orders?.length > 0 ? (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="border p-4 rounded-lg mt-4 bg-gray-100"
                  >
                    <p className="text-lg font-semibold">
                      Buyurtma ID: {order.id}
                    </p>
                    <p>Status: {order.status}</p>
                    <p>Umumiy narx: ${order.totalPrice}</p>
                    <p>
                      Sanasi: {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center mt-8">
                  <h2 className="text-2xl font-semibold">Hech narsa yo‘q</h2>
                  <p className="text-gray-600">
                    Sizda faol buyurtma mavjud emas!
                  </p>
                  <Button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md">
                    Xaridlarni boshlash
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* User ma'lumotlari */}
          {activeTab === "info" && (
            <div className="mt-6">
              <p>
                <strong>Ism:</strong> {user.first_name}
              </p>
              <p>
                <strong>Familiya:</strong> {user.last_name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Telefon:</strong> {user.phone_number}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600">
          Foydalanuvchi ma'lumotlari topilmadi
        </p>
      )}
    </div>
  );
}
