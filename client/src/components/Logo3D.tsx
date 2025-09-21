import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Float, Sparkles } from "@react-three/drei";

import * as THREE from "three";

function EnvelopeMesh(props: any) {
  const ref = useRef<THREE.Group>(null!);

  // slow rotation animation
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <group ref={ref} {...props} dispose={null}>
      {/* Back body */}
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[1.6, 0.9, 0.08]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.3} roughness={0.2} />
      </mesh>

      {/* Envelope flap */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.45, 0.02]}>
        <planeGeometry args={[1.6, 1.0]} />
        <meshStandardMaterial color="#0369a1" metalness={0.25} roughness={0.25} />
      </mesh>

      {/* Diagonal crease */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.28, 0.041]}>
        <planeGeometry args={[1.6, 0.2]} />
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.1}
          roughness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Highlight stripe */}
      <mesh position={[0, 0.46, 0.06]}>
        <boxGeometry args={[1.4, 0.06, 0.01]} />
        <meshStandardMaterial color={"#7dd3fc"} metalness={0.6} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function Logo3D({ size = 160 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "inline-block",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 40 }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        {/* lights */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {/* floating + sparkles */}
        <Float rotationIntensity={0.4} floatIntensity={0.8} speed={1}>
          <EnvelopeMesh />
        </Float>
        <Sparkles count={20} scale={1.6} position={[0, 0.2, 0]} size={3} speed={0.2} />

        {/* orbit controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.7}
        />

        {/* text label */}
        <Html center position={[0, -0.9, 0]}>
          <div
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#0f172a",
              fontWeight: 700,
            }}
          >
            NextMailz
          </div>
        </Html>
      </Canvas>
    </div>
  );
}
