import { createRouter, createWebHistory } from 'vue-router'
import { AboutView, PostListView, PostCreateView, PostDetailView, PostEditView } from '../views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PostList',
      component: PostListView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path: '/posts/:id',
      name: 'PostDetail',
      component: PostDetailView
    },
    {
      path: '/create-post',
      name: 'CreatePost',
      component: PostCreateView
    },
    {
      path: '/posts/edit/:id',
      name: 'EditPost',
      component: PostEditView
    }
  ]
})

export default router
