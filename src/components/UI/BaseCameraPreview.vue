<template>
  <div
    id="camera-block"
    class="camera-block"
  />
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

const props = defineProps({
  position: {
    type: String,
    default: 'rear',
    validator: (value: string) => ['rear', 'front'].includes(value),
  }
});

const isBackCamera = ref(false);

const start =  async () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });

    stream.getTracks().forEach(track => {
      track.stop();
    });

    const video = document.getElementById('video');
    const parent = document.getElementById('camera-block');

    if (!video) {
      const videoElement = document.createElement('video');
      videoElement.id = 'video';

      videoElement.setAttribute('class', 'video');

      if (props.position !== 'rear') {
        videoElement.setAttribute("style", "-webkit-transform: scaleX(-1); transform: scaleX(-1);");
      }

      const userAgent = navigator.userAgent.toLowerCase();
      const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');

      if (isSafari) {
        videoElement.setAttribute('autoplay', 'true');
        videoElement.setAttribute('muted', 'true');
        videoElement.setAttribute('playsinline', 'true');
      }

      parent?.appendChild(videoElement);

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // eslint-disable-next-line no-undef
        const constraints: MediaStreamConstraints = {
          video: true,
        };

        if (props.position === 'rear') {
          constraints.video = {
            facingMode: 'environment'
          }

          isBackCamera.value = true;
        } else {
          isBackCamera.value = false;
        }

        (await navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
          videoElement.srcObject = stream;
          videoElement.play();

          resolve({});
        }, (err) => {
          reject(err);
        }));
        
      }
    } else {
      reject({ message: 'Camera already in use' })
    }
    } catch (e) {
      reject(e);
    }
  })
}

onBeforeMount(() => {
  start();
})
</script>

<style lang="scss">
.camera-block {
  max-width: 90%;
  position: relative;

  .video {
    top: 0;
    left: 0;
    position: absolute !important;
    max-width: inherit !important;
    max-height: inherit !important;
    z-index: inherit !important;
  }
}
</style>