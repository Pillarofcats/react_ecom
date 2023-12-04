import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function ProductStars({ stars }: { stars: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((n, i) => {
        return n <= stars ? (
          <AiFillStar
            key={i}
            size={20}
            className="fill-amber-300"
          />
        ) : (
          <AiOutlineStar
            key={i}
            size={20}
            className="fill-amber-300"
          />
        );
      })}
    </div>
  );
}
