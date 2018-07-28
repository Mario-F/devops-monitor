<template>
  <div>

    <!-- Displays header / table -->
    <header class="toolbar toolbar-header">
      <h1 class="title">Displays</h1>
    </header>
    <table class="table-striped">
      <thead>
        <tr><th>Host</th><th>Display ID</th><th>Dimensions</th><th>Alive</th></tr>
      </thead>
      <tbody>
        <tr v-for="dis in connectionById(idClient).displays">
          <td>
            {{ dis.hostname }}
          </td>
          <td>
            {{ dis.id }}
          </td>
          <td>
            {{ dis.size.width }}x{{ dis.size.height }}
          </td>
          <td>
            {{ dis.connected }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Playlist header / table -->
    <header class="toolbar toolbar-header">
      <h1 class="title">Playlists</h1>
    </header>

    <!-- TEMP: DEBUG -->
    <div>Client pane: {{ idClient }}</div>
    <div>Connection: {{ connectionById(idClient) }}</div>
    <div>Displays: {{ connectionById(idClient).displays }}</div>
    <div>Playlists: {{ connectionById(idClient).playlists }}</div>
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
