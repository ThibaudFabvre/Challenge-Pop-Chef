import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchAllProducts, selectProducts } from './features/product/productSlice';
import { useEffect } from 'react';



function App() {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <div className="App">
      {list.map(({name, id, description}, index) => (
        <div key={index+id}>
          <p key={name+id}>{name}</p>
          <p key={index+name+id}>{description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
