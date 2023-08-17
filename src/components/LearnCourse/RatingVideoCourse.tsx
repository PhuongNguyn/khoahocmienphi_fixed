import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";

type Props = {
  value: number;
  reviewer: number;
};

function RatingVideoCourse({ reviewer, value }: Props) {
  const genStars = () => {
    const temp = value > 5 ? 5 : Math.round(value);

    const resultOk = Array.from({ length: temp })?.map((item) => (
      <AiFillStar key={`a${item}`} className="star-item" />
    ));

    const resultNone = Array.from({ length: 5 - temp })?.map((item) => (
      <AiOutlineStar className="star-item" key={`a${item}`} />
    ));
    return resultOk.concat(resultNone);
  };

  return (
    <div className="rating-video-course d-flex align-items-center">
      {genStars()}
      <span
        className="ms-1 text-secondary fw-600"
        style={{ fontSize: "14px", lineHeight: 1 }}
      >
        {value}
      </span>

      {/* <span
        className="ms-1 text-secondary"
        style={{ fontSize: "14px", lineHeight: 1 }}
      >
        ({reviewer})
      </span> */}
    </div>
  );
}

export default RatingVideoCourse;
