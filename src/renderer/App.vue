<template>
  <div class="window">

    <div class="window-content">
      <div class="pane-group">

        <!-- Sidebar / Navigation -->
        <div class="pane-sm sidebar">
          <nav class="nav-group">

            <h5 class="nav-group-title">Clients</h5>
            <router-link tag="span" :to="{ name: 'home' }" exact-active-class="active" class="nav-group-item">
              <span class="icon icon-home"></span>
              Home
            </router-link>

            <!-- Server connections -->
            <template v-for="con in connectionsEstablished">
              <router-link :to="{ name: 'client', params: { id: con._id } }" exact-active-class="active" class="nav-group-item">
                <span class="icon icon-download"></span>
                {{ con.name }}
              </router-link>
            </template>

            <!-- Settings -->
            <h5 class="nav-group-title">Settings</h5>
            <router-link :to="{ name: 'connection' }" exact-active-class="active" class="nav-group-item">
              <span class="icon icon-globe"></span>
              Connections
            </router-link>
            <router-link :to="{ name: 'server' }" exact-active-class="active" class="nav-group-item">
              <span class="icon icon-download"></span>
              Server (local)
            </router-link>

          </nav>
        </div>

        <!-- Main View -->
        <div class="pane">
          <router-view></router-view>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      states: null,
      displays: null,
    }
  },
  computed: {
    ...mapGetters(['connectionsEstablished']),
  }
}
</script>
