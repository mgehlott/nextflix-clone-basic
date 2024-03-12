import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useMovieList = () => {
  const { data, isLoading, error } = useSWR("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });

  return { data, isLoading, error };
};

export default useMovieList;
