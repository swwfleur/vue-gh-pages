<template>
  <h2>登入頁面</h2>
  <button type="button" class="btn btn-primary" @click="login">登入</button>
</template>

<script>
export default {
  // Email登入，寫入Cookie、轉址
  methods:{
    login() {
      this.$router.push('/admin')
    }
  }
};
</script>