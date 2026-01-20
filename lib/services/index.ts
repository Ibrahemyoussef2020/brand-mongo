import url from "@/config";
import { ProductProps } from "@/types";
import axios from "axios";

const baseUrl = process.env.MAIN_URL || url;

export const seedDatabase = async (section: string) => {
  const response = await fetch(`${baseUrl}/api/${section}?seed=true`, { method: 'GET' });
  const data = await response.json();
  return data
};

export const fetchAllProducts = async (section: string) => {
  if (section) {
    console.log('baseUrllllllllllllllllllll', section, process.env.MAIN_URL)

    const baseUrl = process.env.MAIN_URL || url;

    const response = await fetch(`${baseUrl}/api/${section}/seed`, { method: 'GET' });


    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText} \n ${errorText}`);
    }

    return response.json();
  }

};



export const fetchCategoryProducts = async (section: string, category: string) => {
  const baseUrl = process.env.MAIN_URL || url;
  const response = await fetch(`${baseUrl}/api/${section}/seed?category=${category}`);
  const data = await response.json();
  return data
};


export const fetchSingleProduct = async (section: string, productId: string) => {
  const baseUrl = process.env.MAIN_URL || url;
  console.log('baseUrllllllllllllllllllll', section, 'id', productId)
  const response = await axios.get(`${baseUrl}/api/${section}/seed?id=${productId}`);
  console.log('response__', response.data);
  
  const data = await response.data;
  return data
};


