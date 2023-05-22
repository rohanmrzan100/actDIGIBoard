import React, { useRef } from "react";

const ThumbnailGenerator = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const generateThumbnail = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    video.addEventListener("loadeddata", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // You can now use the thumbnail image data as needed
      const thumbnailUrl = canvas.toDataURL("image/png");
      console.log(thumbnailUrl);
    });

    video.src = videoUrl;
  };

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button onClick={generateThumbnail}>Generate Thumbnail</button>
    </div>
  );
};

export default ThumbnailGenerator;
