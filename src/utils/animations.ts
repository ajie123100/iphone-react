import gsap from "gsap";
import * as THREE from "three";

import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

type animateWithGsapFn = (
  target: string,
  animationProps: gsap.TweenVars,
  scrollProps?: ScrollTrigger.Vars
) => void;

export const animateWithGsap: animateWithGsapFn = (
  target,
  animationProps,
  scrollProps
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollProps,
    },
  });
};

type animateWithGsapTimelineFn = (
  timeline: gsap.core.Timeline,
  rotationRef: { current: THREE.Group },
  rotationState: number,
  firstTarget: string,
  secondTarget: string,
  animationProps: gsap.TweenVars
) => void;

export const animateWithGsapTimeline: animateWithGsapTimelineFn = (
  timeline,
  rotationRef,
  rotationState,
  firstTarget,
  secondTarget,
  animationProps
) => {
  timeline.to(rotationRef.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );

  timeline.to(
    secondTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );
};
