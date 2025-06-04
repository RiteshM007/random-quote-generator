declare module 'use-sound' {
  type PlayFunction = () => void;
  type Options = {
    volume?: number;
    playbackRate?: number;
    interrupt?: boolean;
    soundEnabled?: boolean;
    sprite?: Record<string, [number, number]>;
  };

  export default function useSound(
    url: string,
    options?: Options
  ): [PlayFunction, { sound: any; stop: () => void; pause: () => void }];
} 