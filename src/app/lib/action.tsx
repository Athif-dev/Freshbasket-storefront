import Medusa from "@medusajs/medusa-js";
import { clearUser } from "@/app/store/userSlice";
import Cookies from "js-cookie";

const medusa = new Medusa({
  // baseUrl: process.env.MEDUSA_BACKEND_URL,
  baseUrl: "http://localhost:9000/",
  maxRetries: 3,
});

const baseUrl = "http://localhost:9000";

//////////////////// Auth  /////////////////////////
let jwtToken: string | null = null;

export function setJwtToken(token: string) {
  jwtToken = token;
}

export async function SignUp(signUpData: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  try {
    console.log(signUpData);

    const response = await medusa.customers.create(signUpData);
    const user = response.customer;

    const tokenResponse = await medusa.auth.getToken(signUpData);

    storeSession(user, tokenResponse.access_token);

    return { user, token: tokenResponse.access_token };
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
    // Authenticate the user
    const response = await medusa.auth.authenticate(loginData);
    const user = response.customer;

    const tokenResponse = await medusa.auth.getToken(loginData);

    storeSession(user, tokenResponse.access_token);

    return { user, token: tokenResponse.access_token };
  } catch (error) {
    console.error("Full error object:", error);
    console.error(
      "Error logging in:",
      error.response?.data || error.message || "An unknown error occurred"
    );
    throw error;
  }
}

// Store session data in cookies
function storeSession(user: any, token: string) {
  Cookies.set("user", JSON.stringify(user), { expires: 7, path: "/" });
  if (token) {
    Cookies.set("token", token, { expires: 7, path: "/" });
  }
  jwtToken = token;
}

// Logout function
export async function logout(dispatch) {
  await medusa.auth.deleteSession();
  Cookies.remove("user", { path: "/" });
  Cookies.remove("token", { path: "/" });
  dispatch(clearUser());
}

// Get user
export async function getUser(token: string | null) {
  try {
    const response = await fetch("http://localhost:9000/store/customers/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.log("Unauthorized: Please check your token or credentials.");
      } else {
        console.log(`Error: Received status ${response.status}`);
      }
      return;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

// Edit user info
export async function editUser(userData) {
  const jwtToken = Cookies.get("token"); // Retrieve token from cookies directly

  if (!jwtToken) {
    throw new Error("Unauthorized: JWT token is missing");
  }

  try {
    const response = await fetch(`${baseUrl}/store/customers/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },

      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

//////////////////// Profile  /////////////////////////
// Add address
export async function addAddress(addressData) {
  const jwtToken = Cookies.get("token"); // Retrieve token from cookies directly

  if (!jwtToken) {
    throw new Error("Unauthorized: JWT token is missing");
  }

  try {
    const response = await fetch(`${baseUrl}/store/customers/me/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },

      body: JSON.stringify(addressData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

// Add address
export async function editAddress(addressData, addressId) {
  console.log(JSON.stringify(addressData));

  const jwtToken = Cookies.get("token"); // Retrieve token from cookies directly

  if (!jwtToken) {
    throw new Error("Unauthorized: JWT token is missing");
  }

  try {
    const response = await fetch(
      `${baseUrl}/store/customers/me/addresses/${addressId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },

        body: JSON.stringify(addressData),
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

// Delete Address
export async function deleteAddress(addressId: string) {
  const jwtToken = Cookies.get("token");

  if (!jwtToken) {
    throw new Error("Unauthorized: JWT token is missing");
  }
  console.log("from action: " + addressId);

  try {
    const response = await fetch(
      `${baseUrl}/store/customers/me/addresses/${addressId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include", // Important for sending cookies
      }
    );

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("Fetch error:", err);
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

//Search Products
export async function searchProducts(debouncedTerm: string) {
  
  try {
    const response = await fetch(
      `http://localhost:9000/store/products?q=${debouncedTerm}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    return data.products;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.error("Error searching products", error.response.data.message);
    } else {
      console.error("Error searching products:", error.message);
    }
    throw error;
  }
}
