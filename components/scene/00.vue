<template>
    <GeneralContainer>
        <!-- bg images -->
        <div class="absolute top-0 left-0">
            <img :src="images['00-cover01.png']">
        </div>

        <div class="absolute top-0 left-0">
            <img :src="images['00-cover00.png']">
        </div>

        <div class="absolute top-0 left-0">
            <img :src="images['00-cover02.png']">
        </div>

        <div class="absolute top-[3%] left-0">
            <img :src="images[`others-${Soundstate}.png`]">
        </div>

        <div @click="toggleSound" class="w-[5%] h-[15%] absolute top-0 right-[8%]"></div>

        <!-- start btn -->
        <GeneralButton @click="isSuggestShow = true" class="w-[10%] absolute top-[87%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img :src="images['00-btn-start.png']">
        </GeneralButton>

        <!-- suggestion section -->
        <div class="absolute top-0 left-0 backdrop-blur-sm transition-opacity duration-400" :class="isSuggestShow ? 'opacity-100' : 'opacity-0 pointer-events-none' ">
            <!-- suggestion bg -->
            <div>
                <img :src="images['00-suggest01.png']">
            </div>

            <!-- suggestion btn (emit here) -->
            <GeneralButton @click="isGameStart = true" class="w-[10%] absolute top-[70%] left-[50.5%] transform -translate-x-1/2 -translate-y-1/2">
                <img :src="images['00-btn-suggest.png']">
            </GeneralButton>

        </div>

        <!-- fg fade out -->
        <div @animationend="$emit('start'); $emit('themesong','heavy')" class="absolute top-0 left-0 w-full h-full bg-wall" :class="isGameStart ? 'fade-in' : 'opacity-0 pointer-events-none' " ></div>

        <!-- fg fade in -->
        <div class="absolute top-0 left-0 w-full h-full bg-wall fade-out pointer-events-none"></div>
    </GeneralContainer>
</template>

<script setup>
const images = inject("preloaded");
const isSuggestShow = ref(false)
const isGameStart =  ref(false)
const Soundstate = ref('soundoff')

let emit = defineEmits()

function toggleSound() {
    if (Soundstate.value == 'soundoff') {
        emit('themesong','main')
        Soundstate.value = 'soundon'
    }
    else {
        emit('pausethemesong')
        Soundstate.value = 'soundoff'
    }
}

</script>

<style scoped>

</style>