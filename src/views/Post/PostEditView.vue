<script setup>
import PrimeButton from 'primevue/button'
import Textarea from 'primevue/textarea'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push({ name: 'PostDetail', params: { id: router.currentRoute.value.params.id } })
}
</script>

<template>
  <div class="edit-post-container">
    <button class="back-button" @click="goBack"><i class="pi pi-arrow-left"></i> Back</button>
    <h2>Edit Post</h2>
    <form @submit.prevent="updatePost" class="edit-post-form">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div class="form-group">
        <label for="content">Content:</label>
        <Textarea
          id="content"
          v-model="content"
          rows="6"
          required
          autoResize
          class="no-resize"
        ></Textarea>
      </div>
      <PrimeButton label="Update" icon="pi pi-check" type="submit" class="submit-button" />
    </form>
  </div>
</template>

<script>
import { httpClient } from '@/httpClient/httpClient'

export default {
  name: 'EditPost',
  data() {
    return {
      title: '',
      content: '',
      postId: null
    }
  },
  methods: {
    async fetchPost() {
      try {
        const response = await httpClient.get(`/posts/${this.postId}`)
        const post = response.data
        this.title = post.title
        this.content = post.content
      } catch (error) {
        console.error('Error fetching post:', error)
      }
    },
    async updatePost() {
      try {
        await httpClient.put(`/posts/${this.postId}`, {
          title: this.title,
          content: this.content
        })
        this.$router.push({ name: 'PostDetail' })
      } catch (error) {
        console.error('Error updating post:', error)
      }
    }
  },
  mounted() {
    this.postId = this.$route.params.id
    this.fetchPost()
  }
}
</script>

<style scoped>
.edit-post-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.edit-post-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
  height: 150px;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: #42b983;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #2c3e50;
}
.no-resize {
  resize: none;
}
.back-button {
  position: absolute;
  top: 120px;
  left: 40px;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  background: none;
  border: none;
  color: #42b983;
  cursor: pointer;
}
</style>
