<template>
    <section class="absolute top-0 left-0 pointer-events-none scr-icon">
        <img :src="images['others-scroll-icon.png']">
    </section>
</template>

<script setup>
const images = inject("preloaded");
</script>

<style scoped>
@keyframes scroll-icon {
    0% {
        transform: translateY(-1.5%);
    }
    100% {
        transform: translateY(1.5%);
    }
}

.scr-icon {
    animation: scroll-icon 0.9s ease-in-out alternate infinite;
}
</style>