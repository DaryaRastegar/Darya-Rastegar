
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteProduct } from "../services/mutations";
import styles from "./DeleteModal.module.css";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../utils/cookie";

function DeleteModal({setIsShow, id, checkPageStatus}) {
  const navigate = useNavigate();
    const { mutate } = useDeleteProduct();
    const queryClient = useQueryClient();

   const deleteHandler = ()=>{
    // const newProdcts =products.find(i => i.id === id)

    mutate(id, {
        onSuccess: (data) => {
          console.log(data)
          checkPageStatus();
          setTimeout(() => {
            queryClient.invalidateQueries({
              queryKey: ["products"],
            });
          }, 100);
          setIsShow(false);
        },
        onError: (err) => {
          console.error(err)
          if(err.response.status === 401 || err.response.status === 403) {
            removeCookie();
            navigate('/login');
          }
        }
      });
    
   }
  return (
    <div className={styles.container}>
      <div className={styles.delete_container}>
        <div>
         
          <img src="Close.svg" alt="" />
          <p>Are You Sure ?</p>
          <button className={styles.cancel} onClick={()=> setIsShow(false)}>Cancel</button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
