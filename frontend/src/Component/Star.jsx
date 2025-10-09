import React, { useState } from 'react';
import { RiStarSFill } from "react-icons/ri";

function Star({ starValue = 5, onRate }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className='flex gap-1'>
      {
        [...Array(starValue)].map((_, index) => {
          const currentStar = index + 1;
          const isFilled = currentStar <= (hover || rating);

          return (
            <span
              key={currentStar}
              onClick={() => {
                setRating(currentStar);
                onRate && onRate(currentStar); // pass selected star to parent
              }}
              onMouseEnter={() => setHover(currentStar)}
              onMouseLeave={() => setHover(0)}
            >
              <RiStarSFill className={`cursor-pointer text-2xl ${isFilled ? "text-yellow-400" : "text-gray-400"}`} />
            </span>
          );
        })
      }
    </div>
  );
}

export default Star;
