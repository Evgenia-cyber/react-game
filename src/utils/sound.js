export const sound = {
  audio: null,
  playSound(path, volume) {
    let audio = new Audio(path);
    audio.volume = volume;
    if (this.audio&&audio.onended) {
      this.audio.pause();
    }
    const promise = audio.play();
    this.audio = audio;
    promise.catch((e) => {});
  },
};
