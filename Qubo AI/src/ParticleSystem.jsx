import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSystem = ({ handData, gesture }) => {
    // 1. Optimized Particle Count for 60FPS
    const count = 8000;
    const mesh = useRef();

    // -- Shader (GPU Optimized) --
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uSize: { value: 0.8 },
    }), []);

    const vertexShader = `
    uniform float uTime;
    uniform float uSize;
    attribute vec3 color;
    attribute float size;
    attribute float randomness;
    varying vec3 vColor;
    varying float vAlpha;

    // Fast Simplex Noise (Low Quality but Fast)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) { 
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i); 
        vec4 p = permute( permute( permute( 
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
        vColor = color;
        // GPU Turbulence: Much faster than CPU-side Math.sin updates
        float noiseVal = snoise(vec3(position.x * 0.1 + uTime * 0.1, position.y * 0.1, position.z * 0.1));
        vec3 displacement = vec3(
            sin(uTime * 2.0 + position.y) * 0.1,
            cos(uTime * 1.5 + position.x) * 0.1,
            sin(uTime * 1.0 + position.z) * 0.1
        ) * randomness;
        
        vec3 newPos = position + displacement;
        vec4 mvPosition = modelViewMatrix * vec4(newPos, 1.0);
        
        float pulsatingSize = size * (0.8 + sin(uTime * 5.0 + randomness * 100.0) * 0.4);
        gl_PointSize = pulsatingSize * uSize * (350.0 / -mvPosition.z);
        vAlpha = 0.5 + 0.5 * sin(uTime * 2.0 + randomness * 50.0);
        gl_Position = projectionMatrix * mvPosition;
    }
    `;

    const fragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
        vec2 pc = gl_PointCoord - 0.5;
        float d = length(pc);
        if (d > 0.5) discard;
        float glow = 1.0 - (d * 2.0);
        glow = pow(glow, 1.5); 
        gl_FragColor = vec4(vColor, glow * vAlpha);
    }
    `;

    // -- Buffers & Physics State --
    const physics = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        const target = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const randomness = new Float32Array(count);

        // Init - Start as Sphere
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 4 + (Math.random() - 0.5) * 0.5;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            vel[i * 3] = 0;
            vel[i * 3 + 1] = 0;
            vel[i * 3 + 2] = 0;

            target[i * 3] = x;
            target[i * 3 + 1] = y;
            target[i * 3 + 2] = z;
        }
        for (let i = 0; i < count; i++) {
            sizes[i] = Math.random();
            randomness[i] = Math.random();
        }
        // Init color palette 0
        const c1 = new THREE.Color('#00f3ff');
        const c2 = new THREE.Color('#ff00ff');
        for (let i = 0; i < count; i++) {
            const mix = Math.random();
            colors[i * 3] = c1.r * (1 - mix) + c2.r * mix;
            colors[i * 3 + 1] = c1.g * (1 - mix) + c2.g * mix;
            colors[i * 3 + 2] = c1.b * (1 - mix) + c2.b * mix;
        }

        return { pos, vel, target, colors, sizes, randomness };
    }, []);

    // -- Shape Generators --
    const templates = useMemo(() => {
        const t = {};
        const createBuffer = (fn) => {
            const arr = new Float32Array(count * 3);
            fn(arr);
            return arr;
        };

        t.sphere = createBuffer((arr) => {
            for (let i = 0; i < count; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                const r = 4 + (Math.random() - 0.5) * 0.5;
                arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                arr[i * 3 + 2] = r * Math.cos(phi);
            }
        });

        t.saturn = createBuffer((arr) => {
            const ringCount = Math.floor(count * 0.6);
            for (let i = 0; i < count; i++) {
                if (i < count - ringCount) { // Planet
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos((Math.random() * 2) - 1);
                    const r = 2.0;
                    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
                    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                    arr[i * 3 + 2] = r * Math.cos(phi);
                } else { // Ring
                    const theta = Math.random() * Math.PI * 2;
                    const r = 3.5 + Math.random() * 2.5;
                    const x = r * Math.cos(theta);
                    const y = (Math.random() - 0.5) * 0.1;
                    const z = r * Math.sin(theta);
                    // Tilt
                    arr[i * 3] = x * Math.cos(0.4) - y * Math.sin(0.4);
                    arr[i * 3 + 1] = x * Math.sin(0.4) + y * Math.cos(0.4);
                    arr[i * 3 + 2] = z;
                }
            }
        });

        t.star = createBuffer((arr) => {
            for (let i = 0; i < count; i++) {
                const arm = Math.floor(Math.random() * 5);
                const angle = (arm / 5) * Math.PI * 2 - (Math.PI / 2);
                const ti = Math.random();
                const w = (1.0 - ti) * 1.5;
                const r = ti * 6.0;
                const x = r * Math.cos(angle) + (Math.random() - 0.5) * w;
                const y = r * Math.sin(angle) + (Math.random() - 0.5) * w;
                const z = (Math.random() - 0.5) * w;
                arr[i * 3] = x; arr[i * 3 + 1] = y; arr[i * 3 + 2] = z;
            }
        });

        t.car = createBuffer((arr) => {
            for (let i = 0; i < count; i++) {
                const s = Math.random();
                if (s < 0.6) { // Body
                    arr[i * 3] = (Math.random() - 0.5) * 8;
                    arr[i * 3 + 1] = (Math.random() - 0.5) * 2;
                    arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
                } else if (s < 0.82) { // Cabin
                    arr[i * 3] = (Math.random() - 0.5) * 4;
                    arr[i * 3 + 1] = 1.5 + (Math.random() - 0.5) * 2;
                    arr[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
                } else { // Wheels
                    const wx = Math.random() > 0.5 ? 2.5 : -2.5;
                    const wz = Math.random() > 0.5 ? 2.0 : -2.0;
                    const th = Math.random() * Math.PI * 2;
                    const r = Math.sqrt(Math.random());
                    arr[i * 3] = wx; arr[i * 3 + 1] = -1.5 + r * Math.sin(th); arr[i * 3 + 2] = wz + r * Math.cos(th);
                }
            }
        });

        t.galaxy = createBuffer((arr) => {
            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                const radius = Math.random() * Math.random() * 8 + 2;
                const spinAngle = radius * 1.5;
                const branchAngle = (i % 3) * ((Math.PI * 2) / 3);

                const x = Math.cos(branchAngle + spinAngle) * radius;
                const y = (Math.random() - 0.5) * (10 / radius);
                const z = Math.sin(branchAngle + spinAngle) * radius;

                arr[i3] = x + (Math.random() - 0.5) * 0.5;
                arr[i3 + 1] = y + (Math.random() - 0.5) * 0.2;
                arr[i3 + 2] = z + (Math.random() - 0.5) * 0.5;
            }
        });

        t.flower = createBuffer((arr) => {
            for (let i = 0; i < count; i++) {
                const theta = Math.random() * Math.PI * 2;
                const r = (Math.cos(5 * theta) * 0.5 + 0.5) * 5 + 1;
                const x = r * Math.cos(theta);
                const y = r * Math.sin(theta);
                const z = Math.sin(r * 2.0) * 2.0;
                arr[i * 3] = x + (Math.random() - 0.5) * 0.5;
                arr[i * 3 + 1] = y + (Math.random() - 0.5) * 0.5;
                arr[i * 3 + 2] = z;
            }
        });

        t.headset = createBuffer((arr) => {
            const bandCount = Math.floor(count * 0.4);
            const cupCount = Math.floor((count - bandCount) / 2);
            for (let i = 0; i < count; i++) {
                if (i < bandCount) {
                    const theta = (Math.random() * Math.PI);
                    const r = 4.0;
                    arr[i * 3] = r * Math.cos(theta);
                    arr[i * 3 + 1] = r * Math.sin(theta);
                    arr[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
                } else {
                    const side = i < (bandCount + cupCount) ? 1 : -1;
                    const cx = side * 4.0, cy = 0, cz = 0;
                    const theta = Math.random() * Math.PI * 2;
                    const phi = Math.acos((Math.random() * 2) - 1);
                    const r = 1.5;
                    arr[i * 3] = cx + r * Math.sin(phi) * Math.cos(theta) * 0.5;
                    arr[i * 3 + 1] = cy + r * Math.sin(phi) * Math.sin(theta);
                    arr[i * 3 + 2] = cz + r * Math.cos(phi);
                }
            }
        });

        t.heart = createBuffer((arr) => {
            for (let i = 0; i < count; i++) {
                let t_val = Math.random() * Math.PI * 2;
                const r = 0.25;
                const x = 16 * Math.pow(Math.sin(t_val), 3);
                const y = 13 * Math.cos(t_val) - 5 * Math.cos(2 * t_val) - 2 * Math.cos(3 * t_val) - Math.cos(4 * t_val);
                const z = (Math.random() - 0.5) * 3;
                const scale = 1.0 - Math.random() * 0.2;
                arr[i * 3] = x * r * scale;
                arr[i * 3 + 1] = y * r * scale;
                arr[i * 3 + 2] = z * scale;
            }
        });

        t.dna = createBuffer((arr) => {
            for (let i = 0; i < count; i++) {
                const t_val = (i / count) * Math.PI * 10;
                const r = 2;
                const strand = i % 2 === 0 ? 1 : -1;
                const x = Math.cos(t_val + strand * Math.PI) * r;
                const z = Math.sin(t_val + strand * Math.PI) * r;
                const y = (i / count) * 16 - 8;
                arr[i * 3] = x + (Math.random() - 0.5) * 0.5;
                arr[i * 3 + 1] = y;
                arr[i * 3 + 2] = z + (Math.random() - 0.5) * 0.5;
            }
        });

        return t;
    }, []);

    // -- Logic State --
    const currentShape = useRef('sphere');
    const systemScale = useRef(1.0);
    const colorIndex = useRef(0);
    const colorPalettes = [
        ['#00f3ff', '#ff00ff'], // Neon Cyber
        ['#ff4d4d', '#f9cb28'], // Sunset Fire
        ['#7928ca', '#ff0080'], // Vaporwave
        ['#00c6ff', '#0072ff'], // Deep Ocean
        ['#f0f2f0', '#000c40'], // Space Mist
        ['#11998e', '#38ef7d'], // Toxic Green
    ];

    const setShape = (name) => {
        if (templates[name]) {
            currentShape.current = name;
            const t = templates[name];
            for (let i = 0; i < count * 3; i++) physics.target[i] = t[i];
        }
    };

    const cycleColor = () => {
        colorIndex.current = (colorIndex.current + 1) % colorPalettes.length;
        const [c1h, c2h] = colorPalettes[colorIndex.current];
        const c1 = new THREE.Color(c1h);
        const c2 = new THREE.Color(c2h);
        for (let i = 0; i < count; i++) {
            const mix = Math.random();
            physics.colors[i * 3] = c1.r * (1 - mix) + c2.r * mix;
            physics.colors[i * 3 + 1] = c1.g * (1 - mix) + c2.g * mix;
            physics.colors[i * 3 + 2] = c1.b * (1 - mix) + c2.b * mix;
        }
        mesh.current.geometry.attributes.color.needsUpdate = true;
    }

    // Gestures
    const lastGesture = useRef(null); // Start null to force initial update
    const lastPinch = useRef(0);

    useEffect(() => {
        const now = Date.now();
        if ((gesture === 'Pinch' || gesture === 'Snap') && now - lastPinch.current > 300) {
            cycleColor();
            lastPinch.current = now;
        }

        if (gesture !== lastGesture.current) {
            if (gesture === 'Open') {
                setShape('galaxy');
                // Explosion Impulse
                for (let i = 0; i < count * 3; i += 3) {
                    const x = physics.pos[i];
                    const y = physics.pos[i + 1];
                    const z = physics.pos[i + 2];
                    const len = Math.sqrt(x * x + y * y + z * z) + 0.01;
                    // Push out
                    physics.vel[i] += (x / len) * 2.5;
                    physics.vel[i + 1] += (y / len) * 2.5;
                    physics.vel[i + 2] += (z / len) * 2.5;
                }
            } else if (gesture === 'Closed') {
                setShape('sphere');
                // Implosion Impulse
                for (let i = 0; i < count * 3; i += 3) {
                    const x = physics.pos[i];
                    const y = physics.pos[i + 1];
                    const z = physics.pos[i + 2];
                    const len = Math.sqrt(x * x + y * y + z * z) + 0.01;
                    // Pull in
                    physics.vel[i] -= (x / len) * 2.0;
                    physics.vel[i + 1] -= (y / len) * 2.0;
                    physics.vel[i + 2] -= (z / len) * 2.0;
                }
            } else {
                // None / Idle - Default to Sphere gently
                setShape('sphere');
            }
            lastGesture.current = gesture;
        }
    }, [gesture]);


    // -- Animation Loop (Optimized for 60FPS) --
    useFrame((state, delta) => {
        if (!mesh.current) return;

        // JS Logic update
        mesh.current.material.uniforms.uTime.value = state.clock.elapsedTime;
        mesh.current.rotation.y += delta * 0.05;

        // Scale
        const handSize = handData.size || 0;
        let targetScale = 1.0;
        if (handSize > 0) targetScale = 0.5 + (handSize * 8.0);
        systemScale.current += (targetScale - systemScale.current) * 0.1;
        mesh.current.scale.setScalar(systemScale.current);

        // Physics Params
        let attraction = 0.05;
        let targetPointScale = 1.0;

        if (gesture === 'Closed') {
            mesh.current.material.uniforms.uSize.value = 0.6;
            attraction = 0.2;
            targetPointScale = 0.5;
        } else if (gesture === 'Open') {
            mesh.current.material.uniforms.uSize.value = 1.5;
            attraction = 0.012; // Very loose
            targetPointScale = 2.0;
        } else {
            mesh.current.material.uniforms.uSize.value = 0.8;
            targetPointScale = 1.0;
        }

        // Loop - Optimized
        const { pos, vel, target } = physics;
        const hx = (handData.position.x - 0.5) * 25;
        const hy = -(handData.position.y - 0.5) * 15;
        const localHx = hx / systemScale.current;
        const localHy = hy / systemScale.current;

        const followHand = (gesture === 'Open');
        const count3 = count * 3;

        for (let idx = 0; idx < count3; idx += 3) {
            const px = pos[idx];
            const py = pos[idx + 1];
            const pz = pos[idx + 2];

            const tx = target[idx] * targetPointScale;
            const ty = target[idx + 1] * targetPointScale;
            const tz = target[idx + 2] * targetPointScale;

            // 1. Attraction (Cheap)
            vel[idx] += (tx - px) * attraction;
            vel[idx + 1] += (ty - py) * attraction;
            vel[idx + 2] += (tz - pz) * attraction;

            // 2. Friction
            vel[idx] *= 0.92;
            vel[idx + 1] *= 0.92;
            vel[idx + 2] *= 0.92;

            // 3. Hand Interaction
            if (followHand) {
                const dx = px - localHx;
                const dy = py - localHy;
                // Global Gravity Pool
                vel[idx] -= dx * 0.015;
                vel[idx + 1] -= dy * 0.015;

                // Simple squared distance check for close-range turbulence
                const distSq = dx * dx + dy * dy;
                if (distSq < 25) {
                    vel[idx] += (Math.random() - 0.5) * 0.6;
                    vel[idx + 1] += (Math.random() - 0.5) * 0.6;
                    vel[idx + 2] += (Math.random() - 0.5) * 0.6;
                }
            }

            pos[idx] += vel[idx];
            pos[idx + 1] += vel[idx + 1];
            pos[idx + 2] += vel[idx + 2];
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={physics.pos} itemSize={3} />
                <bufferAttribute attach="attributes-color" count={count} array={physics.colors} itemSize={3} />
                <bufferAttribute attach="attributes-size" count={count} array={physics.sizes} itemSize={1} />
                <bufferAttribute attach="attributes-randomness" count={count} array={physics.randomness} itemSize={1} />
            </bufferGeometry>
            <shaderMaterial
                depthWrite={false}
                transparent={true}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export default ParticleSystem;
