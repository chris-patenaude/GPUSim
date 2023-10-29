<template>
  <div class="home">
    <h1>Home</h1>
    <CPU />
  </div>
</template>

<script>
import CPU from "@/components/CPU.vue";
export default {
  name: "HomeView",

  components: {
    CPU,
  },
};
</script>
