import CollapseDescription from "@/components/LearnCourse/CollapseDescription";
import { genIndexValues } from "@/util";
import { Input } from "antd";
import React, { useRef } from "react";
import { AiOutlineEye, AiOutlineSearch } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { RiBookLine } from "react-icons/ri";

type Props = {
  children: React.ReactElement;
  course: any;
  chosen: any;
  handleChooseLesson: (lesson: any) => void;
};

function LearningTab({ children, chosen, course, handleChooseLesson }: Props) {
  return (
    <div className="learning-tab">
      <div className="box-left">
        <div className="d-flex align-items-center">
          <BiMenu size={22} />
          <span className="fw-600 ms-2">Danh sách bài giảng</span>
        </div>

        <div className="mt-3">
          <Input
            className="custom-input"
            addonAfter={<AiOutlineSearch size={22} color="#888" />}
            placeholder="Tìm kiếm bài giảng"
          />
        </div>

        <div>
          {course?.lessons?.map((item: any, index: number) => (
            <div
              onClick={() => handleChooseLesson(item)}
              className={`learning-item mt-2 ${
                chosen?._id === item?._id ? "active" : ""
              }`}
              key={item}
            >
              {genIndexValues(course?.lessons?.length || 0, index + 1)}.{" "}
              {item?.title}
            </div>
          ))}
        </div>
      </div>
      <div className="box-right">{children}</div>
    </div>
  );
}

export default LearningTab;
