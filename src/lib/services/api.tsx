import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation({
      query: (userData) => ({
        url: "auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Users
    getAllUsers: builder.query({
      query: () => "users",
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...user }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),

    // Products
    getAllProducts: builder.query({
      query: () => "products",
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "products",
        method: "POST",
        body: product,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: product,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),

    // Orders
    getAllOrders: builder.query({
      query: () => "orders",
    }),
    getOrder: builder.query({
      query: (id) => ({
        url: `orders/${id}`,
        method: "GET",
      }),
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...order }) => ({
        url: `orders/${id}`,
        method: "PATCH",
        body: order,
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
    }),

    // Categories
    getAllCategories: builder.query({
      query: () => "categories",
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `categories/${id}`,
        method: "GET",
      }),
    }),
    createCategory: builder.mutation({
      query: (category) => ({
        url: "categories",
        method: "POST",
        body: category,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...category }) => ({
        url: `categories/${id}`,
        method: "PATCH",
        body: category,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
    }),

    // Payments
    createPayment: builder.mutation({
      query: (payment) => ({
        url: "payments",
        method: "POST",
        body: payment,
      }),
    }),
    getAllPayments: builder.query({
      query: () => "payments",
    }),
    getPayment: builder.query({
      query: (id) => ({
        url: `payments/${id}`,
        method: "GET",
      }),
    }),
    updatePayment: builder.mutation({
      query: ({ id, ...payment }) => ({
        url: `payments/${id}`,
        method: "PATCH",
        body: payment,
      }),
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `payments/${id}`,
        method: "DELETE",
      }),
    }),

    // Reviews
    createReview: builder.mutation({
      query: (review) => ({
        url: "reviews",
        method: "POST",
        body: review,
      }),
    }),
    getAllReviews: builder.query({
      query: () => "reviews",
    }),
    getReview: builder.query({
      query: (id) => ({
        url: `reviews/${id}`,
        method: "GET",
      }),
    }),
    updateReview: builder.mutation({
      query: ({ id, ...review }) => ({
        url: `reviews/${id}`,
        method: "PATCH",
        body: review,
      }),
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `reviews/${id}`,
        method: "DELETE",
      }),
    }),

    // Cart
    createCart: builder.mutation({
      query: (cart) => ({
        url: "carts",
        method: "POST",
        body: cart,
      }),
    }),
    getAllCarts: builder.query({
      query: () => "carts",
    }),
    getCart: builder.query({
      query: (id) => ({
        url: `carts/${id}`,
        method: "GET",
      }),
    }),
    getCartByUser: builder.query({
      query: (userId) => ({
        url: `carts?user=${userId}`,
        method: "GET",
      }),
    }),
    updateCart: builder.mutation({
      query: ({ id, ...cart }) => ({
        url: `carts/${id}`,
        method: "PATCH",
        body: cart,
      }),
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `carts/${id}`,
        method: "DELETE",
      }),
    }),
    //Cart-item
    createCartItem: builder.mutation({
      query: (item) => ({
        url: "cart-items",
        method: "POST",
        body: item,
      }),
    }),
    getAllCartItems: builder.query({
      query: () => "cart-items",
    }),
    getCartItem: builder.query({
      query: (id) => ({
        url: `cart-items/${id}`,
        method: "GET",
      }),
    }),
    updateCartItem: builder.mutation({
      query: ({ id, ...item }) => ({
        url: `cart-items/${id}`,
        method: "PATCH",
        body: item,
      }),
    }),
    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `cart-items/${id}`,
        method: "DELETE",
      }),
    }),

    // Promocodes
    getAllPromocodes: builder.query({
      query: () => "promocodes",
    }),
    getPromocode: builder.query({
      query: (id) => ({
        url: `promocodes/${id}`,
        method: "GET",
      }),
    }),
    createPromocode: builder.mutation({
      query: (promocode) => ({
        url: "promocodes",
        method: "POST",
        body: promocode,
      }),
    }),
    updatePromocode: builder.mutation({
      query: ({ id, ...promocode }) => ({
        url: `promocodes/${id}`,
        method: "PATCH",
        body: promocode,
      }),
    }),
    deletePromocode: builder.mutation({
      query: (id) => ({
        url: `promocodes/${id}`,
        method: "DELETE",
      }),
    }),

    // Order History
    createOrderHistory: builder.mutation({
      query: (orderHistory) => ({
        url: "order_history",
        method: "POST",
        body: orderHistory,
      }),
    }),
    getAllOrderHistories: builder.query({
      query: () => "order_history",
    }),
    getOrderHistory: builder.query({
      query: (id) => ({
        url: `order_history/${id}`,
        method: "GET",
      }),
    }),
    updateOrderHistory: builder.mutation({
      query: ({ id, ...orderHistory }) => ({
        url: `order_history/${id}`,
        method: "PATCH",
        body: orderHistory,
      }),
    }),
    deleteOrderHistory: builder.mutation({
      query: (id) => ({
        url: `order_history/${id}`,
        method: "DELETE",
      }),
    }),

    // Order Items
    getAllOrderItems: builder.query({
      query: () => "order_items",
    }),
    getOrderItem: builder.query({
      query: (id) => ({
        url: `order_items/${id}`,
        method: "GET",
      }),
    }),
    createOrderItem: builder.mutation({
      query: (orderItem) => ({
        url: "order_items",
        method: "POST",
        body: orderItem,
      }),
    }),
    updateOrderItem: builder.mutation({
      query: ({ id, ...orderItem }) => ({
        url: `order_items/${id}`,
        method: "PATCH",
        body: orderItem,
      }),
    }),
    deleteOrderItem: builder.mutation({
      query: (id) => ({
        url: `order_items/${id}`,
        method: "DELETE",
      }),
    }),

    // Product Images
    getAllProductImages: builder.query({
      query: () => "product_images",
    }),
    getProductImage: builder.query({
      query: (id) => ({
        url: `product_images/${id}`,
        method: "GET",
      }),
    }),
    createProductImage: builder.mutation({
      query: (productImage) => ({
        url: "product_images",
        method: "POST",
        body: productImage,
      }),
    }),
    updateProductImage: builder.mutation({
      query: ({ id, ...productImage }) => ({
        url: `product_images/${id}`,
        method: "PATCH",
        body: productImage,
      }),
    }),
    deleteProductImage: builder.mutation({
      query: (id) => ({
        url: `product_images/${id}`,
        method: "DELETE",
      }),
    }),
    // Address
    getAllAddresses: builder.query({
      query: () => "address",
    }),
    getAddress: builder.query({
      query: (id) => ({
        url: `address/${id}`,
        method: "GET",
      }),
    }),
    createAddress: builder.mutation({
      query: (Address) => ({
        url: "address",
        method: "POST",
        body: Address,
      }),
    }),
    updateAddress: builder.mutation({
      query: ({ id, ...Address }) => ({
        url: `address/${id}`,
        method: "PATCH",
        body: Address,
      }),
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `address/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllPaymentsQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useGetReviewQuery,
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useCreateCartMutation,
  useGetAllCartsQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useCreateCartItemMutation,
  useGetCartQuery,
  useGetCartByUserQuery,
  useGetAllCartItemsQuery,
  useGetCartItemQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useGetAllPromocodesQuery,
  useCreatePromocodeMutation,
  useUpdatePromocodeMutation,
  useDeletePromocodeMutation,
  useGetOrderHistoryQuery,
  useGetAllOrderItemsQuery,
  useGetAllProductImagesQuery,
  useGetAllAddressesQuery,
  useCreateAddressMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = api;
