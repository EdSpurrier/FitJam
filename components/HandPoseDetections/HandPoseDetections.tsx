'use client'

import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import styles from './HandPoseDetections.module.css'
import { HandPoseDetectionsProps } from './HandPoseDetections.types'
import { createDetector, SupportedModels, HandDetector } from "@tensorflow-models/hand-pose-detection";
import '@tensorflow/tfjs-backend-webgl';
import { drawHands } from "../../lib/utils";
import Link from "next/link";
import { useAnimationFrame } from "../../lib/hooks/useAnimationFrame";
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';

tfjsWasm.setWasmPaths(
    `https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm`);



    async function setupDetector() {
      const model = SupportedModels.MediaPipeHands;
      const detector = await createDetector(
          model,
          {
              runtime: "mediapipe",
              maxHands: 2,
              solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands'
          }
      );
  
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
    
    
    



const HandPoseDetections = ({
  children,
  className,
}: HandPoseDetectionsProps) => {


  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  
  
  
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [detector, setDetector] = useState<HandDetector | null>();


  useEffect(() => {
    async function initialize() {
      if (!videoRef.current || !canvasRef.current) {
        return;
      }

      let videoSetup = await setupVideo(videoRef.current) as HTMLVideoElement;
      let ctxSetup = await setupCanvas(canvasRef.current, videoRef.current) as CanvasRenderingContext2D;
      let detectorSetup = await setupDetector() as HandDetector;

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

    const hands = await detector.estimateHands(
      video,
      {
          flipHorizontal: false
      }
  );

    ctx.clearRect(0, 0, video.videoWidth, video.videoHeight);
    ctx.drawImage(video, 0, 0);
    drawHands(hands, ctx);

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


export default HandPoseDetections