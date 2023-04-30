import {
    useState,
    useRef,
    Suspense,
    MutableRefObject,
    Dispatch,
    SetStateAction,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { BufferGeometry, Material, Points as PointThree } from 'three';

const Stars = (props: Object) => {
    const ref: MutableRefObject<PointThree<
        BufferGeometry,
        Material | Material[]
    > | null> = useRef(null);
    const [sphere, setSphere]: [
        Float32Array,
        Dispatch<SetStateAction<Float32Array>>
    ] = useState(() =>
        random.inSphere(new Float32Array(10000), { radius: 1.2 })
    );

    useFrame((state, delta) => {
        if (ref.current !== null) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 50;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled
                {...props}
            >
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const StarsCanvas = () => {
    return (
        <div className="w-full h-auto absolute inset-0 z-[-1]">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <Stars />
                </Suspense>

                <Preload all />
            </Canvas>
        </div>
    );
};

export default StarsCanvas;
