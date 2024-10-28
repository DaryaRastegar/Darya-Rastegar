import { LuSearchCheck } from "react-icons/lu";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useGetProducts } from "../services/queries";
import { searchItem } from "../services/queries";
import styles from "./Search.module.css";

function Search({ search, setSearch, refetch, products, setProducts, page }) {
  const [isShow, setIsShow] = useState(true);
  const {isLoading, data, error,isPlaceholderData}= useGetProducts(page,search)

  const changeHandler = (str) => {
    setSearch(str);
    if(str){
        setIsShow(false);
        refetch();
      
    }else{
        setIsShow(true);
        refetch();
    }
 
  };


  return (
    <div className={styles.container}>
      <div className={styles.inputDiv}>
        <div className={styles.info}>
          <div>
            <p>Milad azami</p>
            <span>Director</span>
          </div>
          <img src="Felix-Vogel-4.svg" alt="" />
        </div>
        <input type="text" value={search} onChange={(e) => changeHandler(e.target.value)} />
        {isShow ? <LuSearchCheck className={styles.icon} /> : null}
      </div>
    </div>
  );
}

export default Search;
