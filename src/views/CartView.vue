<template>
  <div class="container">
    <div class="row border p-3 m-1">
      <div class="d-flex justify-content-between p-1">
        <h2>Shopping Cart</h2>
        <div class="col-2">
          <button
            type="button"
            class="btn btn-outline-danger w-100"
            @click="removeAllItem"
            :disabled="cartData.carts.length === 0"
          >
            Delete All
          </button>
        </div>
      </div>

      <template v-if="cartData.carts.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th scope="20">ITEM</th>
              <th scope="20">QTY</th>
              <th scope="20">PRICE</th>
              <th scope="20">TOTAL PRICE</th>
              <th scope="20"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in cartData.carts"
              :key="item.id"
              style="width: 200px"
            >
              <td scope="row">
                <div
                  :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
                  style="
                    height: 100px;
                    background-size: cover;
                    background-position: center;
                  "
                ></div>
              </td>
              <td>
                <select
                  class="form-select"
                  v-model="item.qty"
                  @change="updateCartItem(item)"
                  :disabled="isLoading === item.id"
                >
                  <option
                    :value="num"
                    v-for="num in 20"
                    :key="`${num}+${item.id}`"
                  >
                    {{ num }}
                  </option>
                </select>
              </td>
              <td>£ {{ item.product.price }}</td>
              <td class="text-danger">£ {{ Math.round(item.total) }}</td>
              <td>
                <button
                  type="button"
                  class="btn border"
                  @click="removeCartItem(item.id)"
                >
                  <i class="bi bi-trash"></i>Remove
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="table-active">Total</td>
              <td class="fw-bold fs-5">£{{ Math.round(cartData.total) }}</td>
            </tr>
          </tfoot>
        </table>
      </template>
      <div class="cart-noItem" v-else>
        <h3><i class="bi bi-cart-plus"></i></h3>
        <h3>Your shopping cart is empty</h3>
        <p>Get some fresh and healthy</p>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '../libs/emitter';

export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
      products: [],
      search: "",
      productId: "",
      isLoading: false,
      user: {},
    };
  },
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(url).then((res) => {
        this.cartData = res.data.data;
        emitter.emit("get-cart")
      });
    },
    addCart(id, qty = 1) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const data = {
        product_id: id,
        qty,
      };
      this.isLoading = id;
      this.$http
        .post(url, { data })
        .then(() => {
          this.getCart();
          this.isLoading = "";
          this.$refs.productModal.closeModal();
        })
        .catch((err) => console.log(err.response));
    },
    removeCartItem(id) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.isLoading = id;
      this.$http
        .delete(url)
        .then(() => {
          this.getCart();
          this.isLoading = "";
        })
        .catch((err) => console.log(err.response));
    },
    updateCartItem(item) {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const data = {
        product_id: item.id,
        qty: item.qty,
      };
      this.isLoading = item.id;
      this.$http
        .put(url, { data })
        .then(() => {
          this.getCart();
          this.isLoading = "";
        })
        .catch((err) => console.log(err.response));
    },
    removeAllItem() {
      const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then(() => {
          this.getCart();
        })
        .catch((err) => console.log(err.response));
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>