import Medusa from "@medusajs/medusa-js";
const medusa = new Medusa({ baseUrl: "http://localhost:9000/", maxRetries: 3 });

export async function getProducts() {
  try {
    const response = await medusa.products.list();
    return response.products;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.error("Error fetching products", error.response.data.message);
    } else {
      console.error("Error fetching products:", error.message);
    }
    throw error;
  }
}

export async function getProductById(productId: String) {
  try {
    const response = await medusa.products.retrieve(productId);
    return response.product;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.error("Error fetching products", error.response.data.message);
    } else {
      console.error("Error fetching products:", error.message);
    }
    throw error;
  }
}

export async function getCategories() {
  try {
    const response = await medusa.productCategories.list();
    return response;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.error("Error fetching categories", error.response.data.message);
    } else {
      console.error("Error fetching categories:", error.message);
    }
    throw error;
  }
}
