import axios from "axios";
const BASE_URL = 'http://localhost:3001/';

const testData = { 
  productsList: [
    { name: 'patate', description: 'blablablabla', id: 1},
    { name: 'tomate', description: 'blablablabla', id: 2}, 
    { name: 'carotte', description: 'blablablabla', id: 30},
    { name: 'pomme', description: 'blablablabla', id: 4},
    { name: 'poire', description: 'blablablabla', id: 500},  
  ],
};
// A mock function to mimic making an async request for data
export function fetchProducts() {
  //  axios.get('products/' + id);
  setTimeout(()=> { 
  }, 1000);
  return testData;
}