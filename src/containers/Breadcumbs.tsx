import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";

type Props = {
  data?: any[];
};

function Breadcrumbs({ data }: Props) {
  return (
    <div className="breadcrumbs-wrapper">
      <div className="d-flex align-items-center">
        <Link href={"/"}>
          <FaHome size={22} style={{ marginBottom: "2px" }} />
        </Link>
        {/* 
        <FaChevronRight className="ms-2" color="#888" size={14} />

        <Link className="c-a ms-2" href={"/khoa-hoc"}>
          <span className="fw-600">Khóa học</span>
        </Link> */}

        {data?.map((item, index) => (
          <React.Fragment key={index}>
            <FaChevronRight className="ms-2" color="#888" size={14} />

            {item?.link ? (
              <Link className="c-a ms-2" href={"/khoa-hoc"}>
                <span className="fw-600">{item.title}</span>
              </Link>
            ) : (
              <span className="fw-500 ms-2">{item.title}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Breadcrumbs;
