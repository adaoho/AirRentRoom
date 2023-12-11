import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import DetailView from '../views/DetailView.vue'
import RegisterView from '../views/RegisterView.vue'
import BookmarkView from '../views/BookmarkView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: MainView
    },
    {
      path: '/',
      component: MainView,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/bookmark',
          name: 'bookmark',
          component: BookmarkView
        },
        {
          path: '/bookmark/:id',
          name: 'bookmarkView',
          component: DetailView
        }
      ]
    },
    {
      path: '/login',
      name: 'loginView',
      component: LoginView
    },
    {
      path: '/register',
      name: 'registerView',
      component: RegisterView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')

  if (to.name == 'bookmark' && !token) {
    next('/login')
  } else if (to.name == 'bookmark' && !token) {
    next('/register')
  } else if (to.name == 'login' && token) {
    next('/')
  } else {
    next()
  }
})

export default router
