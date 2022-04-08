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

