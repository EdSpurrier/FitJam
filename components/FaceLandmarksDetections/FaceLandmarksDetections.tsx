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
import { FaceDetector } from '@tensorflow-models/face-detection';


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


async function setupVideo(video: HTMLVideoElement | undefined) {
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

async function setupCanvas(canvas: HTMLCanvasElement | undefined, video: { width: any; height: any; } | undefined) {

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

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  
  const contours = faceLandmarksDetection.util.getKeypointIndexByContour(faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh);
  
  
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [detector, setDetector] = useState<faceLandmarksDetection.FaceLandmarksDetector | null>();


  useEffect(() => {
    async function initialize() {
      if (!videoRef.current || !canvasRef.current) {
        return;
      }

      let videoSetup = await setupVideo(videoRef.current) as HTMLVideoElement;
      let ctxSetup = await setupCanvas(canvasRef.current, videoRef.current) as CanvasRenderingContext2D;
      let detectorSetup = await setupDetector() as faceLandmarksDetection.FaceLandmarksDetector;

      setVideo(videoSetup);
      setDetector(detectorSetup);
      setCtx(ctxSetup);
    }

    initialize();
  }, []);

  useAnimationFrame(async () => {
    if (!detector || !video || !ctx) {
      return;
    }

    const faces = await detector.estimateFaces(video);

    ctx.clearRect(0, 0, video.videoWidth, video.videoHeight);
    ctx.drawImage(video, 0, 0);
    drawFaces(faces, ctx, contours);

  }, !!(detector && video && ctx))

  return (
    <div
      className={clsx(
        styles.root,
        className
      )}
    >
      <canvas
        ref={canvasRef}
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
        ref={videoRef}
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