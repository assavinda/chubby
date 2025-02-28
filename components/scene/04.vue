<template>
    <GeneralContainer>
        
        <!-- over all scroll up transition -->
        <section @animationend="isGoingToNext ? $emit('nextpage') : console.log('not now')" class="absolute top-0 left-0 w-full h-full" :class="isGoingToNext ? 'fade-scr-out' : '' ">

            <section class="absolute top-0 left-0 w-full h-full transition-all duration-900" :class="isScrollEnd ? 'translate-y-[-10%]' : '' ">
                <div class="relative w-full h-full">
                    <!-- alarm -->
                    <div class="absolute top-[-20%] left-0 w-full pointer-events-none">
                        <div class="relative w-full flex justify-center">
                            <div @animationend="isScrollLock = false" class="w-[50%] alarm-rotate">
                                <img :src="images['04-alarm.png']">
                            </div>          
                        </div>
                    </div>

                    <!-- text section -->
                    <div class="absolute top-[35%] left-0 w-full h-full">
                        <div class="flex flex-col gap-[3%] text-center w-full h-full">
                            <p class="text-blue font-medium responsive-text scale-[0.8] transition-all duration-900" :class="scrollPercent >= 1 ? 'opacity-50 translate-y-[0%]' : 'opacity-0 translate-y-[500%]' ">
                                (ถึงเวลากินข้าวเช้ากับครอบครัว)
                            </p>
                            <p class="text-blue font-medium responsive-text transition-all duration-900" :class="scrollPercent >= 33 ? 'opacity-100 translate-y-[0%]' : 'opacity-0 translate-y-[500%]' ">
                                เราต้องทนฟังแม่บ่น เรื่องแต่งตัวทุกวัน
                            </p>
                            <p class="text-blue font-medium responsive-text translate-x-[-2.5%] transition-all duration-900" :class="scrollPercent >= 66 ? 'opacity-100 translate-y-[0%]' : 'opacity-0 translate-y-[500%]' ">
                                เมื่อไรแม่จะเลิกทำแบบนี้ แล้ว <span class="text-pink-600 responsive-text scale-[1.3] translate-x-[12%] translate-y-[-6%] inline-block">เข้าใจเราสักที!</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- tired animation -->
            <div class="absolute top-0 left-0">
                <img :src="images[tiredCurrentFrame]">
            </div>
        </section>

        <!-- scrollable container -->
        <section ref="scrollContainer" @wheel="handleWheel" @scroll="handleScroll" class="absolute top-0 left-0 w-full h-full" :class="isScrollEnd || isScrollLock ? '' : 'overflow-y-scroll scroll-smooth' ">
            <div v-for="i in 12" class="w-full h-full text-center"></div>
        </section>

        <!-- fg fade in -->
        <div class="absolute top-0 left-0 w-full h-full bg-wall fade-out pointer-events-none"></div>
    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')
const isGoingToNext = ref(false)

//scrolling management ---------------------------------------------------------------------------
const scrollContainer = ref(null)
const scrollPercent = ref(0)
const isScrollEnd = ref(false)
const isScrollLock = ref(true)

let lastScrollTime = 0

function handleScroll() {
    if (!scrollContainer.value) return

    const scrollTop = scrollContainer.value.scrollTop
    const scrollHeight = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight
    scrollPercent.value = scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0

    console.log(`scrolled : ${scrollPercent.value}%`)

    if (scrollPercent.value == 100) {
        isScrollEnd.value = true
    }
}

function handleWheel(event) {
    event.preventDefault()

    const now = performance.now()
    if (now - lastScrollTime < 16) return //frame rate

    if (!scrollContainer.value) return

    const isTrackpad = Math.abs(event.deltaY) < 50 // check if it's trackpad
    const scrollHeight = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight

    //speed for trackpad
    const trackpadMultiplier = 0.5
    //speed for wheel
    const wheelMultiplier = 20

    const scrollMultiplier = isTrackpad ? trackpadMultiplier : wheelMultiplier
    const maxScrollSpeed = (scrollMultiplier / 100) * scrollHeight
    const delta = Math.sign(event.deltaY) * maxScrollSpeed

    scrollContainer.value.scrollBy({ top: delta, behavior: isTrackpad ? 'instant' : 'smooth' })

    lastScrollTime = now
}


//------------------------------------------------------------------------------------------------

//animate tired
const tiredCurrentFrame = ref('04-tired-text-text_00139.png')
let tiredInterval

function animateTired() {
    let tiredcount = 139
    tiredInterval = setInterval(() => {
        tiredCurrentFrame.value = `04-tired-text-text_00${tiredcount}.png`
        if (tiredcount >= 289) {
            isGoingToNext.value = true
            tiredcount = 199
        }
        else {
            tiredcount++
        }
    },20)
}

watch(scrollPercent, (newValue) => {
    if (newValue >= 100) {
        animateTired()
    }
});

let emit = defineEmits()

onMounted(() => {
    emit('togglescroll')
})

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

@keyframes alarm {
    0% {
        transform: rotate(-5deg);
    }
    25% {
        transform: rotate(5deg);
    }
    50% {
        transform: rotate(-5deg);
    }
    75% {
        transform: rotate(5deg);
    }
    100% {
        transform: rotate(0deg);
    }
    
}

.alarm-rotate {
    animation: alarm 0.8s forwards;
    transform-origin: 50% 70%;
}
</style>