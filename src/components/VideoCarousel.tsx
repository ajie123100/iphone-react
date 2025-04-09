// 导入必要的依赖
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

// VideoCarousel组件：实现一个带有进度条和控制按钮的视频轮播功能
const VideoCarousel = () => {
  // 创建refs用于存储视频元素和进度条相关的DOM节点
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);

  // 视频状态管理
  const [video, setVideo] = useState({
    isEnd: false, // 当前视频是否结束
    startPlay: false, // 是否开始播放
    videoId: 0, // 当前播放的视频索引
    isLastVideo: false, // 是否是最后一个视频
    isPlaying: false, // 视频是否正在播放
  });
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  // 存储已加载的视频元素
  const [loadedData, setLoadedData] = useState<HTMLVideoElement[]>([]);

  // 使用GSAP实现视频切换动画和自动播放
  useGSAP(() => {
    // 实现视频轮播切换动画
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    // 当视频进入视图时触发播放
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  // 处理视频进度条动画
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // 创建进度条动画
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // 计算视频播放进度
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // 根据屏幕尺寸设置进度条宽度
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // 移动端
                  : window.innerWidth < 1200
                  ? "10vw" // 平板
                  : "4vw", // 桌面端
            });

            // 更新进度条样式
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // 视频结束时重置进度条样式
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      // 第一个视频重新开始动画
      if (videoId == 0) {
        anim.restart();
      }

      // 更新进度条
      const animUpdate = () => {
        const currentVideo = videoRef.current[videoId];
        if (currentVideo) {
          anim.progress(
            currentVideo.currentTime / hightlightsSlides[videoId].videoDuration
          );
        }
      };

      // 根据播放状态添加或移除进度条更新
      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  // 控制视频播放和暂停
  useEffect(() => {
    if (loadedData.length > 3) {
      const currentVideo = videoRef.current[videoId];
      if (currentVideo) {
        if (!isPlaying) {
          currentVideo.pause();
        } else {
          startPlay && currentVideo.play();
        }
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // 处理视频播放状态变化
  const handleProcess = (type: string, i?: number) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({
          ...pre,
          isEnd: true,
          videoId: i !== undefined ? i + 1 : 0,
        }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true, isEnd: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({
          ...pre,
          videoId: 0,
          isLastVideo: false,
          isEnd: false,
        }));
        break;

      case "pause":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;

      default:
        return video;
    }
  };

  // 处理视频加载完成事件
  const handleLoadedMetaData = (
    i: number,
    e: React.SyntheticEvent<HTMLVideoElement>
  ) => {
    setLoadedData((pre) => [...pre, e.currentTarget]);
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  className={`${
                    list.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                  preload="auto"
                  muted
                  ref={(el) => {
                    videoRef.current[i] = el;
                  }}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  onPlay={() =>
                    setVideo((pre) => ({
                      ...pre,
                      isPlaying: true,
                      isEnd: false,
                    }))
                  }
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p
                    key={i}
                    className="md:text-2xl text-xl font-medium text-white"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => {
                videoDivRef.current[i] = el;
              }}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => {
                  videoSpanRef.current[i] = el;
                }}
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
