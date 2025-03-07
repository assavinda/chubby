<template>
    <GeneralContainer ref="container">

        <!-- text section -->
        <section @animationend="isStart = true" class="absolute top-0 left-0 w-full h-full transition-all duration-900" :class="[scrollPercent >= 100 ? 'translate-y-[-20%]' : 'translate-y-[0%]', isFadeToGame ? 'fade-out' : '' ]">
            <div class="flex flex-col gap-[3%] text-center justify-center items-center w-full h-full">
                <p class="text-blue font-medium responsive-text transition-all duration-900" :class="scrollPercent >= 1 ? 'opacity-100 translate-y-[0%]' : 'opacity-0 translate-y-[500%]' ">
                    ก่อนจะออกไปข้างนอก
                </p>
                <p class="text-blue font-medium responsive-text transition-all duration-900" :class="scrollPercent >= 25 ? 'opacity-100 translate-y-[0%]' : 'opacity-0 translate-y-[500%]' ">
                    เรามาใส่คำเพิ่มความมั่นใจ
                </p>
                <p class="text-blue font-medium responsive-text transition-all duration-900" :class="scrollPercent >= 50 ? 'opacity-100 translate-y-[0%]' : 'opacity-0 translate-y-[500%]' ">
                    แทนคำไม่ดีในใจออกกันเถอะ
                </p>
                <div class="w-[2%]" :class="scrollPercent >= 75 ? 'opacity-100 translate-y-[0%]' : 'opacity-0 translate-y-[500%]' ">
                    <img :src="images['15-textH04-01.png']">
                </div>
                <div class="w-[1.75%]" :class="scrollPercent >= 85 ? 'opacity-100 translate-y-[0%]' : 'opacity-0 translate-y-[500%]' ">
                    <img :src="images['15-textH04-01.png']">
                </div>
                <div class="w-[1.75%]" :class="scrollPercent >= 90 ? 'opacity-100 translate-y-[0%]' : 'opacity-0 translate-y-[500%]' ">
                    <img :src="images['15-textH04-01.png']">
                </div>
            </div>
            <!-- heart -->
            <div class="w-full absolute top-[20%] left-[-1%] plaster-bounce transition-all duration-900" :class="scrollPercent >= 100 ? 'opacity-100 translate-y-[0%]' : 'opacity-0 translate-y-[50%]' ">
                <img :src="images['15-textH06-01.png']">
            </div>

            <div @click="isFadeToGame = true" class="w-[30%] h-[40%] cursor-pointer absolute top-[77%] left-[35%]" :class="isScrollEnd ? '' : 'hidden' "></div>
        </section>

        <!-- scrollable container -->
        <section ref="scrollContainer" @wheel="handleWheel" @scroll="handleScroll" class="absolute top-0 left-0 w-full h-full" :class="isScrollEnd || isScrollLock ? 'pointer-events-none' : 'overflow-y-scroll scroll-smooth' ">
            <div v-for="i in 12" class="w-full h-full text-center"></div>
        </section>

        <!-- game section -->
        <section class="absolute top-0 left-0 w-full h-full" :class="isStart ? 'fade-in' : 'pointer-events-none opacity-0' ">
            <div class="w-full h-full absolute top-0 left-0">
                <img :src="images['15-heart06-01.png']">
            </div>

            <div v-for="i in Object.keys(widths)" :id="`${i}`" @mousedown="startDrag" @mouseup="stopDrag" :class="i == 'plaster01' && isClickable ? 'plaster-bounce hover:scale-[1.05]' : '' " class="absolute top-0 left-0 cursor-pointer" :style="{ top: `${pos[`${i}`].top}%`, left: `${pos[`${i}`].left}%` , width: `${widths[`${i}`]}%` }">
                <img :src="images[`15-${i}-01.png`]">
            </div>

            <div class="absolute top-[2%] right-[2%] w-[5.5%]">
                <GeneralButton @click="isBackDropShow = true; isSuggestShow = true">
                    <img :src="images['15-howto-btn.png']">
                </GeneralButton>
            </div>
            <div @click="isSuccess = true" class="w-[20%] h-[20%] absolute top-[38%] left-[41%] cursor-pointer" :class="isClickable ? '' : 'hidden' "></div>

            <div class="w-full h-full absolute top-0 left-0 backdrop-blur-xs transition-opacity duration-700" :class="isBackDropShow ? 'opacity-100' : 'opacity-0 pointer-events-none' ">
                <div class="w-full h-full absolute top-0 left-0 bg-black opacity-25 duration-700"></div>
            </div>

            <div class="w-full h-full absolute top-0 left-0 transition-opacity duration-700" :class="isSuggestShow && isBackDropShow ? 'opacity-100' : 'opacity-0 pointer-events-none' ">
                <div>
                    <img :src="images['15-suggestion-01.png']">
                </div>
                <div class="absolute top-[13%] left-[47.2%] w-[7.5%]">
                    <GeneralButton @click="isBackDropShow = false; isSuggestShow = false">
                        <img :src="images['15-close-suggest.png']">
                    </GeneralButton>
                </div>
            </div>
        </section>

        <!-- credits -->
        <section class="absolute top-[-0.5%] left-[0%] w-[100.5%] pointer-events-none transition-opacity duration-700" :class="isVideoShow ? 'opacity-100' : 'opacity-0'">
            <video ref="videoRef" @loadeddata="isVideoReady = true" class="w-full">
            <source src="/videos/endtouchheart.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </section>
    </GeneralContainer>
</template>

<script setup>

const images = inject("preloaded");
const isStart = ref(false)
const isSuggestShow = ref(true)
const isBackDropShow = ref(true)
const isClickable = ref(false)
const isFadeToGame = ref(false)

let emit = defineEmits()

onMounted(() => {
    emit('togglescroll')
})

//scrolling management ---------------------------------------------------------------------------
const scrollContainer = ref(null)
const scrollPercent = ref(0)
const isScrollEnd = ref(false)
const isScrollLock = ref(false)

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
    const trackpadMultiplier = 0.75
    //speed for wheel
    const wheelMultiplier = 30

    const scrollMultiplier = isTrackpad ? trackpadMultiplier : wheelMultiplier
    const maxScrollSpeed = (scrollMultiplier / 100) * scrollHeight
    const delta = Math.sign(event.deltaY) * maxScrollSpeed

    scrollContainer.value.scrollBy({ top: delta, behavior: isTrackpad ? 'instant' : 'smooth' })

    lastScrollTime = now
}

watch(scrollPercent, (newVal) => {
    console.log(newVal)
    if (newVal == 100) {
        // isScrollLock.value = true
        emit('togglescroll')
        isScrollEnd.value = true
    }
})

//------------------------------------------------------------------------------------------------

//drag system

const container = ref(null);
let containerBounds = null;

function getBound() {
    const containerElement = container.value?.$el || container.value;
    container.value = containerElement.getBoundingClientRect();
    containerBounds = containerElement.getBoundingClientRect();
}

const widths = ref({
    'heart01': 30.6,
    'heart02': 30.4,
    'heart03': 19,
    'heart04': 19.4,
    'heart05': 22.2,
    'paper01': 16.6,
    'paper02': 18.6,
    'paper03': 20,
    'paper04': 17.8,
    'paper05': 19,
    'plaster01': 16,
})

const pos = ref(
    {
        'heart01': { top: 6.6, left: 22.4 },
        'heart02': { top: 4.4, left: 52.2 },
        'heart03': { top: 38.4, left: 16.8 },
        'heart04': { top: 41.69, left: 38.47 },
        'heart05': { top: 54.04, left: 57.97 },
        'paper01': { top: 40.14, left: 81.42 },
        'paper02': { top: 61.25, left: 76.02 },
        'paper03': { top: 60.91, left: 7.2 },
        'paper04': { top: 37.4, left: 1.98 },
        'paper05': { top: 8.05, left: 3.24 },
        'plaster01': { top: 20, left: 83.16 },
    }
);
const originPos = ref(
    {
        'heart01': { top: 6.6, left: 22.4 },
        'heart02': { top: 4.4, left: 52.2 },
        'heart03': { top: 38.4, left: 16.8 },
        'heart04': { top: 41.69, left: 38.47 },
        'heart05': { top: 54.04, left: 57.97 },
        'paper01': { top: 40.14, left: 81.42 },
        'paper02': { top: 61.25, left: 76.02 },
        'paper03': { top: 60.91, left: 7.2 },
        'paper04': { top: 37.4, left: 1.98 },
        'paper05': { top: 8.05, left: 3.24 },
        'plaster01': { top: 20, left: 83.16 },
    }
);
const destinationPos = ref(
    {
        'heart01': { top: 12.6, left: 22.8 },
        'heart02': { top: 12, left: 48.61 },
        'heart03': { top: 28.30, left: 22.06 },
        'heart04': { top: 33.8, left: 35 },
        'heart05': { top: 42.6, left: 47 },
        'paper01': { top: 21.27, left: 55.27 },
        'paper02': { top: 49.07, left: 49.96 },
        'paper03': { top: 51.98, left: 32.58 },
        'paper04': { top: 36.71, left: 19.16 },
        'paper05': { top: 9.4, left: 27.37 },
        'plaster01': { top: 41.52, left: 42.23 },
    }
);

const isSuccess = ref(false)
const successTargets = ref([])

watch(successTargets, (newVal) => {
    console.log(newVal.length);
    if (newVal.length == 11) {
        isClickable.value = true
    }
}, { deep: true });


const currentTarget = ref('heart01')
const currentElement = ref(null)

function startDrag(e) {

    currentTarget.value = e.target.id
    currentElement.value = e.target
    if (successTargets.value.includes(currentTarget.value)) {
        console.log('success')
    }
    else {
        containerBounds == null ? getBound() : console.log('gotten');

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const pcX = (clientX - container.value.left) / container.value.width * 100;
        const pcY = (clientY - container.value.top) / container.value.height * 100;

        if (currentTarget.value == 'plaster01') {
            pos.value[currentTarget.value].left = pcX - 9
            pos.value[currentTarget.value].top = pcY - 5
        }
        else {
            pos.value[currentTarget.value].left = pcX - 15
            pos.value[currentTarget.value].top = pcY - 15
        }

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDrag);

        console.log(e.target.id)
    }

}

function onDrag(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.top) / container.value.height * 100;

    if (currentTarget.value == 'plaster01') {
        pos.value[currentTarget.value].left = pcX - 9
        pos.value[currentTarget.value].top = pcY - 5
    }
    else {
        pos.value[currentTarget.value].left = pcX - 15
        pos.value[currentTarget.value].top = pcY - 15
    }

    console.log(pos.value[currentTarget.value].left, pos.value[currentTarget.value].top)
    let plus = 3

    if (currentTarget.value.includes('paper')) {
        plus = 6
    }

    if (pos.value[currentTarget.value].top <= destinationPos.value[currentTarget.value].top + plus && pos.value[currentTarget.value].top >= destinationPos.value[currentTarget.value].top - plus
     && pos.value[currentTarget.value].left <= destinationPos.value[currentTarget.value].left + plus && pos.value[currentTarget.value].left >= destinationPos.value[currentTarget.value].left - plus) {

        pos.value[currentTarget.value].left = destinationPos.value[currentTarget.value].left
        pos.value[currentTarget.value].top = destinationPos.value[currentTarget.value].top
        originPos.value[currentTarget.value].left = destinationPos.value[currentTarget.value].left
        originPos.value[currentTarget.value].top = destinationPos.value[currentTarget.value].top

        successTargets.value.push(currentTarget.value)
        currentElement.value.classList.add('transition-all', 'duration-200', 'bounce-in', 'pointer-events-none')
        stopDrag()
    }

}

function stopDrag() {
    pos.value[currentTarget.value].left = originPos.value[currentTarget.value].left
    pos.value[currentTarget.value].top = originPos.value[currentTarget.value].top

    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
}

// manage video
const isVideoShow = ref(false)
const isVideoReady = ref(false)
const videoRef = ref(null);

watch(isSuccess, (value) => {
    if (value) {
        isVideoShow.value = true
    }
})

watch(isVideoReady, (value) => {
    if (value) {
        console.log('ready!!!!')
    }
})

watch(isVideoShow, (value) => {
  if (videoRef.value) {
    if (value) {
      videoRef.value.play();
      console.log('play')
    } else {
      videoRef.value.pause();
    }
  }
  else {
    isVideoShow.value = false
    console.log(isVideoReady.value)
  }
});

</script>

<style scoped>
.responsive-text {
    font-size: 6.04444444vh;
}

@media (max-aspect-ratio: 16/9) {
    .responsive-text {
        font-size: 3.4vw;
    }
}

.appearing-text {
    @apply transition-opacity duration-700
}

@keyframes bounce {
    0% {
        transform: scale(1)
    }
    50% {
        transform: scale(1.025)
    }
    100% {
        transform: scale(1)
    }
}

.bounce-in {
    animation: bounce 0.5s alternate ease-in-out forwards;
}

.plaster-bounce {
    animation: bounce 0.9s alternate infinite ease-in-out forwards;
}
</style>