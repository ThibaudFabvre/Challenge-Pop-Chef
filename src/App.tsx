
import './App.css';

import { useAppDispatch, useAppSelector } from './app/hooks';

import { addNewProduct, fetchAllProducts, selectProducts } from './features/product/productSlice';
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
        <span>ADD PRODUCT :</span>
        <input type="text" placeholder='New Product Name' onChange={(e) => {setNewName(e.target.value)}}/>
        <input type="text" placeholder='New Product Description' onChange={(e) => {setNewDescription(e.target.value)}}/>
        <button type="submit" onClick={(e) => {
          e.preventDefault();
          dispatch(addNewProduct({ name: newName, description: newDescription }));
        }}>Add</button>
      </form>
      {list.map(({name, id, description}, index) => (
        <div key={index+id} >
          <p key={name+id}>{name}</p>
          <p key={index+name+id}>{description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
