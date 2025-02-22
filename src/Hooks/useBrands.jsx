import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useBrands = () => {
  const fetchBrands = async () => {
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    return res.data;
  };
  const response = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    refetchInterval: 5000,
    staleTime: 10000,
    cacheTime: 60000,
  });
  return response;
};

export default useBrands;
