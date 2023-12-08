import React from "react";
import AmbientPlayer from "react-ambient-player";

const AmbientImage = () => {
  return (
    <AmbientPlayer
      videoProps={{
        width: 640,
        height: 360,
      }}
      sources={[
        {
          src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
          type: "video/webm",
        },
        {
          src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
          type: "video/mp4",
        },
      ]}
    />
  );
};

export default AmbientImage;