import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const userMovieList = () => {
  const { data, isLoading, error } = useSWR("/api/movies", fetcher, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });

  return { data, isLoading, error };
};
