import React from "react";
import MovieCard from "./MovieCard";

interface MovieListProps {
  data: any;
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (!data || data.length === 0) {
    return null;
  }
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold pb-8">
          <div className="mb-3">{title}</div>
          <div className="grid grid-cols-4 gap-2">
            {data.map((item: any) => (
              <MovieCard key={item.id} data={item} />
            ))}
          </div>
        </p>
      </div>
    </div>
  );
};

export default MovieList;
