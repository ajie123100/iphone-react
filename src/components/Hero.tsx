import { useGSAP } from '@gsap/react'
import { useEffect, useState } from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import { gsap } from 'gsap'
import { heroVideo, smallHeroVideo } from '../utils'
import Button from './Button'

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)
  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet)

    return () => {
      window.removeEventListener('reisze', handleVideoSrcSet)
    }
  }, [])
  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 })
    gsap.to('#cta', { opacity: 1, y: -50, delay: 2 })
  }, [])
  return (
    <section className="w-full nav-height text-white">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">
          iPhone 15
        </p>
        <div className="md:w-10/12 w-9/12 max-w-fit">
          <video className="pointer-events-none" autoPlay muted playsInline key={videoSrc}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
        <a href="#highlights">
          <Button
            title="From $199/month or $999"
            containerClass="flex items-center justify-center gap-2 font-normal text-xl"
            leftIcon={<FaShoppingBag />}
          />
        </a>
      </div>
    </section>
  )
}

export default Hero
