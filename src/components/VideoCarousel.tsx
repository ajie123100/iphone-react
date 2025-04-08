import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
gsap.registerPlugin(ScrollTrigger)
import { useEffect, useRef, useState } from 'react'

import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils'

const VideoCarousel = () => {
  const videoRef = useRef<[HTMLVideoElement] | []>([])
  const videoSpanRef = useRef<[HTMLSpanElement] | []>([])
  const videoDivRef = useRef<[HTMLSpanElement] | []>([])

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  ref={(el) => {
                    if (el) {
                      videoRef.current[i] = el
                    }
                  }}
                  playsInline
                  className={`${list.id === 2 && 'translate-x-44'} pointer-events-none`}
                  preload="auto"
                  muted
                  //   onEnded={() =>
                  //     i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last')
                  //   }
                  //   onPlay={() => setVideo((pre) => ({ ...pre, isPlaying: true }))}
                  //   onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl font-medium">
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
                if (el) {
                  videoDivRef.current[i] = el
                }
              }}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => {
                  if (el) {
                    videoSpanRef.current[i] = el
                  }
                }}
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          {/* <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={
              isLastVideo
                ? () => handleProcess('video-reset')
                : !isPlaying
                ? () => handleProcess('play')
                : () => handleProcess('pause')
            }
          /> */}
        </button>
      </div>
    </>
  )
}

export default VideoCarousel
