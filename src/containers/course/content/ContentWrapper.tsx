import React, { useState, useEffect } from "react";
import { BiDownload, BiMenu } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import RecommendTab from "./recommend";
import { RiBook2Line } from "react-icons/ri";
import LearningTab from "./learning";
import YTB from "./learning/YTB";
import moment from "moment";
import CodeDownloadVideo from "./CodeDownloadVideo";
import { Button, Modal } from "antd";
import { verifyDownloadCode } from "@/api/posts";

type Props = {
  show: boolean;
  onClose: any;
  initTab: "recommend" | "learning";
  course: any;
  post: any;
};

const NotFoundVideo = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ width: "100%", height: "100%" }}
    >
      <div style={{ color: "#fff", fontWeight: "600", fontSize: "20px" }}>
        Không có Video
      </div>
    </div>
  );
};

function ContentWrapper({
  show = false,
  onClose = () => null,
  initTab = "recommend",
  course,
  post,
}: Props) {
  const [tab, setTab] = useState<"recommend" | "learning">(initTab);
  const [time, setTime] = useState(0);
  const [selected, setSelected] = useState({
    url: "",
    type: "",
  });
  // chosen lesson
  const [chosen, setChosen] = useState(null);
  console.log("post", post);

  // for download
  const [modalDownload, setModalDownload] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [checkVerifyCode, setCheckVerifyCode] = useState("not-set");

  useEffect(() => {
    if (show) {
      setTab(initTab);
      if (initTab === "recommend") {
        setSelected({
          url: course?.introduceVideo || "",
          type: "youtube",
        });
      } else if (initTab === "learning") {
        const lesson = course?.lessons?.[0];
        setChosen(lesson);
        setTime(0);
        setSelected({
          url: lesson?.video,
          type: lesson?.videoType,
        });
      }
    }
  }, [initTab, show, course]);

  const onSaveTime = (time: number) => {
    setTime(Math.ceil(time));
  };

  const handleChooseLesson = (lesson: any) => {
    setChosen(lesson);
    setTime(0);
    setSelected({
      url: lesson?.video,
      type: lesson?.videoType,
    });
  };

  const handleChangeTab = () => {
    setTab(tab === "learning" ? "recommend" : "learning");
  };

  const render = {
    recommend: (
      <RecommendTab chosen={chosen} course={course}>
        {selected.url && selected.type === "youtube" ? (
          <YTB
            start={time}
            videoId={selected.url}
            show={show}
            onSaveTime={onSaveTime}
          />
        ) : selected.url && selected.type === "driver" ? (
          <CodeDownloadVideo chosen={chosen} />
        ) : (
          <NotFoundVideo />
        )}
      </RecommendTab>
    ),
    learning: (
      <LearningTab
        handleChooseLesson={handleChooseLesson}
        chosen={chosen}
        course={course}
      >
        {selected.url && selected.type === "youtube" ? (
          <YTB
            start={time}
            videoId={selected.url}
            show={show}
            onSaveTime={onSaveTime}
          />
        ) : selected.url && selected.type === "driver" ? (
          <CodeDownloadVideo chosen={chosen} />
        ) : (
          <NotFoundVideo />
        )}
      </LearningTab>
    ),
    // learning: (
    //   <div className="learning-tab">
    //     <div className="box-left">
    //       <div className="d-flex align-items-center">
    //         <BiMenu size={22} />
    //         <span className="fw-600 ms-2">Danh sách bài giảng</span>
    //       </div>

    //       <div className="mt-3">
    //         {/* <Input
    //           className="custom-input"
    //           addonAfter={<AiOutlineSearch size={22} color="#888" />}
    //           placeholder="Tìm kiếm bài giảng"
    //         /> */}
    //       </div>

    //       <div>
    //         {[
    //           1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6, 7, 8,
    //           9, 10, 11, 12, 13,
    //         ].map((item) => (
    //           <div className="learning-item mt-2" key={item}>
    //             01. Cấu trúc dữ liệu & giải thuật là gì?
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //     <div className="box-right">
    //       <YTB />
    //     </div>
    //   </div>
    // ),
  };

  const copyKeyword = (value: string) => {
    window.navigator.clipboard.writeText(value);
    setIsCopied(true);
  };

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
      <div className={`content-course-wrapper ${show ? "" : "d-none"}`}>
        <div className="button-change-tab-wrapper">
          {tab === "recommend" ? (
            <button
              onClick={handleChangeTab}
              className="btn0 button-change-tab"
            >
              <BiMenu size={22} />
              <span className="ms-1">Danh sách bài giảng</span>
            </button>
          ) : (
            <button
              onClick={handleChangeTab}
              className="btn0 button-change-tab"
            >
              <RiBook2Line size={22} />
              <span className="ms-1">Nội dung</span>
            </button>
          )}
          <button
            onClick={() => setModalDownload(true)}
            className={`btn0 button-download-content-course ${
              tab === "recommend" ? "far" : "next"
            }`}
          >
            <BiDownload size={22} />
            <span className="ms-1">Tải xuống</span>
          </button>
        </div>

        <button
          onClick={() => {
            onClose();
            setTime(0);
            setChosen(null);
          }}
          className="button-close btn0"
        >
          <IoCloseSharp size={30} />
        </button>

        <div className="content-course">{render[tab]}</div>
      </div>

      <Modal
        title="Tải xuống"
        open={modalDownload}
        width={1000}
        footer={[
          <Button onClick={() => setModalDownload(false)} color="primary">
            Đóng
          </Button>,
        ]}
        className="modal-download-course-wrapper"
        onCancel={() => setModalDownload(false)}
      >
        <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
          <div className="introduce-download">
            <div className="introduce-content">
              <p>
                Làm theo hướng dẫn bên dưới để lấy mã xác thực nhập vào ô bên
                trên:
              </p>
              <p>
                <strong>Bước 1: </strong>Vào google tìm từ khoá:{" "}
                <input value={post.keyWord} disabled />
                <button
                  className="button-copy-keyword"
                  onClick={() => copyKeyword(post.keyWord)}
                >
                  {!isCopied ? "Copy" : "Đã Copy"}
                </button>
              </p>
              {post.image && <img src={post.image} alt="" />}
              <p style={{ marginTop: "20px" }}>
                <strong>Bước 2: </strong>Tìm từ trên xuống dưới sẽ thấy trang{" "}
                <span style={{ color: "rgb(0, 128, 0)" }}>{post.domains}</span>{" "}
                thì bấm vào đó
              </p>
              {post.image1 && <img src={post.image1} alt="" />}
              <p style={{ marginTop: "20px" }}>
                <strong>Bước 3: </strong>Kéo xuống tìm trong trang đó sẽ thấy Mã
                xác thực
              </p>
              {post.image2 && <img src={post.image2} alt="" />}
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
                <div className="button-verify-code" onClick={() => verify()}>
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
                        href={post.downloadLink}
                      >
                        <span style={{ color: "#039650" }}>
                          File tài liệu:{" "}
                        </span>
                        {post.downloadLink}
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
        </div>
      </Modal>
    </>
  );
}

export default ContentWrapper;
