<template>
    <div class="v-catalog-item">
        <v-popup
            v-if="isInfoPopupVisible"
            @closePopup="closeInfoPopup"
            rightBtnTitle="Add to cart"
            :popupTitle="product_data.name"
            @rightBtnAction="addToCart"
        >
            <img
                class="v-catalog-item__img"
                :src="require('../../assets/image/' + product_data.image)"
                alt=""
            />
            <div>
                <p class="v-catalog-item_name">{{ product_data.name }}</p>
                <p class="v-catalog-item_price">
                    Price:{{ product_data.price | toFix | formattedPrice }}
                </p>
                <p class="v-catalog-item_category">
                    Category:{{ product_data.category }}
                </p>
            </div>
        </v-popup>
        <img
            class="v-catalog-item__img"
            :src="require('../../assets/image/' + product_data.image)"
            alt=""
        />
        <p class="v-catalog-item_name">{{ product_data.name }}</p>
        <p class="v-catalog-item_price">
            Price:{{ product_data.price | toFix | formattedPrice }}
        </p>
        <button class="v-catalog-item_show_info" @click="showPopupInfo">
            Show info
        </button>
        <button class="v-catalog-item_add_to_cart btn " @click="addToCart">
            Add to cart
        </button>
    </div>
</template>

<script>
import vPopup from "../popup/v-popup";
import toFix from "../../filters/toFix";
import formattedPrice from "../../filters/price-format";

export default {
    name: "v-catalog-item",
    components: {
        vPopup,
    },
    //из родительского массива приходят данные в виде обьекта
    //по дефолту возвращает пумтой  обьект
    props: {
        product_data: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            isInfoPopupVisible: false,
        };
    },
    filters: {
        toFix,
        formattedPrice,
        //чтобы после тысячи был пробел
    },
    methods: {
        //emit передает this.product_data.article и в родителе будет называеться sendArticle
        // sendDataToParent() {
        //     this.$emit("sendArticle", this.product_data.article);
        // },
        addToCart() {
            this.$emit("addToCart", this.product_data);
        },
        closeInfoPopup() {
            this.isInfoPopupVisible = false;
        },
        showPopupInfo() {
            this.isInfoPopupVisible = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 71px 0 #e0e0ff;
    padding: $padding * 2;
    margin-bottom: $margin * 2;

    &__img {
        width: 100px;
        margin-left: 60px;
    }
}
// .v-catalog-item {
//     transition: 1.2s; /* Время эффекта */
// }
// .v-catalog-item:hover {
//     transform: scale(1.1); /* Увеличиваем масштаб */
// }
.v-catalog-item_name {
    margin-left: 88px;
}
.v-catalog-item_price,
.v-catalog-item_category {
    margin-left: 80px;
}
.v-catalog-item_show_info {
    margin-left: 80px;
    margin-bottom: 10px;
}
</style>
