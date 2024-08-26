import { createRouter, createWebHistory } from 'vue-router'
import { PostListView, PostCreateView, PostDetailView, PostEditView } from '../views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PostList',
      component: PostListView
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
