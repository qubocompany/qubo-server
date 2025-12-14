import { useState, useEffect, useRef } from 'react';
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

export function useHandTracking() {
    const [gesture, setGesture] = useState('None');
    const [handData, setHandData] = useState({
        position: { x: 0, y: 0, z: 0 },
        velocity: { x: 0, y: 0 },
        size: 0,
        pinchDist: 0.5
    });
    const [isReady, setIsReady] = useState(false);
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);

    // State for smoothing
    const lastPos = useRef({ x: 0.5, y: 0.5 });
    const handPos = useRef({ x: 0.5, y: 0.5 });
    const gestureHistory = useRef([]);

    const gestureRef = useRef('None'); // To avoid stale closures in loop

    useEffect(() => {
        let active = true;
        async function init() {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
            );

            landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
                    delegate: "GPU"
                },
                runningMode: "VIDEO",
                numHands: 1
            });

            // Setup Webcam
            const video = document.createElement('video');
            video.autoplay = true;
            video.playsInline = true;

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 }
            });
            video.srcObject = stream;
            video.onloadeddata = () => {
                if (!active) return;
                video.play();
                videoRef.current = video;
                setIsReady(true);
                loop();
            };
        }

        const loop = () => {
            if (!active) return;
            processFrame();
            requestAnimationFrame(loop);
        }

        init();
        return () => { active = false; };
    }, []);

    const processFrame = () => {
        if (!videoRef.current || !landmarkerRef.current) return;

        const results = landmarkerRef.current.detectForVideo(videoRef.current, performance.now());

        if (results.landmarks && results.landmarks.length > 0) {
            const landmarks = results.landmarks[0];
            const wrist = landmarks[0];
            const middleMCP = landmarks[9];

            // 1. Position smoothing
            const targetX = (wrist.x + middleMCP.x) / 2;
            const targetY = (wrist.y + middleMCP.y) / 2;

            handPos.current.x += (targetX - handPos.current.x) * 0.5;
            handPos.current.y += (targetY - handPos.current.y) * 0.5;

            const vx = handPos.current.x - lastPos.current.x;
            const vy = handPos.current.y - lastPos.current.y;
            lastPos.current = { ...handPos.current };

            // 2. Size calc
            let minX = 1, maxX = 0, minY = 1, maxY = 0;
            for (const lm of landmarks) {
                if (lm.x < minX) minX = lm.x;
                if (lm.x > maxX) maxX = lm.x;
                if (lm.y < minY) minY = lm.y;
                if (lm.y > maxY) maxY = lm.y;
            }
            const size = (maxX - minX) * (maxY - minY);

            // 3. Gesture Detection
            const fingerTips = [8, 12, 16, 20];
            const fingerPIPs = [6, 10, 14, 18];

            // Check individual finger states (Index=0, Middle=1, Ring=2, Pinky=3)
            const isFolded = [false, false, false, false];
            let foldedCount = 0;

            for (let i = 0; i < 4; i++) {
                const dTip = Math.hypot(landmarks[fingerTips[i]].x - wrist.x, landmarks[fingerTips[i]].y - wrist.y);
                const dPip = Math.hypot(landmarks[fingerPIPs[i]].x - wrist.x, landmarks[fingerPIPs[i]].y - wrist.y);
                if (dTip < dPip) {
                    isFolded[i] = true;
                    foldedCount++;
                }
            }

            const thumbTip = landmarks[4];
            const indexTip = landmarks[8];
            const middleTip = landmarks[12]; // Middle Finger Tip

            const pinchDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);
            const snapDist = Math.hypot(thumbTip.x - middleTip.x, thumbTip.y - middleTip.y);

            let rawGesture = 'Open';

            if (snapDist < 0.05) {
                rawGesture = 'Snap'; // Map Middle Finger Pinch to "Snap"
            } else if (pinchDist < 0.05) {
                rawGesture = 'Pinch';
            } else if (!isFolded[0] && isFolded[1] && isFolded[2]) {
                // Index Open, Middle & Ring Closed => Point (more lenient)
                rawGesture = 'Point';
            } else if (foldedCount >= 4) {
                rawGesture = 'Closed';
            } else {
                rawGesture = 'Open';
            }

            // Debounce
            gestureHistory.current.push(rawGesture);
            if (gestureHistory.current.length > 5) gestureHistory.current.shift();
            const counts = {};
            gestureHistory.current.forEach(g => counts[g] = (counts[g] || 0) + 1);
            let stable = gestureRef.current;
            let max = 0;
            for (const k in counts) {
                if (counts[k] > max) { max = counts[k]; stable = k; }
            }

            if (max >= 3 && stable !== gestureRef.current) {
                gestureRef.current = stable;
                setGesture(stable);
            }

            setHandData({
                position: { x: handPos.current.x, y: handPos.current.y, z: middleMCP.z },
                velocity: { x: vx, y: vy },
                size,
                pinchDist
            });

        } else {
            if (gestureRef.current !== 'None') {
                gestureRef.current = 'None';
                setGesture('None');
            }
            setHandData(prev => ({ ...prev, velocity: { x: 0, y: 0 } }));
        }
    };

    return { gesture, handData, isReady, videoRef };
}
