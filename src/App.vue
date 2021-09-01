<template>
    <div class="app">
        <v-main-wrapper />
    </div>
</template>

<script>
import vMainWrapper from "@/components/v-main-wrapper";
export default {
    name: "App",
    components: {
        vMainWrapper,
    },
};
</script>

<style>
.app {
    background-color: #bec8c5;
}
</style>
