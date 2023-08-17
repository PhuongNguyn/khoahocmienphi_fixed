import {
  getAllCategories,
  getByParentSlug,
  getCategoryBySlug,
} from "@/api/category";
import {
  getPageBySlug,
  getPostByCateSlug,
  verifyDownloadCode,
} from "@/api/posts";
import BoxCategory from "@/components/BoxCategory";
import ProductItem from "@/containers/ProductItem";
import { Space } from "antd";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { BsDownload, BsEye } from "react-icons/bs";
import Head from "next/head";
import Skeleton from "react-loading-skeleton";
import ContentWrapper from "@/containers/course/content/ContentWrapper";

const SkeletonPage = () => {
  return (
    <div className="mt-4">
      <div>
        <Skeleton style={{ height: "24px" }} count={1} />
        <hr />

        <div className="row">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div className="col col-6 col-sm-6 col-md-4 col-lg-3 mb-2">
              <Skeleton style={{ width: "100%", height: "250px" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function PageItem({ category }: { category: any }) {
  const [data, setData] = useState<any>({});
  const [posts, setPosts] = useState([]);
  const [showIntroduce, setShowIntroduce] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [checkVerifyCode, setCheckVerifyCode] = useState("not-set");
  const router = useRouter();
  let slug = router.query?.slug;
  const { act, keyword } = router.query;

  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [isShowContent, setIsShowContent] = useState<{
    show: boolean;
    initTab: "recommend" | "learning";
    course: any;
    post?: any;
  }>({
    show: false,
    initTab: "recommend",
    course: null,
    post: null,
  });

  // Dự liệu cho button Học nhanh ở trang chi tiết bài viết
  const [course, setCourse] = useState({});

  const handleShow = (e: "recommend" | "learning", course: any, post: any) => {
    setIsShowContent({
      show: true,
      initTab: e,
      course,
      post,
    });
  };

  const handleShowClose = () => {
    setIsShowContent({
      show: false,
      initTab: "recommend",
      course: null,
      post: null,
    });
  };

  const getPostByCategorySlug = async () => {
    try {
      setIsLoadingPost(true);
      const post = await getPostByCateSlug(slug as string);
      setPosts(post.data?.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingPost(false);
    }
  };

  const getPageData = async () => {
    try {
      setIsLoadingPage(true);
      const pageData = await getPageBySlug(slug as string);
      setData(pageData.data);
      setCourse(pageData.data?.course || {});
      if (!course) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      router.push("/");
    } finally {
      setIsLoadingPage(false);
    }
  };

  const copyKeyword = (value: string) => {
    window.navigator.clipboard.writeText(value);
    setIsCopied(true);
  };

  useEffect(() => {
    if (slug) {
      getPageData();
      getPostByCategorySlug();
    }
  }, [slug]);

  const verify = async () => {
    try {
      const result = await verifyDownloadCode(verifyCode);
      if (result.data?.status) setCheckVerifyCode("true");
      else setCheckVerifyCode("false");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        {category?.categorySchema}
        {category && <meta name="description" content={category?.meta} />}
        {data.data?.description && (
          <meta name="description" content={data.data?.description} />
        )}
        <link rel="canonical" href={`https://khoahocmienphi.net/${slug}`} />
      </Head>
      {isShowContent.show && (
        <ContentWrapper
          initTab={isShowContent.initTab}
          onClose={handleShowClose}
          course={isShowContent.course}
          show={isShowContent.show}
          post={isShowContent.post}
        />
      )}
      {isLoadingPage || isLoadingPost ? (
        <SkeletonPage />
      ) : data?.data?.type == "category" ? (
        <section id="section-content">
          {/* <div>{act} - {keyword}</div> */}
          <div className="row">
            <p className="h4 title-page px-0 pb-2">
              {data?.data?.category?.name}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: data?.data?.category?.description,
              }}
            ></div>
            <BoxCategory data={data?.data?.category?.child || []} />
            <div className="px-0 row">
              {posts.map((item: any, index) => (
                <ProductItem
                  slug={item?.path}
                  title={item?.title}
                  image={item?.thumbnail}
                  index={index}
                  key={index}
                  courses={item?.courses?.[0] || []}
                  onShow={(e) => handleShow(e, item?.courses?.[0], item)}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="">
          <section id="section-content">
            <div className="row">
              <h1 className="h4 title-page px-0 pb-2">{data?.data?.title}</h1>
              <div className="mt-4 p-2 row">
                {data?.data?.path !== "gioi-thieu-va-dieu-khoan-su-dung" && (
                  <div className="ratingblock">
                    <div>
                      {" "}
                      <ul className="unit-rating" style={{ width: "100px" }}>
                        {" "}
                        <li
                          className="current-rating"
                          style={{ width: "80px" }}
                        >
                          Currently 3.9/5
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>{" "}
                      </ul>
                      <span className="hreview-aggregate">
                        <span className="item">
                          <span>
                            <span className="rating">
                              <span className="average">
                                <strong>3.9</strong>
                              </span>
                              /
                              <span className="best">
                                <strong>5</strong>
                              </span>{" "}
                              trong{" "}
                              <span className="votes">
                                <strong>38</strong>
                              </span>{" "}
                              đánh giá<span className="summary"></span>
                            </span>
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                )}
                {data?.data?.path !== "gioi-thieu-va-dieu-khoan-su-dung" && (
                  <img
                    style={{
                      maxWidth: "500px",
                      height: "auto",
                      border: "0.5px solid gray",
                      borderRadius: "5px",
                      margin: "0 auto",
                    }}
                    alt={data?.data?.altThumbnail || data?.data?.path}
                    src={data?.data?.thumbnail}
                  />
                )}
                {data?.data?.path !== "gioi-thieu-va-dieu-khoan-su-dung" && (
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="button-download">
                      <button onClick={() => setShowIntroduce(!showIntroduce)}>
                        <BsDownload style={{ verticalAlign: "-3px" }} />
                        <span style={{ marginLeft: "5px" }}>Tải Xuống</span>
                      </button>
                    </div>
                    <div className="button-download ms-2">
                      <button
                        className="primary"
                        onClick={() =>
                          handleShow("learning", course, data?.data)
                        }
                      >
                        <BsEye style={{ verticalAlign: "-3px" }} />
                        <span style={{ marginLeft: "5px" }}>Học nhanh</span>
                      </button>
                    </div>
                  </div>
                )}

                {showIntroduce && (
                  <div className="introduce-download">
                    <div className="introduce-content">
                      <p>
                        Làm theo hướng dẫn bên dưới để lấy mã xác thực nhập vào
                        ô bên trên:
                      </p>
                      <p>
                        <strong>Bước 1: </strong>Vào google tìm từ khoá:{" "}
                        <input value={data.data?.keyWord} disabled />
                        <button
                          className="button-copy-keyword"
                          onClick={() => copyKeyword(data.data?.keyWord)}
                        >
                          {!isCopied ? "Copy" : "Đã Copy"}
                        </button>
                      </p>
                      {data.data?.image && (
                        <img src={data.data?.image} alt="khoahocmienphi.net" />
                      )}
                      <p style={{ marginTop: "20px" }}>
                        <strong>Bước 2: </strong>Tìm từ trên xuống dưới sẽ thấy
                        trang{" "}
                        <span style={{ color: "rgb(0, 128, 0)" }}>
                          {data.data?.domains}
                        </span>{" "}
                        thì bấm vào đó
                      </p>
                      {data.data?.image1 && (
                        <img src={data.data?.image1} alt="khoahocmienphi.net" />
                      )}
                      <p style={{ marginTop: "20px" }}>
                        <strong>Bước 3: </strong>Kéo xuống tìm trong trang đó sẽ
                        thấy Mã xác thực
                      </p>
                      {data.data?.image2 && (
                        <img src={data.data?.image2} alt="khoahocmienphi.net" />
                      )}
                      <h2
                        style={{
                          marginTop: "30px",
                          textAlign: "center",
                          fontSize: "24px",
                        }}
                      >
                        Xác minh bạn không phải Robot
                      </h2>
                      <div className="mt-4 d-flex justify-content-center co">
                        <input
                          className="input-verify-code"
                          placeholder="Nhập mã xác nhận"
                          onChange={(e) => setVerifyCode(e.target.value)}
                        />
                        <div
                          className="button-verify-code"
                          onClick={() => verify()}
                        >
                          Xác Nhận
                        </div>
                      </div>
                      {checkVerifyCode != "not-set" && (
                        <div className="download-link">
                          {checkVerifyCode == "true" ? (
                            <h5
                              style={{
                                color: "red",
                                textAlign: "center",
                                marginTop: "15px",
                              }}
                            >
                              <a
                                style={{
                                  textDecoration: "none",
                                  display: "block",
                                  wordBreak: "break-word",
                                }}
                                href={data.data?.downloadLink}
                              >
                                <span style={{ color: "#039650" }}>
                                  File tài liệu:{" "}
                                </span>
                                {data.data?.downloadLink}
                              </a>
                            </h5>
                          ) : (
                            <h5
                              style={{
                                color: "red",
                                textAlign: "center",
                                marginTop: "15px",
                              }}
                            >
                              Sai mã xác thực, vui lòng thử lại!
                            </h5>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div
                  dangerouslySetInnerHTML={{ __html: data.data?.content }}
                  style={{ marginTop: "20px" }}
                />
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default PageItem;

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
