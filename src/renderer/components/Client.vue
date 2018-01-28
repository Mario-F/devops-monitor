<template>
  <div>Client pane: {{ $route.params.id }}</div>
</template>

<script>
export default {
  data() {
    return {
      idClient: this.$route.params.id,
    }
  },
  mounted: function() {
    console.log(`Client ${this.idClient} mounted`)
  },
  beforeDestroy: function() {
    console.log(`Client ${this.idClient} beforeDestroy`)
  },
}
</script>
