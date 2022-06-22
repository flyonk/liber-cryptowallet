<template>
  <div class="spinner">
    <div class="bounce animation"></div>
    <div class="bounce animation"></div>
    <div class="bounce bounce3"></div>
  </div>
</template>

<style lang="scss" scoped>
.spinner {
  margin: 0;
  width: 70px;
  text-align: center;
}

.bounce {
  width: 18px;
  height: 18px;
  background-color: #fff;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.animation {
  animation-delay: -0.32s;

  &:last-child {
    animation-delay: -0.16s;
  }
}

@keyframes sk-bouncedelay {
  0%,
  80%,
  100% {
    transform: scale(0);
    transform: scale(0);
  }

  40% {
    transform: scale(1);
    transform: scale(1);
  }
}
</style>
