"use client";

import { useRef, useState } from "react";

export default function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop />

      <button
        onClick={toggleMusic}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
          padding: "10px 16px",
          borderRadius: "999px",
          border: "none",
          background: "rgba(0, 0, 0, 0.75)",
          color: "white",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        {playing ? "🔊 Music On" : "🔇 Music Off"}
      </button>
    </>
  );
}
