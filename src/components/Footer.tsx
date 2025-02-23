"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Savdo Uz. Barcha huquqlar
            himoyalangan.
          </p>
          <nav className="flex flex-wrap justify-center gap-4">
            <Link
              href="/privacy-policy"
              className="text-sm hover:text-gray-400 transition"
            >
              Maxfiylik siyosati
            </Link>
            <Link
              href="/terms-of-service"
              className="text-sm hover:text-gray-400 transition"
            >
              Foydalanish shartlari
            </Link>
            <Link
              href="/contact"
              className="text-sm hover:text-gray-400 transition"
            >
              Biz bilan bog'lanish
            </Link>
            {/* Mobil menyudagi ma'lumotlarni qo'shish */}
            <Link href="/" className="text-sm hover:text-gray-400 transition">
              Bosh sahifa
            </Link>
            <Link
              href="/shop"
              className="text-sm hover:text-gray-400 transition"
            >
              Do'kon
            </Link>
            <Link
              href="/about"
              className="text-sm hover:text-gray-400 transition"
            >
              Biz haqimizda
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
