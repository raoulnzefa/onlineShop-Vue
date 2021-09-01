<template>
    <div class="v-cart-item">
        <img
            class="v-cart-item__img"
            :src="require('../../assets/image/' + cart_item_data.image)"
            alt=""
        />
        <div class="v-cart-item__info">
            <p>{{ cart_item_data.name }}</p>
            <p>{{ cart_item_data.price | toFix | formattedPrice }}</p>
            <p>{{ cart_item_data.article }}</p>
        </div>
        <div class="v-cart-item__quantiti">
            <p>Qty :</p>
            <span>
                <span class="quantiti_btn" @click="decrementItem">-</span>
                {{ cart_item_data.quantiti }}
                <span class="quantiti_btn" @click="incrementItem">+</span>
            </span>
        </div>
        <button @click="deleteFromCart">Delete</button>
    </div>
</template>

<script>
import toFix from "../../filters/toFix";
import formattedPrice from "../../filters/price-format";
export default {
    name: "v-cart-item",
    props: {
        cart_item_data: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    filters: {
        toFix,
        formattedPrice,
    },
    methods: {
        decrementItem() {
            this.$emit("decrement");
        },
        incrementItem() {
            this.$emit("increment");
        },

        deleteFromCart() {
            this.$emit("deleteFromCart");
        },
    },
    mounted() {
        this.$set(this.cart_item_data, "quantiti", 1);
    },
};
</script>

<style lang="scss">
.v-cart-item {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding * 2;
    margin-bottom: $margin * 2;
    &__img {
        max-width: 50px;
    }
    .quantiti_btn {
        cursor: pointer;
    }
}
</style>
