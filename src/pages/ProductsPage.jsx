import { useQuery ,keepPreviousData} from "@tanstack/react-query";
import ProductsTable from "../components/ProductsTable";
import { useGetProducts } from "../services/queries";
import { useState } from "react";
import Search from "../components/Search";

import styles from "./ProductsPage.module.css"
import AddProduct from "../components/AddProduct";
import AddModale from "../modules/AddModale";
import DeleteModal from "../modules/DeleteModal";
import EditModal from "../modules/EditModal";
import PaginationPage from "../components/PaginationPage";


function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search,setSearch] = useState("");
  const [addModule,setAddModule] = useState(null);
  const [isShow,setIsShow] = useState(null);
  const [id,setId] =useState("");
  const [isDisplay,setIsDisplay] = useState(null);
  const [editForm,setEditForm] = useState({
    id: "",
    name:"",
    quantit:"",
    price:""
  })

  
  const {isLoading, data, error,isPlaceholderData, refetch}= useGetProducts(page,search)


  if(isLoading) return <p>....loading </p>


  return <div className={styles.container}>
    <Search
      search={search}
      setSearch={setSearch}
      refetch={refetch} 
    />
    <AddProduct  setAddModule={setAddModule}/>
    <ProductsTable 
      products={data?.data?.data}
      setIsShow={setIsShow}
      setId={setId}
      setIsDisplay={setIsDisplay}
      id={id}
      setEditForm={setEditForm}
    />
    {!!addModule && (<AddModale setAddModule={setAddModule}/>)}
    {!!isShow && (<DeleteModal setIsShow={setIsShow} id={id}/>)}
    {!!isDisplay && (<EditModal setIsDisplay={setIsDisplay} editForm={editForm}/>)}
    <PaginationPage
      page={page}
      totalPage={data?.data?.totalPages || 1}
      setPage={setPage}
      refetch={refetch}
    />
  </div>;
}

export default ProductsPage;
