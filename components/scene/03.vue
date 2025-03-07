<template>
    <GeneralContainer>
        <!-- bg image -->
        <div class="absolute top-0 left-0">
            <img :src="images['03-desk.png']">
        </div>

        <!-- wardrobe for click to open -->
        <div @click="isOpen = true; $emit('soundeffect','cabinet')" class="absolute top-0 left-0 cursor-pointer">
            <img :src="images['03-wardrobe-close.png']">
        </div>

        <div class="absolute top-0 left-0 transition-opacity duration-200" :class="isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none' ">
            <div class="relative w-full h-full">
                <div>
                    <img :src="images['03-wardrobe-open.png']">
                </div>

                <div class="absolute top-0 left-0">
                    <img :src="images['03-clothes.png']">
                </div>

                <!-- clothes -->
                <div v-for="cloth in clothesArray" class="absolute top-0 left-0 transition-opacity duration-200" :class="currentHover == cloth && currentHover != 'none' ? 'opacity-100' : 'opacity-0' ">
                    <img :src="images[`03-${cloth}.png`]">
                </div>

                <!-- div for hover -->
                <div @mouseover="readID" @mouseleave="currentHover = 'none'" id="05" class="w-[14.5%] h-[65%] absolute top-[10%] left-[61%] cursor-grab"></div>

                <div @mouseover="readID" @mouseleave="currentHover = 'none'" id="04" class="w-[14.5%] h-[65%] absolute top-[10%] left-[52%] cursor-grab"></div>

                <div @mouseover="readID" @mouseleave="currentHover = 'none'" id="02" class="w-[14.5%] h-[65%] absolute top-[10%] left-[42%] cursor-grab"></div>

                <div @mouseover="readID" @mouseleave="currentHover = 'none'" id="01" class="w-[10%] h-[25%] absolute top-[10%] left-[36%] cursor-grab"></div>

                <div @mouseover="readID" @mouseleave="currentHover = 'none'" id="03" class="w-[15%] h-[28%] absolute top-[50%] left-[36%] cursor-grab"></div>
            </div>
        </div>

        <!-- fg fade in -->
        <div class="absolute top-0 left-0 w-full h-full bg-wall fade-out pointer-events-none"></div>

        <!-- button -->
        <GeneralButtonRight @click="isButtonClicked = true; $emit('soundeffect','alarm')" class="absolute bottom-[2%] right-[2%] w-[8%]" :class="isOpen == true ? '' : 'hidden' "/>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-wall" :class="isButtonClicked ? 'fade-in' : 'opacity-0 pointer-events-none' " ></div>

        <div class="absolute top-0 left-0">
            <audio ref="audioRef">
            <source src="/sounds/effects/cabinet.mp3" type="audio/mpeg">
            </audio>
        </div>
    </GeneralContainer>
</template>

<script setup>
const images = inject("preloaded");
const isOpen = ref(false)
const currentHover = ref('clothes')
const isButtonClicked = ref(false)

const clothesArray = ['01','02','03','04','05']

function readID(event) {
  currentHover.value = event.target.id
}
</script>

<style scoped>

</style>