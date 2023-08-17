import { getHome, searchCategory } from "@/api/category";
import Banner from "@/containers/Banner";
import CourseList from "@/containers/home/CourseList";
import SectionCategory from "@/containers/home/SectionCategory";
import ProductItem from "@/containers/ProductItem";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { useQuery } from "react-query";
import ReactLoading from "react-loading";
import { getAllNews } from "@/api/news";
import NewList from "@/containers/home/NewsList";
import ContentWrapper from "@/containers/course/content/ContentWrapper";
import Head from "next/head";

const banner = [
  {
    id: 1,
    image: "https://tailieumienphi.info/images/2-300x204.jpg",
    caption: (
      <div className="caption">
        <div className="banner-info">
          <h3 className="title">
            200 khoá học <br /> <strong>Ngoại ngữ</strong> <br /> hot nhất
          </h3>
          <span className="price">
            <span className="start_price">đều </span>
            Miễn phí
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    image: "https://tailieumienphi.info/images/3-300x204.jpg",
    caption: (
      <div className="caption">
        <div className="banner-info">
          <h4 className="pretitle">50.000 video</h4>
          <h3 className="title">
            Tài liệu <br />
            <strong>học tập </strong> cho
            <br /> Học Sinh
            <br />
            Sinh Viên
          </h3>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    image: "https://tailieumienphi.info/images/5-1-300x204.jpg",
    caption: (
      <div className="caption">
        <div className="banner-info">
          <h3 className="title">
            <strong>2.000 khoá học</strong> <br /> chuyên ngành <br /> Marketing{" "}
            <br /> Truyền Thông <br /> Quảng cáo
          </h3>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    image: "https://tailieumienphi.info/images/4-1-300x204.jpg",
    caption: (
      <div className="caption">
        <div className="banner-info">
          <h4 className="pretitle">500 chương trình</h4>
          <h3 className="title">
            Đào tạo
            <br />
            <strong>kinh doanh </strong> <br /> Khởi nghiệp
          </h3>
        </div>
        <span className="price">
          Miễn phí{" "}
          <del>
            <span className="amount">999$</span>
          </del>
        </span>
      </div>
    ),
  },
];

function HomePage() {
  const router = useRouter();
  const { act, keyword } = router.query;
  const { data: newData, isLoading: newsLoading } = useQuery("getNews", () =>
    getAllNews()
  );
  const { data, isLoading } = useQuery("getHome", () => getHome());
  const search = router?.query?.keyword;
  const [dataSearch, setDataSearch] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [isShowContent, setIsShowContent] = useState<{
    show: boolean;
    initTab: "recommend" | "learning";
    course: any;
  }>({
    show: false,
    initTab: "recommend",
    course: null,
  });

  
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


  const searchCategories = async (text: any) => {
    setLoading(true);
    const data = await searchCategory(text as string);
    setDataSearch(data?.data?.data);
    setLoading(false);
  };
  

  useEffect(() => {
    if (search) searchCategories(search);
  }, [search]);
  return (
    <>
    <Head>
      <meta name="description" content="Hệ thống khóa học - tài liệu miễn phí.
Học hành là một quá trình không ngừng, chúng ta phải học mãi mãi để tiếp tục phát triển và giữ mình trong bước với thời gian."/>
       <link rel="canonical" href={`https://khoahocmienphi.net`}/>
    </Head>
     {isShowContent.show && (
            <ContentWrapper
              initTab={isShowContent.initTab}
              onClose={handleShowClose}
              course={isShowContent.course}
              show={isShowContent.show}
            />
          )}
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "900px",
            height: "600px",
          }}
        >
          <ReactLoading type="spin" color="#000" />
        </div>
      ) : (
        <>
          {search?.length ? (
            <>
              {dataSearch?.length ? (
                <>
                  {search ? (
                    <div style={{ fontSize: "25px", marginTop: '20px', fontWeight: 600 }}>
                      Từ khóa của bạn:{" "}
                      <span style={{ color: "red" }}>{keyword}</span>
                    </div>
                  ) : null}{" "}
                  <div>
                    <div className="row px-0">
                      {dataSearch?.map((item: any, index: number) => {
                        return (
                          <ProductItem
                            key={index}
                            index={index}
                            title={item?.title}
                            image={item?.thumbnail}
                            slug={item?.path}
                            courses={item?.courses?.[0] || []}
                            onShow={(e) => handleShow(e, item?.courses?.[0])}
                          />
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div style={{marginTop: '20px'}}>
                  <span style={{ fontSize: "25px", color: "red" }}>
                    không có bài viết nào
                  </span>
                </div>
              )}
            </>
          ) : (
            <div>
              {/* <NewList data={newData?.data.news} /> */}
              <section>
                <div className="row banner-primary justify-content-center align-items-center mx-2">
                  <div className="col col-5">
                    <h6 className="h6">Dự án cộng đồng</h6>
                    <h3 className="h3 mt-3">
                      Tất cả khoá học trả phí hàng đầu hiện nay đều được
                    </h3>
                    <h3 className="h3 mt-3 price">Miễn phí</h3>
                    <h6 className="h6 amount">
                      <del>999$</del>
                    </h6>
                    <div>
                      <a href="/">
                        <button className="btn0 mt-4 btn-primary">
                          <span>Xem ngay</span>
                          <HiArrowNarrowRight />
                        </button>
                      </a>
                    </div>
                  </div>
                  <div className="col col-6">
                    <div className="img">
                      <img
                        alt="Dự án cộng đồng"
                        src="https://tailieumienphi.info/images/Banner-slider-6.png"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  {banner?.map((item) => (
                    <div key={item?.id} className="col col-12 col-md-6">
                      <Banner caption={item?.caption} image={item?.image} />
                    </div>
                  ))}
                </div>
              </section>
              <h1 style={{textAlign: 'center', fontSize: '20px', marginTop: '10px'}}>Khoá học miễn phí</h1>
              <CourseList data={data?.data?.data?.categoryList} />

              {/* {data?.data?.data?.section?.map((item: any) => (
                <SectionCategory
                  key={item?.id}
                  data={item?.posts}
                  name={item?.name}
                />
              ))} */}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default HomePage;
