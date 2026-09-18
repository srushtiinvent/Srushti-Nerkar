import { useEffect, useMemo, useState } from 'react';

type PixelImageProps = {
  src: string;
  alt?: string;
  customGrid?: { rows: number; cols: number };
  grayscaleAnimation?: boolean;
  className?: string;
};

export function PixelImage({
  src,
  alt = '',
  customGrid = { rows: 8, cols: 8 },
  grayscaleAnimation = false,
  className = '',
}: PixelImageProps) {
  const [visible, setVisible] = useState(false);
  const [showColor, setShowColor] = useState(false);
  const tiles = useMemo(() => Array.from({ length: customGrid.rows * customGrid.cols }, (_, index) => {
    const row = Math.floor(index / customGrid.cols);
    const col = index % customGrid.cols;
    const x1 = col * (100 / customGrid.cols);
    const y1 = row * (100 / customGrid.rows);
    const x2 = (col + 1) * (100 / customGrid.cols);
    const y2 = (row + 1) * (100 / customGrid.rows);

    return {
      clipPath: `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`,
      delay: (index * 83 + (index % customGrid.cols) * 37) % 680,
    };
  }), [customGrid.cols, customGrid.rows]);

  useEffect(() => {
    if (!visible) return;
    const timeout = window.setTimeout(() => setShowColor(true), 1450);
    const replay = window.setInterval(() => {
      setShowColor(false);
      setVisible(false);
      window.setTimeout(() => setVisible(true), 40);
    }, 7600);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(replay);
    };
  }, [visible]);

  return (
    <div className={`pixel-image ${visible ? 'is-visible' : ''} ${className}`}>
      <div className="pixel-image-grid" aria-hidden="true">
        {tiles.map((tile) => (
          <div
            key={tile.clipPath}
            className="pixel-image-piece"
            style={{
              clipPath: tile.clipPath,
              animationDelay: `${tile.delay}ms`,
            }}
          >
            <img
              src={src}
              alt=""
              className={`pixel-image-tile ${grayscaleAnimation && !showColor ? 'is-grayscale' : ''}`}
              onLoad={() => setVisible(true)}
              draggable={false}
            />
          </div>
        ))}
      </div>
      <span className="sr-only">{alt}</span>
    </div>
  );
}