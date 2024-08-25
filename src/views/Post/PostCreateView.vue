<template>
  <div class="create-post-container">
    <button class="back-button" @click="goBack"><i class="pi pi-arrow-left"></i> Back</button>
    <h2>Create New Post</h2>
    <form @submit.prevent="createPost" class="create-post-form">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div class="form-group">
        <label for="content">Content:</label>
        <textarea
          id="content"
          v-model="content"
          rows="6"
          required
          autoResize
          class="no-resize"
        ></textarea>
      </div>
      <PrimeButton label="Submit" icon="pi pi-check" type="submit" class="submit-button" />
    </form>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push({ name: 'PostList' })
}
</script>
<script>
import { httpClient } from '@/httpClient/httpClient'

export default {
  name: 'CreatePost',
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    async createPost() {
      try {
        await httpClient.post('/posts', {
          title: this.title,
          content: this.content
        })
        this.$router.push({ name: 'PostList' })
      } catch (error) {
        console.error('Error creating post:', error)
      }
    }
  }
}
</script>

<style scoped>
.create-post-container {
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

.create-post-form {
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
