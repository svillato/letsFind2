<template>
  <div class="posts">
    <h1>For adding post</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="Title" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="Description" v-model="description"></textarea>
        </div>
        <div>
          <button class="app_post_btn" @click="addPost">Submit</button>
        </div>
      </div>
  </div>
</template>

<script>
import postsService from '@/services/postsService'
export default {
  name: 'NewPost',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    async addPost () {
      await postsService.addPost({
        title: this.title,
        description: this.description
      })
      this.$router.push({name: 'Posts'})
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 400px;
  padding: 10px;
  border: 1px solid #0000;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px
}
.app_post_btn {
  background: #4d7d4d;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  width:520px;
  border: none;
  cursor: pointer;
}
</style>
