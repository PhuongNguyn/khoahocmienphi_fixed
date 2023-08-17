import { validateLessonCode } from "@/api/course";
import { getGoogleDriveFileId } from "@/util";
import { Button, Input, Modal, message } from "antd";
import React, { useState } from "react";

type Props = {
  chosen: any;
};

function CodeDownloadVideo({ chosen }: Props) {
  const [modalIntroduceCode, setModalIntroduceCode] = useState(false)
  const [lessonCode, setLessonCode] = useState("")

  return (
    <>
    <div
      className="download-video-wrapper d-flex justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
        <iframe allowFullScreen width={'100%'} height={'100%'} src={`https://drive.google.com/file/d/${getGoogleDriveFileId(chosen?.video)}/preview`}></iframe>
    </div>
    </>
  );
}

export default CodeDownloadVideo;
