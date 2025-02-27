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

            <div class="absolute top-0 left-0">
                {{ postitCurrentFrame }}
                <img :src="images[postitCurrentFrame]">
            </div>

            <div class="absolute top-[10%] right-[18.7%] w-[20%] h-[80%] rotate-[5deg] cursor-pointer" @click="animatePostit"></div>
        </section>

    </ElementContainer>
</template>

<script setup>
const images = inject("preloaded");
const isSectionMirror = ref(false)
const isSuggestShow = ref(false)
const isButtonClicked = ref(false)

// animate posit

const postitCurrentFrame = ref('others-blank.png')
let postitInterval
const currentPostit = ref(1)

function animatePostit() {
    console.log('animate postit')
    let postitcount = 1;
    postitInterval = setInterval(() => {
        if (postitcount <= 9) {
            postitCurrentFrame.value = `12-paper${currentPostit.value}-new1_0000${postitcount}.png`;
            postitcount++;
        }
        else if (postitcount > 9 && postitcount <= 99) {
            if (postitcount >= 28) {
                clearInterval(postitInterval);
                postitcount = 1;
                currentPostit.value += 1;
                console.log('next' + currentPostit.value)
            }
            else {
                postitCurrentFrame.value = `12-paper${currentPostit.value}-new1_000${postitcount}.png`;
                postitcount++;
            }
        }
        else if (postitcount > 99) {
            postitCurrentFrame.value = `12-paper${currentPostit.value}-new1_00${postitcount}.png`;
            postitcount++;
        }
    }, 30);
}

</script>

<style scoped>

</style>