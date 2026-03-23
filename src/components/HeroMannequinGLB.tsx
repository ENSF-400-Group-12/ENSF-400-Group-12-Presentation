import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

const GLB_PATH = "/models/tailors_mannequin.glb";

/** Draco + Meshopt off: uncompressed GLB; optional decoders can fail on some GPUs. */
useGLTF.preload(GLB_PATH, false, false);

/**
 * World size after normalize (meters-ish). Keeps framing stable with a fixed camera.
 */
/** Slightly larger in scene; paired with pulled-back camera + FOV so the frustum does not clip. */
const TARGET_MAX_EXTENT = 5.05;

/**
 * Blender-style fix: rotate the asset so Y is up; tune if the dress form shows side/back.
 */
const MODEL_ROTATION_FIX: [number, number, number] = [0, Math.PI, 0];

/**
 * Camera on −Z. Framing matches the earlier “good” shot; look-at barely lower than 0.42 for a
 * touch more tripod visible without sitting the whole figure too high in frame.
 */
const CAM_POSITION: [number, number, number] = [0, 1.22, -6.8];
/** Aim slightly lower so the stand / base stays inside the frustum. */
const LOOK_AT: [number, number, number] = [0, 0.12, 0];

function StandingCameraRig() {
  const { camera } = useThree();
  useLayoutEffect(() => {
    const p = camera as THREE.PerspectiveCamera;
    p.near = 0.06;
    p.far = 120;
    p.fov = 48;
    p.position.set(...CAM_POSITION);
    p.updateProjectionMatrix();
  }, [camera]);

  useFrame(() => {
    camera.lookAt(...LOOK_AT);
  });
  return null;
}

function MannequinModel({ spin }: { spin: boolean }) {
  const { scene } = useGLTF(GLB_PATH, false, false);
  const spinRef = useRef<THREE.Group>(null);

  const root = useMemo(() => {
    const m = SkeletonUtils.clone(scene) as THREE.Group;
    m.visible = true;
    m.traverse((o) => {
      o.visible = true;
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh || !mesh.material) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const mat of mats) {
        if (mat && "side" in mat) {
          (mat as THREE.MeshStandardMaterial).side = THREE.DoubleSide;
        }
        if (mat && "needsUpdate" in mat) {
          (mat as THREE.Material).needsUpdate = true;
        }
      }
    });

    m.rotation.set(...MODEL_ROTATION_FIX);
    m.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(m);
    if (!box.isEmpty()) {
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z, 1e-6);
      m.scale.setScalar(TARGET_MAX_EXTENT / maxDim);
      m.updateMatrixWorld(true);
    }

    return m;
  }, [scene]);

  useFrame((_, dt) => {
    const g = spinRef.current;
    if (!g || !spin) return;
    g.rotation.y += dt * 0.068;
  });

  return (
    <group ref={spinRef}>
      <primitive object={root} />
    </group>
  );
}

type Props = { className?: string };

export function HeroMannequinGLB({ className = "" }: Props) {
  const [glOk, setGlOk] = useState(true);
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) setGlOk(false);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setSpin(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  if (!glOk) {
    return (
      <div className={`hero-glb hero-glb--fallback ${className}`.trim()}>
        <p>3D preview needs WebGL.</p>
      </div>
    );
  }

  return (
    <div className={`hero-glb ${className}`.trim()}>
      <Canvas
        camera={{ fov: 48, near: 0.06, far: 120, position: [...CAM_POSITION] }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1;
        }}
      >
        <StandingCameraRig />
        <ambientLight intensity={0.42} />
        <hemisphereLight intensity={0.55} color="#ffffff" groundColor="#8a7a6e" />
        <directionalLight position={[5, 8, 6]} intensity={1.05} color="#ffffff" />
        <directionalLight position={[-4, 2, -3]} intensity={0.38} color="#d4c4b0" />
        <Suspense fallback={null}>
          <Center precise>
            <MannequinModel spin={spin} />
          </Center>
        </Suspense>
      </Canvas>
    </div>
  );
}
