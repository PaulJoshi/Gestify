// Import dependencies
import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "../App.css";
// 2. Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { drawRect, labelMap } from "../utilities";

function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [detection, setDetection] = useState();

  // Main function
  useEffect(() => {
    const runCoco = async () => {
      // 3. Load network
      // e.g. const net = await cocossd.load();
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
  }, []);

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

      // 4. Make Detections
      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [640, 480]);
      const casted = resized.cast("int32");
      const expanded = casted.expandDims(0);
      const obj = await net.executeAsync(expanded);
      //console.log(obj);

      const boxes = await obj[1].array();
      const classes = await obj[2].array();
      const scores = await obj[4].array();

      // Update state with detection
      for(let i=0; i<=boxes.length; i++){
        if(boxes[0][i] && classes[0][i] && scores[0][i]>0.8)
          //console.log(classes[0][i]);
          setDetection(labelMap[classes[0][i]]["name"]);
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. Update drawing utility
      // drawSomething(obj, ctx)
      requestAnimationFrame(() => {
        drawRect(
          boxes[0],
          classes[0],
          scores[0],
          0.8,
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

  //useEffect(() => {
  //  runCoco()
  //}, []);

  return (
    <div className="h-screen pt-40 overflow-hidden">
      {/* <div className="">Loading</div> */}
      <div>
        <header className="App-header">
          <Webcam
            ref={webcamRef}
            muted={true}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 8,
              width: 640,
              height: 480,
            }}
          />
        </header>
      </div>

      {/* Display Detection */}
      <p>{detection}</p>
    </div>
  );
}

export default Camera;
