
import './App.css';

import { useAppDispatch, useAppSelector } from './app/hooks';

import { addNewProduct, deleteProduct, fetchAllProducts, fetchProduct, selectProducts } from './features/product/productSlice';
import { useEffect } from 'react';
import { useState } from 'react';



function App() {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(selectProducts);

  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <div className="App">
      <form>
        <p>ADD PRODUCT :</p>
        <input type="text" placeholder='New Product Name' onChange={(e) => {setNewName(e.target.value)}}/>
        <input type="text" placeholder='New Product Description' onChange={(e) => {setNewDescription(e.target.value)}}/>
        <button type="submit" onClick={(e) => {
          e.preventDefault();
          dispatch(addNewProduct({ name: newName, description: newDescription }));
        }}>Add</button>
      </form>
      {list.map(({name, id, description}, index) => (
        <div key={index+id+'wrapper'}  style={{ display: 'flex', justifyContent: 'center'}} onClick={() => {dispatch(fetchProduct({ id }))}}>
          <div style={{ backgroundColor: '#4b6e3d', marginTop: 10 }} >
            <button onClick={() => dispatch(deleteProduct({ id }))}>X</button>
            <p>{name}</p>
            <p>{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
