import { useState } from "react";
import styles from "./AddModale.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { useAddProduct } from "../services/mutations";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../utils/cookie";
function AddModule({ setAddModule }) {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useAddProduct();

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addHandler = (e) => {
    e.preventDefault();
    console.log("form => ", form);
    if (!form.name || !form.quantity || !form.price)
      return alert("please enter valid data");
    mutate(form, {
      onSuccess: (data) => {
        console.log(data)
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        setAddModule(false);
      },   onError: (err) => {
        console.error(err)
        if(err.response.status === 401 || err.response.status === 403) {
          removeCookie();
          navigate('/login');
        }
    }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        
        <form onSubmit={addHandler} className={styles.form}>
        <h3>Creat New Product </h3>
          <label htmlFor="name">Name of Product</label>
          <input type="text" name="name" id="name" placeholder="Name" onChange={changeHandler} />

          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantity"
            onChange={changeHandler}
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            onChange={changeHandler}
          />
          <div>
            <button onClick={() => setAddModule(null)}>Cancle</button>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModule;
