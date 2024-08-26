<script setup>
import Button from 'primevue/button'
</script>
<template>
  <div class="container">
    <div class="header">
      <h1>Posts</h1>
      <Button
        class="small-button"
        label="Create Post"
        icon="pi pi-plus"
        @click="redirectToCreatePost"
      />
    </div>
    <div class="post-list">
      <PrimeCard v-for="post in posts" :key="post.id" class="post-card" @click="viewPost(post.id)">
        <template #title>
          <div class="post-header">
            <h2>{{ post.title }}</h2>
            <div class="post-meta">
              <span class="created-by">{{ post.createdBy }}</span>
              <span class="created-at">{{ formatDate(post.createdAt) }}</span>
            </div>
          </div>
        </template>
        <template #content>
          <p>{{ getShortContent(post.content) }}</p>
        </template>
      </PrimeCard>
      <div v-if="posts.length === 0">
        <p>No posts available.</p>
      </div>
      <PrimePaginator
        :rows="postsPerPage"
        :totalRecords="totalCount"
        :pageLinkSize="3"
        :rowsPerPageOptions="[10, 20, 30]"
        @page="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { httpClient } from '@/httpClient/httpClient'
import { differenceInMinutes, differenceInHours, format } from 'date-fns'

export default {
  name: 'PostList',
  data() {
    return {
      posts: [],
      totalCount: 0,
      postsPerPage: 10,
      currentPage: 1
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalCount / this.postsPerPage)
    }
  },
  methods: {
    async fetchPosts() {
      const response = await httpClient.post('/posts/filter', {
        searchTerm: '',
        sortColumn: 'createAt',
        sortOrder: 'desc',
        page: this.currentPage,
        pageSize: this.postsPerPage
      })
      this.posts = response.data.data
      this.totalCount = response.data.totalCount
    },
    onPageChange(event) {
      this.currentPage = event.page + 1
      this.postsPerPage = event.rows
      this.fetchPosts()
    },
    viewPost(postId) {
      this.$router.push({ name: 'PostDetail', params: { id: postId } })
    },
    redirectToCreatePost() {
      this.$router.push({ name: 'CreatePost' })
    },
    getShortContent(content) {
      return content.length > 300 ? content.substring(0, 300) + '...' : content
    },
    formatDate(date) {
      const now = new Date()
      const diffInMinutes = differenceInMinutes(now, new Date(date))
      const diffInHours = differenceInHours(now, new Date(date))

      if (diffInMinutes < 1) {
        return 'Just now'
      } else if (diffInHours < 1) {
        return `${diffInMinutes} minutes ago`
      } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`
      } else {
        return format(new Date(date), 'MMM-d')
      }
    }
  },
  mounted() {
    this.fetchPosts()
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 80vh;
}
.small-button {
  height: 60px;
}

.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
}
.post-card {
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  padding: 1rem;
  position: relative;
  max-width: 1200px;
  width: 700px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  cursor: pointer;
  word-wrap: break-word;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background-color: #f9f9f9;
}

.post-header {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: #777;
}

.created-at {
  margin-left: 450px;
  margin-top: -20px;
}
.created-by {
  margin-top: -20px;
}
.created-at,
.created-by {
  font-size: 0.9rem;
  color: #777;
}

.post-list {
  flex-grow: 0;
  /* overflow: hidden; */
}
</style>
