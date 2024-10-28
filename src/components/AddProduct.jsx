import { HiAdjustmentsVertical } from "react-icons/hi2";
import { useAddProduct } from "../services/mutations";
import styles from "./AddProduct.module.css";
function AddProduct({  setAddModule }) {
  const clickHandler = () => {
    setAddModule(true);
  };
  return (
    <div className={styles.container}>
      <button onClick={clickHandler}>Add Product</button>
      <div>
        <span>Product manegment</span>
        <HiAdjustmentsVertical className={styles.managment} />
      </div>
    </div>
  );
}

export default AddProduct;
