<template>
    <section class="relative w-fit h-fit overflow-hidden bg-wall">
        <!-- bg holder -->
        <div>
            <img :src="images['00-cover00.png']" class="max-w-screen max-h-screen object-contain opacity-0">
        </div>
        
        <slot></slot>
    </section>
</template>

<script setup>
const images = inject("preloaded");


</script>

<style scoped>

</style>