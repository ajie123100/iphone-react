import { PerspectiveCamera, View } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import clsx from "clsx";
import React, { Suspense } from "react";
import * as THREE from "three";
import Loader from "./Loader";
import IPhone from "./IPhone";
import Lights from "./Lights";

interface ModelViewProps {
  index: number;
  groupRef: React.RefObject<THREE.Group>;
  gsapType: string;
  controlRef: React.RefObject<any>;
  setRotationState: (rotation: number) => void;
  item: {
    id: number;
    title: string;
    color: string[];
    img: string;
  };
  size: string;
}

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}: ModelViewProps) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={clsx(
        " w-full h-full absolute",
        index === 2 ? "right-[-100%]" : ""
      )}
    >
      {/* 环境光 ambientLight */}
      <ambientLight intensity={0.3} />
      {/* 电光源 */}
      <Lights />
      {/* 透视摄像机 PerspectiveCamera */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      {/* 轨道控制器 OrbitControls */}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => {
          if (controlRef?.current) {
            // getAzimuthalAngle() 获取轨道控制器的方位角
            setRotationState(controlRef.current.getAzimuthalAngle());
          }
        }}
      />
      <group
        ref={groupRef}
        name={`${index === 1} ? 'small' : 'large`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
