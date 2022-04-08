import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, } from '../../app/store';
import { createNewProduct, fetchProducts } from './products.api';



export type Product = {
  name: string;
  description: string;
  id: number;
}
export interface ProductState {
  list: Array<Product>,
}

const initialState: ProductState = {
  list: [],

};


export const fetchAllProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const response = await fetchProducts();
    return response;
  }
);

export const addNewProduct = createAsyncThunk(
  'product/addNewProduct',
  async (data : { name: string, description: string }) => {
    const response = await createNewProduct(data);
    return response;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.list = action?.payload?.productsList || [];
    });
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      console.log(action?.payload);
    });
  },
});

export const {  } = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.product.value)`
export const selectProducts = (state: RootState) => state.product;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export default productSlice.reducer;
