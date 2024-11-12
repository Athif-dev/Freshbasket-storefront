import React from "react";
import { getProductById } from "@/app/lib/action";
import ProductDetailView from "@/app/components/Products/ProductDetailView";

interface Product {
  title: string;
  thumbnail: string;
  images: [{ url: string }];
  variants: [{ title: string; prices: [{ amount: number }] }];
  description: string;
}

const ProductDetailPage = async ({ params }) => {
  const productId = params.id;
  const product: Product | null = await getProductById(productId); // Fetch product data on the server

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mt-16 lg:mt-40 font-poppins">
      <ProductDetailView product={product} />
    </div>
  );
};

export default ProductDetailPage;
