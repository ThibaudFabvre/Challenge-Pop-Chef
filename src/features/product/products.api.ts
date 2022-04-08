import axios from "axios";
import { Product } from "./productSlice";
const BASE_URL = 'http://localhost:3000/';


export const fetchProducts = async ()  =>{
  try {
    const { data } = await axios.get(BASE_URL + 'products');
    return { productsList: data };
  } catch (error) {
    console.log(error);
  }
}

export const fetchProductByID = async ({ id } : { id: number})  =>{
  try {
    const { data } = await axios.get(BASE_URL + `products/${id}`);
    return data[0];
  } catch (error) {
    console.log(error);
  }
}

export const createNewProduct = async ({ name, description} : { name: string, description: string }) => {

  try {
    const { data } = await axios.post(BASE_URL + 'products', { name, description });
    return data;
  } catch (error) {
    console.log(error);
  }
}


export const deleteProductByID = async ({ id } : { id : number }) => {
  try {
    const { data } = await axios.delete(BASE_URL + `products/${id}`);
    return { productsList: data};
  } catch (error) {
    console.log(error);
  }
}

export const updateProductByID = async ({ id, name, description } : Product) => {
  try {
    const { data } = await axios.put(BASE_URL + `products/${id}`, { name, description });
    console.log('TODO');
  } catch (error) {
    console.log(error);
  }
}


updateProductByID({ id: 2, name: 'test', description: 'test' });
