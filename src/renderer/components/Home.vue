<template>
  <div>
    This is HOME <span class="icon icon-chat"></span>
  </div>
</template>

<script>
  export default {
    mounted: function() {
      console.log('Home mounted')
    },
    beforeDestroy: function() {
      console.log('Home beforeDestroy')
    },
  }
</script>
