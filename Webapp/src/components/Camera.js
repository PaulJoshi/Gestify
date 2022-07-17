import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import useConsentStore from "./Store";
import "../App.css";
import Data from "../data/data.json";
import { drawRect, labelMap } from "../utilities";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../data/init-firebase";

let count = 0;

function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [detection, setDetection] = useState("Begin");
  const consent = useConsentStore((state) => state.consent);

  const takeScreenshot = (sign) => {
    let x = Math.floor(Math.random() * Data[0].frequency);
    if (
      x === Math.floor(Data[0].frequency / 2) &&
      count < Data[0]["max-screenshots"]
    ) {
      // Take Screenshot
      let screenshot = webcamRef.current.getScreenshot();
      console.log("Screenshot : " + sign);

      // Send Screenshot & detection to firebase
      const modeldataCollection = collection(db, "modeldata");
      addDoc(modeldataCollection, { screenshot: screenshot, text: sign })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      count++;
    }
  };

  // Main function
  useEffect(() => {
    const runCoco = async () => {
      // 3. Load network
      // https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json
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

      for (let i = 0; i <= boxes[0].length; i++) {
        if (boxes[0][i] && classes[0][i] && scores[0][i] > Data[0].accuracy) {
          // Update state with detection
          let sign = labelMap[classes[0][i]]["name"]
          setDetection(sign);

          // Take Screenshot
          if (consent) takeScreenshot(sign);
        }
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // Update drawing utility
      // drawSomething(obj, ctx)
      requestAnimationFrame(() => {
        drawRect(
          boxes[0],
          classes[0],
          scores[0],
          Data[0].accuracy,
          videoWidth,
          videoHeight,
          ctx
        );
      });

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
    }
  };

  return (
    <div className="flex md:flex-col w-full h-screen pt-20 overflow-hidden">
      {/* <div className="">Loading</div> */}
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
