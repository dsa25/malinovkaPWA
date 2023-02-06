<template>
  <div>
    <h1>userPage</h1>
    <div v-if="posts.length">
      <div class="post" v-for="post in posts" :key="post.id">
        <div class="card-title">{{ post.title }}</div>
        <div class="card-body">{{ post.body }}</div>
      </div>
    </div>
    <div v-else>not data jsonplaceholder</div>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    this.loadPost()
  },
  methods: {
    async loadPost() {
      try {
        let url = "https://jsonplaceholder.typicode.com/posts?_limit=11"
        let res = await fetch(url)
        this.posts = await res.json()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.post {
  border: 1px solid red;
  padding: 10px;
  margin: 20px 0;
}
.card-title {
  font-weight: 700;
}
</style>
