import api from "../configs/api";
import { useQuery } from "@tanstack/react-query";

const useGetProducts = (page,search) => {
  const queryFn = () => api.get(`products?page=${page}&limit=10&name=${search}`);
  const queryKey = ["products", page, search];

  return useQuery({ queryFn, queryKey });
}

const searchItem = (products, search) => {
  // console.log("search => ", search)
  // console.log("products => ", products)
  const newProdcts = products?.filter((product) =>
    product?.name?.toLowerCase().includes(search.trim().toLowerCase())
  );
  if(newProdcts){
    return newProdcts;
  }
  else{
    return products;
  }
};

export { useGetProducts, searchItem};
