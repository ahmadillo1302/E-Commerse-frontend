"use client";

import { useGetAllCategoriesQuery } from "@/lib/services/api";

export function useCategory() {
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery(null);

  return { categories, isLoading, error };
}
