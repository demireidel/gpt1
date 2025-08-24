"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { extend } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragment = `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform float u_aspect;
  uniform float u_intensity;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.,0.));
    float c = hash(i + vec2(0.,1.));
    float d = hash(i + vec2(1.,1.));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
  }
  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for (int i=0; i<5; i++){
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = (vUv - 0.5) * vec2(u_aspect, 1.0);
    float r = length(p);
    float t = u_time * 0.15;
    float waves = fbm(p * 5.0 + t*1.5);
    float swirl = sin(6.2831 * r - t*4.0) * 0.5 + 0.5;
    float ring = smoothstep(0.60, 0.48, r) - smoothstep(0.95, 0.80, r);
    float energy = ring * 1.2 + waves * 0.6 + (1.0 - r) * 0.35;
    energy = clamp(energy * u_intensity, 0.0, 1.0);
    vec3 blue = vec3(0.08, 0.46, 1.0);
    vec3 bg   = vec3(0.0);
    vec3 col = mix(bg, blue, energy);
    col = pow(col, vec3(0.9));
    float vign = smoothstep(1.2, 0.2, r);
    col += 0.1 * swirl * vign;
    gl_FragColor = vec4(col, 0.95);
  }
`;

const CherenkovMat = shaderMaterial(
  { u_time: 0, u_aspect: 1, u_intensity: 1 },
  vertex,
  fragment
);
extend({ CherenkovMat });

function Plane({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.ShaderMaterial>(null!);
  useFrame((state, delta) => {
    if (reduced) return;
    ref.current.uniforms.u_time.value += delta;
  });
  const aspect = useMemo(() => (typeof window !== "undefined" ? window.innerWidth / window.innerHeight : 16/9), []);
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <cherenkovMat ref={ref} u_aspect={aspect} u_intensity={reduced ? 0.5 : 1.0} />
    </mesh>
  );
}

export default function CherenkovCanvas() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        orthographic
        camera={{ position: [0,0,1], zoom: 1 }}
      >
        <Plane reduced={!!reduce} />
      </Canvas>
    </div>
  );
}
