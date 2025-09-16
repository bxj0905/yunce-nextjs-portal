'use client';

import React from 'react';
import Image from 'next/image';

interface CardMediaProps {
  videoSrc?: string;
  imageSrc: string;
  alt: string;
}

/**
 * 客户端媒体组件：若视频可访问则渲染视频（正方形），否则回退到图片（16:9）。
 */
const CardMedia: React.FC<CardMediaProps> = ({ videoSrc, imageSrc, alt }) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const withBaseOnceStrict = (p: string): string => {
    if (p.startsWith('http')) return p;
    if (basePath && p.startsWith(basePath + '/')) return p;
    return `${basePath}${p.startsWith('/') ? '' : '/'}${p}`;
  };
  const withBaseOnceOptional = (p?: string): string | undefined => {
    if (!p) return undefined;
    return withBaseOnceStrict(p);
  };
  const finalImage = withBaseOnceStrict(imageSrc);
  const finalVideo = withBaseOnceOptional(videoSrc);
  const [useVideo, setUseVideo] = React.useState(!!finalVideo);

  React.useEffect(() => {
    setUseVideo(!!finalVideo);
  }, [finalVideo]);

  if (useVideo) {
    return (
      <video
        className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        src={finalVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setUseVideo(false)}
      />
    );
  }

  return (
    <Image
      src={finalImage}
      alt={alt}
      width={1280}
      height={720}
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
    />
  );
};

export default CardMedia;


