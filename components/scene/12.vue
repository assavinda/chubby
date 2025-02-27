<template>
    <ElementContainer>
        <!-- section room -->
        <section class="absolute top-0 left-0 transition-opacity duration-700" :class="!isSectionMirror ? 'opacity-100' : 'opacity-0 pointer-events-none' ">
            <div>
                <img :src="images['02-bg-room.png']">
            </div>
            <div @click="isSuggestShow = true" class="absolute top-[10%] right-[8%] w-[20%] h-[80%] rotate-[5deg] cursor-pointer" :class="isSuggestShow ? 'pointer-events-none' : '' "></div>
            <div class="absolute top-0 left-0 backdrop-blur-xs transition-opacity duration-500" :class="isSuggestShow ? 'opacity-100' : 'opacity-0 pointer-events-none' ">
                <div>
                    <img :src="images['12-postit-00-01.png']">
                </div>
                <div class="absolute top-[68.7%] left-[53.7%] w-[6.8%]">
                    <ElementButton @click="isButtonClicked = true">
                        <img :src="images['12-postit-00-01-btn.png']">
                    </ElementButton>
                </div>
            </div>
        </section>

        <!-- fg fade out -->
        <div @animationend="isSectionMirror = true" class="absolute top-0 left-0 w-full h-full bg-wall" :class="isButtonClicked ? 'fade-in' : 'opacity-0 pointer-events-none' " ></div>

        <!-- section mirror -->
        <section class="absolute top-0 left-0 transition-opacity duration-700" :class="isSectionMirror ? 'opacity-100' : 'opacity-0 pointer-events-none' ">
            <div>
                <img :src="images['12-bg-postit.png']">
            </div>

            <div class="absolute top-0 left-0">
                <img :src="images['12-mirror.png']">
            </div>

            <div @transitionend="isAnimating = false" class="absolute top-0 left-0 transition-opacity duration-500" :class="currentPostit >= 5 ? 'opacity-100' : 'opacity-0' ">
                <img :src="images['12-paper4-paper5-mirror05.png']">
            </div>

            <div @transitionend="isAnimating = false" class="absolute top-0 left-0 transition-opacity duration-500" :class="currentPostit >= 6 ? 'opacity-100' : 'opacity-0' ">
                <img :src="images['12-paper6-paper6mirror-mirror06.png']">
            </div>

            <div v-for="postit in postitArray" class="absolute top-0 left-0">
                <div>
                    <img :src="images[`12-paper${postit}-new1_00028.png`]">
                </div>
            </div>

            <div class="absolute top-0 left-0">
                <img :src="images[postitCurrentFrame]">
            </div>

            <div class="absolute top-0 left-0 transition-opacity duration-300" :class="currentPostit == 5 ? 'opacity-100' : 'opacity-0' ">
                <div>
                    <img :src="images['12-paper4-paper5-new1_00028.png']">
                </div>
            </div>

            <div @click="isGoingToNext = true" class="absolute top-[47%] left-[24.5%] rotate-[6deg] w-[25%] h-[43%] cursor-pointer rounded-[5%]" :class="!isAnimating && currentPostit >= 7 ? '' : 'hidden' "></div>

            <div @click="animatePostit" class="absolute top-[10%] right-[18.7%] w-[20%] h-[80%] rotate-[5deg] cursor-pointer" :class="isAnimating || currentPostit >= 7 ? 'pointer-events-none' : '' "></div>
        </section>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-wall" :class="isGoingToNext ? 'fade-in' : 'opacity-0 pointer-events-none' " ></div>


    </ElementContainer>
</template>

<script setup>
const images = inject("preloaded")
const isSectionMirror = ref(false)
const isSuggestShow = ref(false)
const isButtonClicked = ref(false)
const isAnimating = ref(false)
const isGoingToNext = ref(false)

const postitArray = ref([])

// animate posit

const postitCurrentFrame = ref('others-blank.png')
let postitInterval
const currentPostit = ref(0)

function animatePostit() {
    console.log('animate postit')
    isAnimating.value = true
    let postitcount = 1
    currentPostit.value++
    if (currentPostit.value == 5) {
        postitArray.value.push('4-paper5')
    }
    else {
        postitInterval = setInterval(() => {
            if (postitcount <= 9) {
                postitCurrentFrame.value = `12-paper${currentPostit.value}-new1_0000${postitcount}.png`
                postitcount++
            }
            else if (postitcount > 9 && postitcount <= 99) {
                if (postitcount >= 28) {
                    clearInterval(postitInterval)
                    isAnimating.value = false
                    postitcount = 1
                    postitArray.value.push(currentPostit.value)
                }
                else {
                    postitCurrentFrame.value = `12-paper${currentPostit.value}-new1_000${postitcount}.png`
                    postitcount++
                }
            }
        }, 15)
    }
    
}

let emit = defineEmits()

onMounted(() => {
    emit('togglescroll')
})

</script>

<style scoped>

</style>