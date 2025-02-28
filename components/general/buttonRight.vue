<template>
    <button class="cursor-pointer transition-transform duration-200">
        <img :src="images['others-button-R.png']">
    </button>
</template>

<script setup>
const images = inject("preloaded");
</script>

<style scoped>
button {
    transform: scale(1);
}
button:hover {
    transform: scale(1.2);
}
</style>