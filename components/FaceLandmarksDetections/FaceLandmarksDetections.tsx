'use client'

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx'
import styles from './FaceLandmarksDetections.module.css'
import { FaceLandmarksDetectionsProps } from './FaceLandmarksDetections.types'
import { useAnimationFrame } from '@/lib/hooks/useAnimationFrame';
import '@tensorflow/tfjs-backend-webgl';
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import { drawFaces } from '@/lib/utils';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as faceMesh from '@mediapipe/face_mesh';
import '@tensorflow-models/face-detection';
import { LABEL_TO_COLOR } from '@/lib/utils';


tfjsWasm.setWasmPaths(
  `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm`);

async function setupDetector() {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detector = await faceLandmarksDetection.createDetector(model, {
    runtime: 'mediapipe',
    solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${faceMesh.VERSION}`,
    maxFaces: 2,
    refineLandmarks: true
  });

  return detector;
}


async function setupVideo() {
  const video = document.getElementById('video') as HTMLVideoElement;
  const stream = await window.navigator.mediaDevices.getUserMedia({ video: true });

  if (!video) {
    return;
  }


  video.srcObject = stream;
  await new Promise<void>((resolve) => {
    video.onloadedmetadata = () => {
      resolve();
    }
  });
  video.play();

  video.width = video.videoWidth;
  video.height = video.videoHeight;

  return video;
}

async function setupCanvas(video: { width: any; height: any; } | undefined) {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;

  if (!canvas || !video) {
    return;
  }
  
  const ctx = canvas.getContext('2d');

  canvas.width = video.width;
  canvas.height = video.height;

  return ctx;
}






const FaceLandmarksDetections = ({
  children,
  className,
}: FaceLandmarksDetectionsProps) => {
  const detectorRef = useRef();
  const videoRef = useRef();
  const [ctx, setCtx] = useState();
  const contours = faceLandmarksDetection.util.getKeypointIndexByContour(faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh);

  useEffect(() => {
    async function initialize() {
      if (!videoRef.current) {
        return;
      }
      videoRef.current = await setupVideo();
      const ctx = await setupCanvas(videoRef.current);
      detectorRef.current = await setupDetector();

      setCtx(ctx);
    }

    initialize();
  }, []);

  useAnimationFrame(async delta => {
    const faces = await detectorRef.current.estimateFaces(videoRef.current);

    ctx.clearRect(0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
    ctx.drawImage(videoRef.current, 0, 0);
    drawFaces(faces, ctx, contours);



  }, !!(detectorRef.current && videoRef.current && ctx))

  return (
    <div
      className={clsx(
        styles.root,
        className
      )}
    >
      <canvas
        style={{
          transform: "scaleX(-1)",
          zIndex: 1,
          borderRadius: "1rem",
          boxShadow: "0 3px 10px rgb(0 0 0)",
          maxWidth: "85vw"
        }}
        id="canvas">
      </canvas>
      <video
        style={{
          visibility: "hidden",
          transform: "scaleX(-1)",
          position: "absolute",
          top: 0,
          left: 0,
          width: 0,
          height: 0
        }}
        id="video"
        playsInline>
      </video>
    </div>
  )

}


export default FaceLandmarksDetections