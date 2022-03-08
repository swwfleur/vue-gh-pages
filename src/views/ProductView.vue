<template>
  <div>單一產品頁面</div>
  <img :src="product.imageUrl" alt="" width="200">
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <h5>圖片輪播測試</h5>
  <div class="carousel-inner">
    <div class="carousel-item" v-for="(pic,key) in product.imagesUrl" :key="key+'1'">
      <img :src="pic[key]" class="d-block w-100" alt="">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</template>

<script>
export default {
  data() {
    return {
      product:[],
    }
  },
  mounted() {
    const { id } =this.$route.params
    const url =`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`;
    this.$http.get(url)
    .then((res) =>{
      this.product = res.data.product;
    })
    .catch((err) =>{
      console.dir(err.response);
    })
  },
};
</script>