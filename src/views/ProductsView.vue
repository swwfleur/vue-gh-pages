<template>
  <div>產品列表</div>
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
      <!-- row決定內層數量 -->
      <!-- 內層不定義寬度 -->
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100">
          <router-link :to="`/product/${product.id}`">
            <img
              :src="product.imageUrl"
              class="card-img-center img-fluid"
              alt="{{ product.title }}"
            />
          </router-link>
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">
              {{ product.description }}
            </p>
          </div>
          <div class="card-footer text-end">
            <button type="button" class="btn btn-danger" @click="addCart(product.id)">加入購物車</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script>
export default {
  data() {
    return {
      products: [],
      isLoading:'',
    };
  },
  methods: {
    addCart(id, qty = 1) {
          const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
          const data = {
            product_id: id,
            qty
          };
          this.isLoading = id;
          this.$http.post(url, { data })
            .then(() => {
              this.getCart();
              this.isLoading = '';
            })
            .catch(err =>
              console.log(err.response))
        },
  },
  mounted() {
    const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
    this.$http
      .get(url)
      .then((res) => {
        this.products = res.data.products;
      })
      .catch((err) => {
        console.dir(err.response);
      });
  },
};
</script>
