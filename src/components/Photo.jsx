import { useState } from "react";

// Shows a photo; if the file is missing it falls back to a quiet green panel.
// position (optional) chooses which part stays visible when cropped, e.g. "center 30%".
export default function Photo({ src, alt = "", className = "", position }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`photo ${className}`}>
      {!failed && <img src={src} alt={alt} loading="lazy" style={position ? { objectPosition: position } : undefined} onError={() => setFailed(true)} />}
    </div>
  );
}
