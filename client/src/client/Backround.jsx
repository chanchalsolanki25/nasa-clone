import React from 'react'

function Backround() {
  return (
   <video
          autoPlay
          muted
          loop
          className="fixed top-0 left-0 lg:w-full md:w-[768px] w-[640px] lg:h-full md:h-[600px] h-[350px] object-cover z-[-10]"
        >
          <source
            src="/bg-video.mp4"
            type="video/mp4"
            className="w-full h-full"
          />
          Your browser does not support the video tag.
        </video>
  )
}

export default Backround
