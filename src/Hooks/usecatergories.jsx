import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCategories = () => {
  const fetchCategories = async () => {
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return res.data;
  };
  const response = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    refetchInterval: 5000,
    staleTime: 10000,
    cacheTime: 60000,
  });
  return response;
};

export default useCategories;
