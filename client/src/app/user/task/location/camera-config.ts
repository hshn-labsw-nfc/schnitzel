export class CameraConfig {
  constructor(public front: boolean,
              public back: boolean) {
  }

  static frontConstraints: MediaStreamConstraints = {
    audio: false,
    video: {
      facingMode: {
        exact: 'user'
      }
    }
  };

  static backConstraints: MediaStreamConstraints = {
    audio: false,
    video: {
      facingMode: {
        exact: 'environment'
      }
    }
  };
}
