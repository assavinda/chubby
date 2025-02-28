<template>
    <section class="relative w-fit h-fit overflow-hidden bg-wall">
        <!-- bg holder -->
        <div v-if="isLoaded">
            <img :src="images['00-cover00.png']" class="max-w-screen max-h-screen object-contain opacity-0">
        </div>

        <div v-if="!isLoaded">
            <img src="/public/images/00/cover00.png" class="max-w-screen max-h-screen object-contain opacity-0">
        </div>
        
        <slot></slot>
    </section>
</template>

<script setup>
const images = inject("preloaded");
const isLoaded = inject("loadstate");

</script>

<style scoped>

</style>