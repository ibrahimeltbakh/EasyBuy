import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { fetchRecentProducts } from "../RTK/Slices/recentProducts";
const useProducts = () => {
  const dispatch = useDispatch();
  const response = useQuery({
    queryKey: ["recentProducts"],
    queryFn: async () => {
      const response = await dispatch(fetchRecentProducts());
      return response.payload;
    },
    refetchInterval: 3000,
    staleTime: 10000,
    //   refetchIntervalInBackground:true,
    //   retry:6,
    //   retryDelay:5000,
    //   gcTime:5000,
    //   select:(data)=>{ data.data.data}
  });
  return response;
};

export default useProducts;
