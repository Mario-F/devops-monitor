<template>
  <div>

    <!-- Tab overview -->
    <div class="tab-group">
      <div class="tab-item" v-bind:class="{ active: tabActive == 'displays' }" v-on:click="tabActive = 'displays'">
        Displays
      </div>
      <div class="tab-item" v-bind:class="{ active: tabActive == 'playlists' }" v-on:click="tabActive = 'playlists'">
        Playlists
      </div>
    </div>

    <!-- Displays table -->
    <template v-if="tabActive == 'displays'">
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
    </template>

    <!-- Playlist table -->
    <template v-if="tabActive == 'playlists'">
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
    </template>

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
      tabActive: 'displays',
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
