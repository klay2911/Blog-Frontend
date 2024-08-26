<script setup>
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import { useRouter } from 'vue-router'
const router = useRouter()

const goBack = () => {
  router.push({ name: 'PostList' })
}
</script>

<template>
  <div v-if="isLoading">
    <p>Loading...</p>
  </div>
  <div v-else-if="post" :style="PostStyle" class="post">
    <div class="post-header">
      <button class="back-button" @click="goBack"><i class="pi pi-arrow-left"></i> Back</button>
      <h2>{{ post.title }}</h2>
      <div class="menu-button">
        <Button
          type="button"
          icon="pi pi-ellipsis-v"
          @click.stop="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
      </div>
    </div>
    <div class="post-meta">
      <p class="post-author">{{ post.createdBy }}</p>
      <p class="post-date">{{ formatDate(post.createdAt) }}</p>
    </div>
    <div class="post-content">
      <p>{{ post.content }}</p>
    </div>
    <div class="comment-section">
      <div class="comment-box">
        <textarea
          v-model="newComment"
          rows="4"
          cols="75"
          required
          autoResize
          class="no-resize"
          placeholder="Write a comment..."
        ></textarea>
        <Button class="send-button" @click="postComment" :disabled="newComment.trim() === ''">
          <i class="pi pi-send"></i>
        </Button>
      </div>
    </div>
    <div v-for="comment in sortedComments" :key="comment.id" class="comment">
      <div class="comment-meta">
        <p class="comment-author">{{ comment.createdBy || 'Anonymous' }}</p>
        <p class="comment-date">{{ formatDate(comment.createdAt) }}</p>
      </div>
      <p>{{ comment.content }}</p>
    </div>
  </div>
</template>

<script>
import { httpClient } from '@/httpClient/httpClient'
import { differenceInMinutes, differenceInHours, format } from 'date-fns'

export default {
  name: 'PostDetail',
  components: {
    Button,
    Menu
  },
  data() {
    return {
      post: null,
      newComment: '',
      isLoading: false,
      dropdownVisible: null,
      showCommentBox: false,
      newComment: '',
      displayConfirmation: false,
      items: [
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          command: () => {
            this.editPost(this.post.id)
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-fw pi-trash',
          command: () => {
            this.deletePost(this.post.id)
          }
        }
      ]
    }
  },
  computed: {
    sortedComments() {
      return this.post
        ? this.post.comments.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : []
    },
    PostStyle() {
      const baseMargin = 200
      const contentLength = this.post.content.length
      const dynamicMargin = baseMargin + contentLength / 5
      return { marginTop: `${dynamicMargin}px` }
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event)
    },
    async fetchPost() {
      this.isLoading = true
      try {
        const postId = this.$route.params.id
        const response = await httpClient.get(`/posts/${postId}`)
        this.post = response.data
      } catch (error) {
        this.post = null
      } finally {
        this.isLoading = false
      }
    },
    editPost(postId) {
      this.$router.push({ name: 'EditPost', params: { id: postId } })
    },
    async deletePost(postId) {
      try {
        await httpClient.delete(`/posts/${postId}`)
        this.$router.push({ name: 'PostList' })
      } catch (error) {
        console.error('Error deleting post:', error)
      }
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
    },
    async postComment() {
      try {
        await httpClient.post('/comment', {
          content: this.newComment,
          postId: this.post.id
        })
        this.newComment = ''
        await this.fetchPost()
        this.$nextTick(() => {
          const container = this.$el.querySelector('.comment-section')
          container.scrollTop = container.scrollHeight
        })
      } catch (error) {
        console.error('Error posting comment:', error)
      }
    },
    async deletePost(postId) {
      this.displayConfirmation = true
      this.postToDelete = postId
    },
    async deletePost(postId) {
      const confirmed = window.confirm('Are you sure you want to delete this post?')
      if (confirmed) {
        try {
          await httpClient.delete(`/posts/${postId}`)
          this.$router.push({ name: 'PostList' })
          window.alert('Post deleted successfully')
        } catch (error) {
          console.error('Error deleting post:', error)
        }
      }
    }
  },
  mounted() {
    this.fetchPost()
  }
}
</script>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  word-wrap: break-word;
  min-height: 100vh;
  overflow: auto;
  margin-top: 1000px;
}
/* .post-detail-container {
  position: sticky;
  top: 100px;
  overflow-y: auto;
  height: 100%;
} */
.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.post-meta {
  display: flex;
  justify-content: space-between;
}
.comment {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}
.comment-section {
  margin-top: 10px;
  max-height: 30vh;
  overflow-y: auto;
}
.comment-meta {
  display: flex;
  justify-content: space-between;
}
.comment-box {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ccc;
  border-radius: 25px;
  box-sizing: border-box;
}
.send-button {
  margin-left: 10px;
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
.post-author,
.post-date {
  font-size: 0.8em;
  font-style: italic;
  color: gray;
  margin-top: -10px;
}
.post-content {
  max-height: 50vh;
  overflow-y: auto;
}
</style>
