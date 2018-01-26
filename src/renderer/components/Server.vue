<template>
  <div>This is my Server!</div>
</template>

<script>
  export default {
    mounted: function() {
      console.log('Server mounted')
    },
    beforeDestroy: function() {
      console.log('Server beforeDestroy')
    },
  }
</script>
