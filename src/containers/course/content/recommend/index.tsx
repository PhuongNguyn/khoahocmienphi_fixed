import CollapseDescription from "@/components/LearnCourse/CollapseDescription";
import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiBookLine } from "react-icons/ri";

type Props = {
  children: React.ReactElement;
  course: any;
  chosen: any;
};

function RecommendTab({ children, course, chosen }: Props) {
  return (
    <div className="recommend-tab">
      <div className="box-left">{children}</div>
      <div className="box-right">
        <div>
          <h3 className="fw-600">{chosen?.title || course?.title}</h3>

          <div>
            <span>
              Tạo bởi <strong>Khóa học miễn phí</strong>
            </span>

            {/* <span className="ms-3">
              Cập nhật lần cuối <strong>6 ngày trước</strong>
            </span> */}
          </div>
        </div>

        <div className="d-flex align-items-center mt-1">
          {!chosen && (
            <>
              <RiBookLine color="#888" />
              <span className="fw-600 ms-1 ">
                {course?.lessons?.length || 0}
              </span>
              <span className=" ms-1">bài học</span>
            </>
          )}

          <AiOutlineEye color="#888" className={`${chosen ? "" : "ms-3"}`} />
          <span className="fw-600 ms-1 ">{chosen?.views || course?.views}</span>
          <span className=" ms-1">lượt xem</span>

          {/* <FaRegComment color="#888" className="ms-3" />
          <span className="fw-600 ms-1 ">8</span>
          <span className=" ms-1">bình luận</span> */}
        </div>

        <CollapseDescription
          data={
            chosen
              ? [
                  {
                    title: "Giới thiệu",
                    description: chosen?.description,
                  },
                ]
              : [
                  {
                    title: "Giới thiệu khoá học",
                    description: course?.description,
                  },
                  {
                    title: "Đối tượng tham gia",
                    description: course?.participant,
                  },
                  {
                    title: "Kiến thức truyền tải",
                    description: course?.knowledge,
                  },
                  {
                    title: "Thư viện sử dụng",
                    description: course?.libraryUsed,
                  },
                ]
          }
        />
      </div>
    </div>
  );
}

export default RecommendTab;
