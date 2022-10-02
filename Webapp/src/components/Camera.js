import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { labelMap } from "../utilities";

function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [detection, setDetection] = useState("Begin");

  // Main function
  useEffect(() => {
    const runCoco = async () => {
      // 3. Load network
      const net = await tf.loadGraphModel(
        "https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json"
      );

      //  Loop and detect hands
      setInterval(() => {
        Detect(net);
      }, 16.7);
    };
    runCoco();
  });

  const Detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [640, 480]);
      const casted = resized.cast("int32");
      const expanded = casted.expandDims(0);
      const obj = await net.executeAsync(expanded);

      const boxes = await obj[1].array();
      const classes = await obj[2].array();
      const scores = await obj[4].array();

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // Update drawing utility
      // drawSomething(obj, ctx)
      requestAnimationFrame(() => {
        let text = classes[0][0]
        let s = scores[0][0]

        if(text && s > 0.95) {
          // Extract variables
          const [y, x, height, width] = boxes[0][0]
          let name = labelMap[text]['name']
          setDetection(name)
          
          // Set styling
          ctx.strokeStyle = labelMap[text]['color']
          ctx.lineWidth = 5
          ctx.fillStyle = 'white'
          ctx.font = '22px Helvetica'       
          
          // DRAW!!
          ctx.beginPath()
          ctx.fillText(name + ' - ' + Math.round(s*100)/100, (1-x)*videoWidth, y*videoHeight-10)
          ctx.rect((1-x)*videoWidth, y*videoHeight, -(width*videoWidth/2), height*videoHeight/1.5);
          ctx.stroke()
        }
      });

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
      img.dispose();
      resized.dispose();
      casted.dispose();
      expanded.dispose();
    }
  };

  return (
    <div className="flex md:flex-col w-full h-screen pt-20 overflow-hidden">
      <div className="relative flex-grow md:flex-grow-0 md:h-1/2 bg-gray-800">
        <Webcam
          mirrored={true}
          ref={webcamRef}
          muted={true}
          className="absolute w-full"
        />
        <canvas ref={canvasRef} className="absolute w-full" />
      </div>

      {/* Display Detection */}
      <div className="flex w-2/5 md:w-full md:h-1/2 bg-gradient-to-br from-purple-300 via-red-300 to-pink-300">
        <div className="m-auto">
          <p className="font-extrabold text-7xl text-center">{detection}</p>
        </div>
      </div>
    </div>
  );
}

export default Camera;
