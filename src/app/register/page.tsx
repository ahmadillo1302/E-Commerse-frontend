"use client";

import type React from "react";

import { useState } from "react";
import { useRegisterMutation } from "@/lib/services/api";
import { useRegisterStore } from "@/store/useRegisterStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const {
    first_name,
    last_name,
    phone_number,
    email,
    password,
    setFirstName,
    setLastName,
    setPhoneNumber,
    setEmail,
    setPassword,
  } = useRegisterStore();

  const router = useRouter();
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = { first_name, last_name, phone_number, email, password };
      const response = await register(userData).unwrap();
      console.log("Ro'yxatdan muvaffaqiyatli o'tildi:", response);
      setSuccessMessage("Ro'yxatdan muvaffaqiyatli o'tildi!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      console.log("Xatolik detali:", JSON.stringify(err, null, 2));
    }
  };

  const errorMessage =
    error && "data" in error
      ? (error as { data?: { message?: string } }).data?.message ||
        "Noma'lum xatolik"
      : "Xatolik yuz berdi";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Ro'yxatdan o'tish
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="first_name">Ism</Label>
              <Input
                id="first_name"
                type="text"
                placeholder="Ism"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="last_name">Familiya</Label>
              <Input
                id="last_name"
                type="text"
                placeholder="Familiya"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone_number">Telefon raqami</Label>
              <Input
                id="phone_number"
                type="tel"
                placeholder="Telefon raqami"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                type="password"
                placeholder="Parol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
            </Button>
          </form>
          {isError && (
            <p className="text-red-500 mt-2 text-center">
              Xatolik: {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-500 mt-2 text-center">{successMessage}</p>
          )}
          <p className="mt-4 text-center text-sm">
            Akkountingiz bormi?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Kirish
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
