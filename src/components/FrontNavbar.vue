<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Dairy</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/products" class="nav-link" aria-current="page"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link">購物車</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">登入</router-link>
          </li>
        </ul>
      </div>
      <button type="button" class="btn btn-primary">結帳
        <span class="badge bg-danger">{{ cartData.carts.length }}</span>
      </button>
    </div>
  </nav>
</template>


<script>
import emitter from "../libs/emitter.js"
export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
    }
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        this.cartData = res.data.data;
      });
    },
  },
  mounted() {
    this.getCart();
    emitter.on("get-cart", () => {
      this.getCart()
    })
  }
}
</script>