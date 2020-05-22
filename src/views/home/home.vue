<template>
  <div class="home">
    <!-- <MyHeader></MyHeader> -->
    <!-- <WorkBench></WorkBench> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.home{
  height: 100%;
}
</style>