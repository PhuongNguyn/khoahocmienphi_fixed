import RatingVideoCourse from "@/components/LearnCourse/RatingVideoCourse";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BiBookmark } from "react-icons/bi";
import { RiBookLine } from "react-icons/ri";

type Props = {
  title: string;
  image: string;
  slug: string;
  onShow: (e: "recommend" | "learning") => void;
  rating: number;
  views: number;
  lessons: any[];
};

function VideoCourseItem({
  title,
  image,
  slug,
  onShow,
  rating,
  views,
  lessons,
}: Props) {
  return (
    <div
      className={`product-item learn-course-item col-12 col-md-6 col-lg-4 mb-3`}
    >
      <div className="wrapper">
        <a className="cus-a">
          <div className="img">
            <img
              style={{ height: "200px" }}
              src={image}
              onError={(e: any) => {
                e.target.onerror = null as any;
                e.target.src =
                  "https://via.placeholder.com/300x300.png?text=Image+not+found";
              }}
              alt={title}
            />
          </div>
          <div className="title mt-1 fw-bolder">{title}</div>
          <div className="mt-1 d-flex align-items-center justify-content-between">
            <RatingVideoCourse reviewer={3} value={rating} />
            <div>
              <BiBookmark size={20} color="#888" />
            </div>
          </div>

          <div className="badge-course">Khóa học miễn phí</div>

          <div className="box-info-contact">
            <div className="d-flex align-items-center">
              <RiBookLine color="#888" />
              <span className="fw-600 ms-1 text-secondary">
                {lessons?.length || 0}
              </span>
              <span className="text-secondary ms-1">bài học</span>

              <AiOutlineEye color="#888" className="ms-3" />
              <span className="fw-600 ms-1 text-secondary">{views || 0}</span>
              <span className="text-secondary ms-1">lượt xem</span>
            </div>
          </div>
        </a>
        <div className="hover-area">
          <div className="d-flex align-items-center">
            <button onClick={() => onShow("recommend")} className="download">
              Giới thiệu
            </button>
            <button className="download" onClick={() => onShow("learning")}>
              Học nhanh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCourseItem;
