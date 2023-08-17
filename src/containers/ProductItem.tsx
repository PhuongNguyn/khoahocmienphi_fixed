import { genClassNameProductItem } from "@/util";
import Link from "next/link";
import React from "react";

type Props = {
  index?: number;
  isSlideItem?: boolean;
  title: string;
  image: string;
  slug: string;
  downButton?: string;
  isPost?: boolean;
  onShow: (e: "recommend" | "learning") => void;
  courses: any;
};

function ProductItem({
  index = 0,
  isSlideItem = false,
  title,
  image,
  slug,
  downButton = "Tải xuống",
  isPost = false,
  courses,
  onShow,
}: Props) {
  return (
    <div
      className={`product-item  ${
        isSlideItem ? "slide" : "col-12 col-md-4 col-lg-3"
      } ${genClassNameProductItem(index)}`}
    >
      <div className="wrapper">
        <Link className="cus-a" href={isPost ? `/tin-tuc/${slug}` : `/${slug}`}>
          <div className="img">
            <img
              style={{ maxHeight: "250px", width: "100%" }}
              src={
                image || "https://tailieumienphi.info/upload/images/no-img.jpg"
              }
              alt={title}
            />
          </div>
          <div className="text-center price mt-1">Miễn phí</div>
          <div className="title mt-1 text-center">{title}</div>
        </Link>
        <div className="hover-area">
          {courses && (
            <div className="d-flex align-items-center mb-1">
              <button className="download">
                {" "}
                <Link style={{ textDecoration: "none" }} href={`/${slug}`}>
                  {downButton}{" "}
                </Link>
              </button>

              <button className="download" onClick={() => onShow("learning")}>
                Học nhanh
              </button>
            </div>
          )}
          {/* {!isPost && (
            <a href={`/${slug}`}>
              <button className="download">{downButton}</button>
            </a>
          )}
          {isPost && (
            <a href={`/tin-tuc/${slug}`}>
              <button className="download">{downButton}</button>
            </a>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
