import flvjs from 'flv.js';
import { useEffect } from 'react';

import { Badge } from '@tremor/react';

interface VideoProps {
  id: string;
  data: {
    url: string;
  };
}
function Video(props: VideoProps) {
  useEffect(() => {
    if (flvjs.isSupported()) {
      const videoElement = document.getElementById(`video-${props.id}`);
      const flvPlayer = flvjs.createPlayer({
        type: "flv",
        url: props.data.url,
      });
      flvPlayer.attachMediaElement(videoElement as HTMLMediaElement);
      flvPlayer.load();
      flvPlayer.play();
    }
  }, [props.data.url, props.id]);

  return (
    <span className="flex flex-col space-y-2">
      <Badge color="red">live</Badge>
      <video
        id={`video-${props.id}`}
        controls
        autoPlay
        className="w-full h-full"
      />
    </span>
  );
}

export default Video;
