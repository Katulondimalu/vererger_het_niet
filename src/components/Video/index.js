import React from 'react';

const Video = ({ url, onNext }) => {
  return (
    <div
      style={{
        borderRadius: 5,
      }}
    >
      <video
        preload='metadata'
        onClick={(e) => {
          let video = /** @type {HTMLVideoElement} */ (e.currentTarget);
          video.play();
          video.muted = false;
        }}
        controls
        onEnded={(e) => {
          // @ts-ignore
          e.currentTarget.webkitExitFullscreen?.();
          onNext();
        }}
        style={{
          borderRadius: 20,
          width: '100%',
          backgroundColor: 'black',
        }}
        src={`${url}`}
      />
    </div>
  );
};

export default Video;
