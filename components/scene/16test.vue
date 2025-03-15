<template>
    <GeneralContainer>
        <!-- scrollable container -->
        <section ref="scrollContainer" @wheel="handleWheel" @scroll="handleScroll" class="absolute top-0 left-0 w-full h-full" :class="isScrollEnd || isScrollLock && scrollPercent >= 100 ? 'pointer-events-none' : 'overflow-y-scroll scroll-smooth' ">
            <div v-for="i in 12" class="w-full h-full text-center"></div>
        </section>

        <section ref="scrollContainer2" @wheel="handleWheel" @scroll="handleScroll" class="absolute top-0 left-0 w-full h-full" :class="isScrollLock && scrollPercent < 100 ? 'pointer-events-none' : 'overflow-y-scroll scroll-smooth' ">
            <!-- texts section -->
            <section class="w-full h-full pointer-events-none">
                <div class="relative w-full h-full">
                    <p class="absolute top-[13.2%] left-[31.43%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 1 ? 'opacity-100' : 'opacity-0'">
                        สุดท้ายแล้ว
                    </p>
                    <p class="absolute top-[13.2%] left-[48.5%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 15 ? 'opacity-100' : 'opacity-0'">
                        การรักตัวเอง
                    </p>
                    <p class="absolute top-[23.2%] left-[20.6%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 30 ? 'opacity-100' : 'opacity-0'">
                        ชอบการเป็นตัวเอง
                    </p>
                    <p class="absolute top-[23.2%] left-[47.5%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 45 ? 'opacity-100' : 'opacity-0'">
                        มั่นใจที่จะทำในสิ่งที่ชอบ
                    </p>
                    <p class="absolute top-[35%] left-[35.7%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 60 ? 'opacity-100' : 'opacity-0'">
                        ซึ่งไม่เดือดร้อนใคร
                    </p>
                    <p class="absolute top-[46.2%] left-[27.5%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 75 ? 'opacity-100' : 'opacity-0'">
                        เราก็จะข้ามผ่านการโดนบูลลี่ได้
                    </p>
                    <div class="absolute top-[-0.4%] left-[0%] w-full pen transition-all duration-1000" :class="scrollPercent >= 90 ? 'opacity-100 translate-y-[0%]' : 'opacity-0 translate-y-[30%]'">
                        <img :src="images['16-pen.png']">
                    </div>
                </div>
            </section>
            <!-- postit section -->
            <section class="w-full h-full z-[10]">
                    <div class="relative w-full h-full">
                        <div class="absolute top-0 left-0">
                            <img :src="images[postitCurrentFrame]">
                        </div>
                        <div @click="isGoingToNext = true" class="absolute bottom-[2%] right-[2%] w-[8%]">
                            <GeneralButtonRight/>
                        </div>
                    </div>
            </section>
        </section>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-wall z-[202]" :class="isGoingToNext ? 'fade-in' : 'opacity-0 pointer-events-none' " ></div>
        
    </GeneralContainer>
</template>

<script setup>
const images = inject("preloaded");
const isGoingToNext = ref(false)

//scrolling management ---------------------------------------------------------------------------
const scrollContainer = ref(null)
const scrollContainer2 = ref(null)
const scrollPercent = ref(0)
const scrollPercent2 = ref(0)
const isScrollEnd = ref(false)
const isScrollLock = ref(true)

let lastScrollTime = 0

function handleScroll() {
    if (!scrollContainer.value) return

    const scrollTop = scrollContainer.value.scrollTop
    const scrollHeight = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight

    const scrollTop2 = scrollContainer2.value.scrollTop
    const scrollHeight2 = scrollContainer2.value.scrollHeight - scrollContainer.value.clientHeight
    if (scrollPercent.value < 100) {
        scrollPercent.value = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0
    }
    else {
        scrollPercent2.value = scrollHeight2 > 0 ? Math.round((scrollTop2 / scrollHeight2) * 100) : 0
    }

}

function handleWheel(event) {
    event.preventDefault()

    const now = performance.now()
    if (now - lastScrollTime < 16) return //frame rate

    if (!scrollContainer.value) return

    const isTrackpad = Math.abs(event.deltaY) < 50 // check if it's trackpad
    const scrollHeight = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight
    const scrollHeight2 = scrollContainer2.value.scrollHeight - scrollContainer2.value.clientHeight
    if (scrollPercent.value < 100) {
        //speed for trackpad
        const trackpadMultiplier = 0.5
        //speed for wheel
        const wheelMultiplier = 30
        const scrollMultiplier = isTrackpad ? trackpadMultiplier : wheelMultiplier
        const maxScrollSpeed = (scrollMultiplier / 100) * scrollHeight
        const delta = Math.sign(event.deltaY) * maxScrollSpeed
        scrollContainer.value.scrollBy({ top: delta, behavior: isTrackpad ? 'instant' : 'smooth' })
    }
    else {
        //speed for trackpad
        const trackpadMultiplier = 1.5
        //speed for wheel
        const wheelMultiplier = 50
        const scrollMultiplier = isTrackpad ? trackpadMultiplier : wheelMultiplier
        const maxScrollSpeed = (scrollMultiplier / 100) * scrollHeight2
        const delta = Math.sign(event.deltaY) * maxScrollSpeed
        scrollContainer2.value.scrollBy({ top: delta, behavior: isTrackpad ? 'instant' : 'smooth' })
    }

    lastScrollTime = now
}

let emit = defineEmits()

watch(scrollPercent, (newVal) => {
    console.log(newVal)
})

watch(scrollPercent2, (newVal) => {
    console.log(newVal, 2)
    if (newVal == 100) {
        isScrollEnd.value = true
        emit('togglescroll')
    }
    else if (newVal <= 99 && isScrollEnd.value == true) {
        isScrollEnd.value = false
        emit('togglescroll')
    }
})

onMounted(() => {
    animatePostit()
    setTimeout(() => {
        isScrollLock.value = false
    },1500)
})

//------------------------------------------------------------------------------------------------
//animate postit
const postitCurrentFrame = ref('16-postits-paperปิด_00000.png')
let postitInterval

function animatePostit() {
    let postitcount = 0;
    postitInterval = setInterval(() => {
        if (postitcount >= 479) {
            postitcount = 0;
        } 
        else if (postitcount <= 9) {
            postitCurrentFrame.value = `16-postits-paperปิด_0000${postitcount}.png`;
        }
        else if (postitcount >= 10 && postitcount <= 99) {
            postitCurrentFrame.value = `16-postits-paperปิด_000${postitcount}.png`;
        }
        else if (postitcount >= 100 && postitcount < 479) {
            postitCurrentFrame.value = `16-postits-paperปิด_00${postitcount}.png`;
        }
        postitcount++;
    }, 30);
}
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
    @apply transition-all duration-700
}

@keyframes pen {
    0% {
        transform: rotate(5deg);
    }
    100% {
        transform: rotate(-5deg);
    }
}

.pen {
    animation: pen 0.7s alternate infinite ease-in-out;
    transform-origin: 50% 70%;
}
</style>