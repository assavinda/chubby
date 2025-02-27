<template>
    <ElementContainer>
        <!-- section room -->
        <section class="absolute top-0 left-0" :class="!isSectionMirror ? '' : 'hidden' ">
            <div>
                <img :src="images['02-bg-room.png']">
            </div>
            <div @click="isSuggestShow = true" class="absolute top-[10%] right-[8%] w-[20%] h-[80%] rotate-[5deg] cursor-pointer border-2" :class="isSuggestShow ? 'pointer-events-none' : '' "></div>
            <div class="absolute top-0 left-0 backdrop-blur-xs transition-opacity duration-500" :class="isSuggestShow ? 'opacity-100' : 'opacity-0 pointer-events-none' ">
                <img :src="images['12-postit-00-01.png']">
            </div>
        </section>

        <!-- section mirror -->
        <section class="absolute top-0 left-0" :class="isSectionMirror ? '' : 'hidden' ">

        </section>

    </ElementContainer>
</template>

<script setup>
const images = inject("preloaded");
const isSectionMirror = ref(false)
const isSuggestShow = ref(false)

</script>

<style scoped>

</style>