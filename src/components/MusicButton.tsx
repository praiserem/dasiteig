import { useRef, useState } from "react";

export default function MusicButton() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  function toggleMusic() {
    if (!audio.current) return;

    if (playing) {
      audio.current.pause();
      setPlaying(false);
    } else {
      audio.current.play();
      setPlaying(true);
    }
  }

  return (
    <>
      <audio ref={audio} src="/music.mp3" loop />

      <button onClick={toggleMusic}>
        {playing ? "🔊 Music On" : "🎵 Play Music"}
      </button>
    </>
  );
}
