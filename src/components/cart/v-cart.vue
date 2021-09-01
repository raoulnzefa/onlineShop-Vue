<template>
    <div class="v-cart">
        <router-link :to="{ name: 'catalog' }">
            <div class="v-catalog__link_to_cart">Back to Catalog</div>
        </router-link>
        <h1 class="v-cart__h1">Cart</h1>
        <p v-if="!cart_data.length">there are no products in the cart...</p>
        <v-cart-item
            v-for="(item, index) in cart_data"
            :key="item.article"
            :cart_item_data="item"
            @deleteFromCart="deleteFromCart(index)"
            @increment="increment(index)"
            @decrement="decrement(index)"
        />
        <div class="v-cart__total">
            <p class="total__name">Total:</p>
            <p>{{ cartTotalCost | toFix | formattedPrice }}</p>
        </div>
    </div>
</template>

<script>
import vCartItem from "./v-cart-item";
import { mapActions } from "vuex";
import toFix from "../../filters/toFix";
import formattedPrice from "../../filters/price-format";
export default {
    name: "v-cart",
    components: {
        vCartItem,
    },
    props: {
        cart_data: {
            type: [],
            default() {
                return [];
            },
        },
    },
    filters: {
        toFix,
        formattedPrice,
        //чтобы после тысячи был пробел
    },
    methods: {
        ...mapActions([
            "DELETE_FROM_CART",
            "INCREMENT_CART_ITEM",
            "DECREMENT_CART_ITEM",
        ]),
        deleteFromCart(index) {
            this.DELETE_FROM_CART(index);
        },
        increment(index) {
            this.INCREMENT_CART_ITEM(index);
        },
        decrement(index) {
            this.DECREMENT_CART_ITEM(index);
        },
    },
    computed: {
        cartTotalCost() {
            let result = [];
            //если есть в корзине продукты, выполни код
            if (this.cart_data.length) {
                for (let item of this.cart_data) {
                    result.push(item.price * item.quantiti);
                }
                result = result.reduce(function(sum, el) {
                    return sum + el;
                });
                return result;
            } else {
                return 0;
            }
        },
    },
};
</script>

<style lang="scss">
.v-cart {
    margin-bottom: 100px;
    &__h1 {
        text-align: center;
    }
    &__total {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        padding: $padding * 2 $padding * 3;
        display: flex;
        justify-content: center;
        background-color: $green-bg;
        color: white;
        font-size: 20px;
    }
    .total__name {
        margin-right: $margin * 2;
    }
}
</style>
