import React from "react";

interface MovieCardProps {
  data: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        className="cursor-pointer object-cover transition duration
         shadow-xl 
         rounded-md
          group-hover:opacity-90
          sm:group-hover:opacity-0
          delay-300
          w-full
          h-[12vw]
          "
        src={data.thumbnailUrl}
        alt={data.title}
      />
    </div>
  );
};

export default MovieCard;
