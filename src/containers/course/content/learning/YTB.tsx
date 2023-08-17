import React, { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps, YouTubeEvent } from "react-youtube";

type Props = {
  onSaveTime: (time: number) => void;
  show: boolean;
  start: number;
  videoId: string;
};

function YTB({ onSaveTime, show, start = 0, videoId }: Props) {
  const ref = useRef(null);
  const [props, setProps] = useState<YouTubeProps>({});
  useEffect(() => {
    if (show) {
      const timer = setInterval(async () => {
        const temp: any = ref.current;
        if (temp) {
          const currentTime = await temp?.internalPlayer?.getCurrentTime();
          onSaveTime(currentTime || 0);
        }
      }, 5000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      setProps({
        videoId,
        className: "youtube-container",
        opts: {
          width: "100%",
          height: "100%",
          playerVars: {
            start,
          },
        },
      });
    }
  }, [videoId, show]);

  const handleStateChange = (e: YouTubeEvent) => {
    if ([1, 2].includes(e?.data)) {
      onSaveTime(e?.target?.getCurrentTime() || 0);
    }
  };

  return (
    <>
      <YouTube onStateChange={handleStateChange} ref={ref} {...props} />
    </>
  );
}

export default YTB;
