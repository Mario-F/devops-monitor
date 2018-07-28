<template>
  <div>

    <!-- Displays table -->
    <header class="toolbar toolbar-header">
      <h1 class="title">Displays</h1>
    </header>
    <table class="table-striped">
      <thead>
        <tr><th>Host</th><th>Name</th><th>Display ID</th><th>Dimensions</th><th>Active</th><th>Playlist</th></tr>
      </thead>
      <tbody>
        <tr v-for="dis in connectionById(idClient).displays">
          <td>
            {{ dis.hostname }}
          </td>
          <td>
            <template v-if="dis.name">{{ dis.name }}</template>
            <template v-else>None</template>
          </td>
          <td>
            {{ dis.id }}
          </td>
          <td>
            {{ dis.size.width }}x{{ dis.size.height }}
          </td>
          <td>
            <template v-if="dis.connected">Yes</template>
            <template v-else>{{ dis.lastConnected | moment("from") }}</template>
          </td>
          <td>
            {{ playlistByDisplay(dis.id) }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Playlist table -->
    <header class="toolbar toolbar-header">
      <h1 class="title">Playlists</h1>
    </header>
    <table class="table-striped">
      <thead>
        <tr><th>Name</th><th>Display (Active)</th><th>Items</th></tr>
      </thead>
      <tbody>
        <tr v-for="ply in connectionById(idClient).playlists">
          <td>
            {{ ply.name }}
          </td>
          <td>
            {{ ply.show }}
          </td>
          <td>
            {{ ply.items.length }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- TEMP: DEBUG -->
    <header class="toolbar toolbar-header">
      <h1 class="title">DEBUG</h1>
    </header>
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
    ...mapGetters(['connectionById']),
    playlistByDisplay: function() {
      return (idDisplay) => {
        let resPly = this.connectionById(this.idClient).playlists.filter(p => p.show == idDisplay)
        if(!resPly || resPly.length == 0) return false
        return resPly.map(p => p.name).join(',')
      }
    },
  },
  mounted: function() {
    console.log(`Client ${this.idClient} mounted`)
  },
  beforeDestroy: function() {
    console.log(`Client ${this.idClient} beforeDestroy`)
  },
}
</script>
