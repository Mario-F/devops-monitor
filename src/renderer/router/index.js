import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// Components
import HomeComponent            from '../components/Home'
import ClientComponent            from '../components/Client'
import ConnectionComponent      from '../components/Connection'
import ServerComponent          from '../components/Server'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent,
    },
    {
      path: '/client/:id',
      name: 'client',
      component: ClientComponent,
      props: {
        id: true,
      },
    },
    {
      path: '/connection',
      name: 'connection',
      component: ConnectionComponent,
    },
    {
      path: '/server',
      name: 'server',
      component: ServerComponent,
    },
  ],
})
