<template>
  <table class="table-striped">
    <thead>
      <tr><th>Name</th><th>Address[:Port]</th><th>Status</th><th>Action</th></tr>
    </thead>
    <tbody>
      <tr v-for="con in connections">
        <td>
          {{ con.name }}
        </td>
        <td>
          {{ con.address }}
        </td>
        <td>
          {{ con.status }}
        </td>
        <td>
          <template v-if="!con.busy"> <!-- Actions not applyable when connection is busy -->
            <button class="btn btn-mini btn-negative" v-on:click="delConnection(con)">Delete</button>
          </template>
        </td>
      </tr>
      <tr>
        <td><input v-model="newConnection.name" type="text" placeholder="Client Name"></input></td>
        <td><input v-model="newConnection.address" type="text" placeholder="localhost[:3030]"></input></td>
        <td></td>
        <td><button class="btn btn-mini btn-primary" v-on:click="createConnection(newConnection)">Add</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      newConnection: {},
    }
  },
  computed: {
    ...mapGetters(['connections']),
  },
  methods: {
    ...mapActions(['addConnection','delConnection']),
    createConnection(connection) {
      // TODO: Do some checks
      this.addConnection(connection)
      this.newConnection = {}
    }
  },
  mounted: function() {
    console.log('Connection mounted')
  },
  beforeDestroy: function() {
    console.log('Connection beforeDestroy')
  },
}
</script>
