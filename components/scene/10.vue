<template>
    <GeneralContainer>
        <!-- hand -->
        <section class="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div class="relative w-full h-full">
                <div class="absolute top-[0%] left-0 z-[1] transition-all duration-2000" :class="isHandShow ? 'translate-y-[0%]' : 'translate-y-[70%]' ">
                    <img :src="images['10-handshadow-01.png']"> 
                </div>
                <div @transitionend="$emit('pauseeffect')" class="absolute top-[4.5%] left-0 z-[4] transition-all duration-2000" :class="isHandShow ? 'translate-y-[0%]' : 'translate-y-[70%]' ">
                    <img :src="images['10-hand-01.png']"> 
                </div>
            </div>
        </section>

        <!-- phone -->
        <div class="absolute top-0 left-0 z-[2]">
            <img :src="images['10-phone-01.png']"> 
        </div>

        <div class="absolute top-[-0.6%] left-[40.04%] w-[22.07%] h-full z-[3] phonemask">
            <div class="relative w-full h-full flex justify-center">
                <div @transitionend="isHandShow = true; isSoundWave = true" class="w-[90%] transition-all duration-900" :class="isNotiShow ? 'opacity-100 translate-y-[20%]' : 'opacity-0 translate-y-[0%]' ">
                    <div @click="socialMediaOn = true; $emit('togglescroll');$emit('themesong','main')" :class="isClickable ? 'noti cursor-pointer' : 'noti pointer-events-none'">
                        <img :src="images['10-poptext_7.png']"> 
                    </div>
                </div>
            </div>
        </div>

        <!-- social bg -->
        <div class="absolute top-[-0.6%] left-[40.04%] w-[22.07%] h-full z-[3] pointer-events-none phonemask">
            <div class="relative w-full h-full flex justify-center transition-all duration-500" :class="socialMediaOn ? 'opacity-100 scale-[1]' : 'opacity-0 scale-[0]' ">
                <div class="absolute top-[14.8%] left-0">
                    <img :src="images['10-BG3-01.png']"> 
                </div>
                <div ref="scrollContainerSC" class="absolute w-[80%] h-full top-0 right-0 overflow-y-scroll scroll-smooth">
                    <div class="w-full h-[20%]"></div>
                    <div class="w-full">
                        <img :src="images['10-sc1.png']">
                    </div>
                    <div class="w-full">
                        <img :src="images['10-sc2.png']">
                    </div>
                    <div class="w-full">
                        <img :src="images['10-sc3.png']">
                    </div>
                    <div class="w-full h-[17%]"></div>
                </div>
            </div>
        </div>

        <!-- scrollable container -->
        <section ref="scrollContainer" @wheel="handleWheel" @scroll="handleScroll" class="absolute top-0 left-0 w-full h-full z-[10] mask" :class="isScrollEnd || !socialMediaOn ? 'pointer-events-none hidden' : 'overflow-y-scroll scroll-smooth' ">
            <div class="w-full h-[40%]"></div>
            <!-- texts section -->
            <div class="w-full h-[120%]">
                <div class="relative w-full h-full">
                    <!-- 40% -->
                    <div class="absolute top-[0%] left-[3%] w-[35%] text-bubble comments" :class="scrollPercent >= 1 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['10-Textphone_2.png']">
                    </div>
                    <div class="absolute top-[5%] right-[3%] w-[35%] text-bubble-r comments" :class="scrollPercent >= 8 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['10-Textphone_5.png']">
                    </div>
                    <div class="absolute top-[22%] left-[6%] w-[35%] text-bubble comments" :class="scrollPercent >= 16 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['10-Textphone_7.png']">
                    </div>
                    <div class="absolute top-[33%] right-[3%] w-[35%] text-bubble-r comments" :class="scrollPercent >= 24 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['10-Textphone_6.png']">
                    </div>
                    <div class="absolute top-[48%] left-[4%] w-[35%] text-bubble comments" :class="scrollPercent >= 32 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['10-Textphone_3.png']">
                    </div>
                    <div class="absolute top-[59%] right-[3%] w-[36%] text-bubble-r comments" :class="scrollPercent >= 40 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['10-Textphone_8.png']">
                    </div>
                    <div class="absolute top-[78%] left-[4%] w-[35%] text-bubble-r comments" :class="scrollPercent >= 48 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['10-Textphone_4.png']">
                    </div>
                    <div class="absolute top-[83%] right-[8%] w-[35%] text-bubble-r comments" :class="scrollPercent >= 56 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['10-Textphone_9.png']">
                    </div>
                </div>
            </div>    
            <div class="w-full h-[100%]"></div>
        </section>

        <!-- sound -->
        <div class="absolute top-0 left-0 pointer-events-none">
            <img :src="images[soundCurrentFrame]"> 
        </div>

        <!-- fg fade in -->
        <div class="absolute top-0 left-0 w-full h-full bg-wall fade-out pointer-events-none z-[21]"></div>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-wall z-[21]" :class="isScrollEnd ? 'fade-in' : 'opacity-0 pointer-events-none' " ></div>

        
    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')
const isNotiShow = ref(false)
const isHandShow = ref(false)

onMounted(() => {
    setTimeout(() => {
        isNotiShow.value = true
        emit('soundeffect','message')
    },200)
})

const socialMediaOn = ref(false)
const isClickable = ref(false)

//scrolling management ---------------------------------------------------------------------------
const scrollContainer = ref(null)
const scrollContainerSC = ref(null)
const scrollPercent = ref(0)
const isScrollEnd = ref(false)

let lastScrollTime = 0

function handleScroll() {
    if (!scrollContainer.value) return

    const scrollTop = scrollContainer.value.scrollTop
    const scrollHeight = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight
    scrollPercent.value = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0
}

function handleWheel(event) {
    event.preventDefault()

    const now = performance.now()
    if (now - lastScrollTime < 16) return //frame rate

    if (!scrollContainer.value) return

    const isTrackpad = Math.abs(event.deltaY) < 50 // check if it's trackpad
    const scrollHeight = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight

    //speed for trackpad
    const trackpadMultiplier = 0.4
    //speed for wheel
    const wheelMultiplier = 6

    const scrollMultiplier = isTrackpad ? trackpadMultiplier : wheelMultiplier
    const maxScrollSpeed = (scrollMultiplier / 100) * scrollHeight
    const delta = Math.sign(event.deltaY) * maxScrollSpeed

    scrollContainer.value.scrollBy({ top: delta, behavior: isTrackpad ? 'instant' : 'smooth' })
    scrollContainerSC.value.scrollBy({ top: delta * 1.5, behavior: isTrackpad ? 'instant' : 'smooth' })

    lastScrollTime = now
}

let emit = defineEmits()

watch(scrollPercent, (newVal) => {
    console.log(newVal)
    if (newVal >= 100) {
        isScrollEnd.value = true
        emit('togglescroll')
    }
})


//------------------------------------------------------------------------------------------------

//animate sound wave

const isSoundWave = ref(false)

watch(isSoundWave, (newVal) => {
    if (newVal) {
        animateSound();
    }
})

const soundCurrentFrame = ref('10-soundwave-ทรศ_0000.png')
let soundInterval

function animateSound() {
    let soundcount = 0;
    soundInterval = setInterval(() => {
        soundCurrentFrame.value = `10-soundwave-ทรศ_000${soundcount}.png`;
        if (soundcount >= 77) {
            stopSound()
        } else {
            soundcount++;
        }
    }, 20);
}

function stopSound() {
    clearInterval(soundInterval)
    isClickable.value = true
    soundCurrentFrame.value = '10-soundwave-ทรศ_0000.png';
}

</script>

<style scoped>
.mask {
    -webkit-mask-image: url(/images/others/maskdialogue.png);
    mask-image: url(/images/others/maskdialogue.png);
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-size: contain;
    mask-size: contain;
}

.phonemask {
    -webkit-mask-image: url(/images/10/phone-mask.png);
    mask-image: url(/images/10/phone-mask.png);
    mask-repeat: no-repeat;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-size: contain;
    mask-size: contain;
}

@keyframes noti {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.05);
    }
}

.noti {
  animation: noti 0.5s infinite alternate ease-in-out;
}

.comments {
    @apply transition-all duration-500
}
</style>