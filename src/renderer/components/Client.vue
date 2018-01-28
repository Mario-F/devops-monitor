<template>
  <div>
    <div>Client pane: {{ idClient }}</div>
    <div>Connection: {{ connectionById(idClient) }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      idClient: this.$route.params.id,
    }
  },
  computed: {
    ...mapGetters(['connectionById'])
  },
  mounted: function() {
    console.log(`Client ${this.idClient} mounted`)
  },
  beforeDestroy: function() {
    console.log(`Client ${this.idClient} beforeDestroy`)
  },
}
</script>
