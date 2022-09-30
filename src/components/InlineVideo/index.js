import React from 'react';

const InlineVideo = ({ src, height = undefined, width = undefined }) => {
  return (
    <div
      style={{
        borderRadius: 5,
      }}
    >
      <video
        width={width}
        height={height}
        preload='metadata'
        onClick={(e) => {
          //let video = /** @type {HTMLVideoElement} */ (e.currentTarget);
          // video.muted = !video.muted;
          // if (video.paused) {
          //   video.play();
          // }
          // @ts-ignore
          // video.webkitEnterFullScreen?.();
          // video.requestFullscreen?.();
        }}
        onPause={(e) => {
          // let video = /** @type {HTMLVideoElement} */ (e.currentTarget);
          // video.muted = true;
          // video.play();
        }}
        // muted={true}
        playsInline={true}
        // autoPlay
        controls
        // loop
        style={{
          borderRadius: 20,
          width: '100%',
          backgroundColor: 'black',
        }}
        src={`${src}#t=0.1`}
      />
    </div>
  );
};

export default InlineVideo;
