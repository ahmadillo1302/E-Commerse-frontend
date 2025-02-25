"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";
import { Logo } from "@/images";
import { jwtDecode } from "jwt-decode";
import { useGetUserQuery } from "@/lib/services/api";
import { Button } from "@/components/ui/button";
import type { UserInterfaces } from "@/lib/interfaces";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setIsLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Check authentication status only on client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const decodedToken: { id: string } = jwtDecode(token);
          setUserId(decodedToken.id);
          setIsAuthenticated(true);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Tokenni dekodlashda xatolik:", error);
          handleLogout();
        }
      } else {
        setIsAuthenticated(false);
        setIsLoggedIn(false);
      }
    }
  }, [setIsLoggedIn]);

  const { data: user, error: userError } = useGetUserQuery(userId!, {
    skip: !userId,
  });

  useEffect(() => {
    if (userError) {
      handleLogout();
    }
    if (user) {
      setFirstName((user as UserInterfaces).first_name);
    }
  }, [user, userError]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    setIsLoggedIn(false);
    setIsAuthenticated(false);
    setFirstName("");
    setUserId(null);
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex flex-col md:flex-row justify-between items-center relative">
      <div className="w-full md:w-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src={Logo || "/placeholder.svg"}
            alt="Logo"
            width={150}
            height={40}
            style={{ height: "auto" }}
          />
        </Link>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      <div className="w-full md:w-auto mt-4 md:mt-0 md:flex items-center space-x-4 flex-grow mx-6 max-w-md">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Mahsulotlar va turkumlar izlash"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Link
          href="/wishlist"
          className="text-gray-700 hover:text-blue-500 flex items-center space-x-2"
        >
          <Heart size={24} />
          <span>Saralanganlar</span>
        </Link>
        <Link
          href="/cart"
          className="text-gray-700 hover:text-blue-500 flex items-center space-x-2"
        >
          <ShoppingCart size={24} />
          <span>Savat</span>
        </Link>
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <Link
              href="/profile"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
            >
              <User size={24} />
              <span>{firstName || "Foydalanuvchi"}</span>
            </Link>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-gray-700 hover:text-blue-500 flex items-center space-x-2"
            >
              <LogOut size={24} />
              <span>Chiqish</span>
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button variant="outline" className="flex items-center space-x-2">
              <User size={24} />
              <span>Kirish</span>
            </Button>
          </Link>
        )}
      </div>

      {isOpen && (
        <div className="w-full md:hidden bg-white shadow-md flex flex-col space-y-4 p-4">
          <Link
            href="/wishlist"
            className="text-gray-700 hover:text-blue-500 flex items-center space-x-2"
            onClick={() => setIsOpen(false)}
          >
            <Heart size={24} />
            <span>Saralanganlar</span>
          </Link>
          <Link
            href="/cart"
            className="text-gray-700 hover:text-blue-500 flex items-center space-x-2"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart size={24} />
            <span>Savat</span>
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-blue-500 flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <User size={24} />
                <span>{firstName || "Foydalanuvchi"}</span>
              </Link>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-gray-700 hover:text-blue-500 flex items-center space-x-2"
              >
                <LogOut size={24} />
                <span>Chiqish</span>
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button
                variant="outline"
                className="w-full flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <User size={24} />
                <span>Kirish</span>
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
