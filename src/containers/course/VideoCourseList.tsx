import React from "react";
import VideoCourseItem from "./VideoCourseItem";
import configApp from "@/config";

type Props = {
  onShow: (e: "recommend" | "learning", course: any) => void;
  courses: any[];
  total: number;
  handleShowMore: () => void;
};

function VideoCourseList({ onShow, courses, total, handleShowMore }: Props) {
  return (
    <div className="learn-course-list mt-2 mt-sm-4">
      {courses?.length ? (
        <div className="row">
          {courses?.map((item) => (
            <VideoCourseItem
              rating={item?.rating}
              onShow={(e) => onShow(e, item)}
              key={item?._id}
              title={item?.title}
              slug={item?.slug}
              image={`${configApp.URL_IMAGE}${item?.thumbnail}`}
              {...item}
            />
          ))}
          {total > courses?.length && (
            <div className="text-center mt-4 pt-2">
              <button
                onClick={handleShowMore}
                className="btn0 btn-primary px-3 py-1"
                style={{ fontWeight: "600" }}
              >
                Xem thêm
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="fw-bolder text-center">Không có khóa học</div>
      )}
    </div>
  );
}

export default VideoCourseList;
