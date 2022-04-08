import axios from "axios";
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

