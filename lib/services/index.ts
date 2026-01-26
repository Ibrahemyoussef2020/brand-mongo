import url from "@/config";
import { ProductProps } from "@/types";
import axios from "axios";
import { log } from "node:console";

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.MAIN_URL || url;
};


export const seedDatabase = async (section: string) => {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/${section}?seed=true`, { method: 'GET' });
  const data = await response.json();
  return data
};

export const fetchAllProducts = async (section: string) => {
  if (section) {

    console.log(section);
  

    const baseUrl = getBaseUrl();

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
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/${section}/seed?category=${category}`);
  const data = await response.json();
  return data
};


export const fetchSingleProduct = async (section: string, productId: string) => {
  const baseUrl = getBaseUrl();
  
  const response = await axios.get(`${baseUrl}/api/${section}/seed/${productId}`);
  
  const data = await response.data;
  return data
};


