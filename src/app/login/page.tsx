"use client";

import type React from "react";

import { useState } from "react";
import { useLoginStore } from "@/store/useLoginStore";
import { useLoginMutation } from "@/lib/services/api";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const { email, password, setEmail, setPassword } = useLoginStore();
  const router = useRouter();
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await login(userData).unwrap();

      if (response?.accessToken) {
        localStorage.clear();
        localStorage.setItem("access_token", response.accessToken);
        localStorage.setItem("refresh_token", response.refreshToken);

        setSuccessMessage("Kirish muvaffaqiyatli bajarildi");
        console.log("Kirish muvaffaqiyatli bajarildi:", response.message);

        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        throw new Error("Token yo'q, login muvaffaqiyatsiz.");
      }
    } catch (err) {
      console.error("Kirishda xatolik:", JSON.stringify(err, null, 2));
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
            Kirish
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
              {isLoading ? "Yuklanmoqda..." : "Kirish"}
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
            Akkountingiz yo'qmi?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Ro'yxatdan o'tish
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
