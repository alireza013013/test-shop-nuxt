<template>
  <div class="loader-container">
    <img
      width="48"
      src="img/loading.png"
      class="loader"
    >
    <div class="bg-loading"></div>
  </div>
</template>

<script>
export default {
  name: 'LoadingProgress'
}
</script>

<style scoped>
.loader-container{
  position: relative;
  width: 48px;
  height: 48px;
}
.loader{
  position: absolute;
  z-index: 2;
  animation: lds-ring 1.2s linear infinite;
}
.bg-loading{
  position: absolute;
  z-index: 1;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 6px solid rgba(122, 44, 190, 0.25);;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
