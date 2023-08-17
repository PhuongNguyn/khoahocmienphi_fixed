import Breadcrumbs from "@/containers/Breadcumbs";
import { Input } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { VscBook } from "react-icons/vsc";
import { BiChevronDown } from "react-icons/bi";
import Link from "next/link";
import useClickOutSide from "@/hooks/useClickOutSide";
import VideoCourseList from "@/containers/course/VideoCourseList";
import ContentWrapper from "@/containers/course/content/ContentWrapper";
import { GetServerSidePropsContext } from "next";
import { getCategoryBySlug } from "@/api/category";
import { useRouter } from "next/router";
import { getCourseByCategory } from "@/api/course";
import Skeleton from "react-loading-skeleton";
import Head from 'next/head'

const SkeletonPage = () => (
  <div className="mt-4">
    <div>
      <Skeleton count={1} style={{ height: "24px" }} />

      <hr />
    </div>

    <div className="row">
      {[1, 2, 3, 4, 5, 6].map((_) => (
        <div className="col col-12 col-md-6 col-lg-4 mb-3" key={_}>
          <Skeleton style={{ width: "100%", height: "300px" }} />
        </div>
      ))}
    </div>
  </div>
);

type Props = {
  category: any;
};

function LearnCoursePage({ category }: Props) {
  const { slug } = useRouter().query;
  const [isLoading, setIsLoading] = useState(true);
  const [isShowMore, setIsShowMore] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [courses, setCourses] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isShowContent, setIsShowContent] = useState<{
    show: boolean;
    initTab: "recommend" | "learning";
    course: any;
  }>({
    show: false,
    initTab: "recommend",
    course: null,
  });

  const getCourses = async (slug: string) => {
    try {
      setIsLoading(true);

      const result = await getCourseByCategory(slug, 6, pageIndex);

      const { courses, totalDoc } = result.data;

      setCourses(courses || []);
      setTotal(totalDoc || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (slug) {
      getCourses(slug as string);
    }
  }, [slug]);

  const handleShowMore = async () => {
    try {
      setIsShowMore(true);

      const result = await getCourseByCategory(
        slug as string,
        6,
        pageIndex + 1
      );

      const { courses, totalDoc } = result.data;

      setCourses((prevState) => [...prevState, ...(courses || [])]);
      setTotal(totalDoc || 0);
      setPageIndex(pageIndex + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsShowMore(false);
    }
  };

  const handleShow = (e: "recommend" | "learning", course: any) => {
    setIsShowContent({
      show: true,
      initTab: e,
      course,
    });
  };

  const handleShowClose = () => {
    setIsShowContent({
      show: false,
      initTab: "recommend",
      course: null,
    });
  };

  return (
    <>
    <Head>
      <link rel="canonical" href={`https://khoahocmienphi.net/khoahoc/${slug}`}/>
    </Head>
      {isLoading ? (
        <SkeletonPage />
      ) : (
        <div className="learn-course-page">
          {/* <Breadcrumbs
        data={[
          {
            title: "Khóa học",
            link: "/khoa-hoc",
          },
          {
            title: "Tất cả",
          },
        ]}
      /> */}
          {/* 
      <div className="mt-4">
        <Input
          className="custom-input"
          addonAfter={<AiOutlineSearch size={22} color="#888" />}
          placeholder="Tìm kiếm khóa học"
        />
      </div> */}
          <div className="mt-4 category-wrapper">
            <div className="d-flex align-items-center">
              <VscBook size={40} color="#888" />
              <span className="ms-3 category-wrapper-title-page">
                {category?.name}
              </span>
            </div>

            {/* <div className="d-flex align-items-center">
          <div ref={topicRef} className="position-relative">
            <div
              onClick={() => setShowMenuTopic(true)}
              className="d-flex align-items-center fw-600 cursor-pointer"
            >
              <span>Chủ đề</span>
              <span className="ms-1 text-danger">1</span>
              <BiChevronDown size={18} />
            </div>

            <div className={`option-category ${showMenuTopic ? "show" : ""}`}>
              {menuItemsTopic?.map((item, index) => (
                <div key={index} className="option-item">
                  <Link href={item?.link}>{item?.title}</Link>
                </div>
              ))}
            </div>
          </div>

          <div ref={categoryRef} className="position-relative ms-4">
            <div
              onClick={() => setShowMenuCategory(true)}
              className="d-flex align-items-center fw-600 cursor-pointer"
            >
              <span>Danh mục</span>
              <span className="ms-1 text-danger">1</span>
              <BiChevronDown size={18} />
            </div>

            <div
              className={`option-category ${showMenuCategory ? "show" : ""}`}
            >
              {menuItemsTopic?.map((item, index) => (
                <div key={index} className="option-item">
                  <Link href={item?.link}>{item?.title}</Link>
                </div>
              ))}
            </div>
          </div>
        </div> */}
          </div>

          <VideoCourseList
            handleShowMore={handleShowMore}
            total={total}
            courses={courses}
            onShow={handleShow}
          />

          {isShowContent.show && (
            <ContentWrapper
              initTab={isShowContent.initTab}
              onClose={handleShowClose}
              course={isShowContent.course}
              show={isShowContent.show}
            />
          )}
        </div>
      )}
    </>
  );
}

export default LearnCoursePage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const categoryBySlug = await getCategoryBySlug(
      ctx.params?.slug?.toString()
    );
    return {
      props: {
        category: categoryBySlug?.data || [],
      },
    };
  } catch (error) {
    console.log(error);
  }
}
