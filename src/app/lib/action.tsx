import Medusa from "@medusajs/medusa-js";
const medusa = new Medusa({
  // baseUrl: process.env.MEDUSA_BACKEND_URL,
  baseUrl: "http://localhost:9000/",
  maxRetries: 3,
});

// Auth
export async function SignUp(signUpData: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  try {
    console.log(signUpData);

    const response = await medusa.customers.create(signUpData);
    return response.customer;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.error("Error creating account:", error.response.data.message);
    } else {
      console.error("Error creating account:", error.message);
    }
    throw error;
  }
}

export async function login(loginData: { email: string; password: string }) {
  try {
    const response = await medusa.auth.authenticate(loginData);
    return response.customer;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.error("Error logging in:", error.response.data.message);
    } else {
      console.error("Error logging in:", error.message);
    }
    throw error;
  }
}

// get Products
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

export async function getProductById(productId: string) {
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
