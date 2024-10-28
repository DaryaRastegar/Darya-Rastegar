
import { useQuery } from "@tanstack/react-query";

import styles from "./ProductsTable.module.css";
import { useState } from "react";

function ProductsTable({ products, setIsShow, setId,setIsDisplay,setEditForm }) {
  // const {isLoading, data}= useQuery({queryKey:["products",page, 10], queryFn: getProducts });

  const deletekHandler = (id) => {
    setId(id);
    setIsShow(true);
  };
  const editHandler = (id) => {
    setIsDisplay(true);
    const editPro = products.find(pro => pro.id === id)
    setEditForm({...editPro});
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Avalibility</th>
            <th>Price</th>
            <th>Identifier</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.id}</td>
              <td>
                <button onClick={() => editHandler(product.id)}>
                  <img src="edit.svg" alt="" />
                </button>
                <button
                  onClick={() => deletekHandler(product.id)} id={product.id}
                >
                  <img src="trash.svg" alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable;
