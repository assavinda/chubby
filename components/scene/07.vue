<template>
    <ElementContainer ref="container">
        <!-- clock bg -->
        <section @transitionend="isScrollLock = false" @animationend="isScrollEnd ? console.log('end clock') : animateClock() " class="absolute pointer-events-none top-0 left-0 transition-all duration-700" :class="[isScrollEnd ? 'fade-scr-out' : 'fade-scr-in', isGoUp ? ' translate-y-[-15%]' : '']">
            <div>
                <img :src="images['07-clock-bg.png']">
            </div>
            <div @animationend="isGoUp = true" ref="short" class="absolute top-[52%] left-[40.5%] w-[14%] rotate-[-5deg]" :style="{ transformOrigin: '70%' }">
                <img :src="images['07-clock01.png']">
            </div>
            <div ref="long" class="absolute top-[30%] left-[49.3%] w-[1%] rotate-[-21deg]" :style="{ transformOrigin: '85% 85%' }">
                <img :src="images['07-clock02.png']">
            </div>
            <div class="absolute top-[15%] left-[26.75%] w-[45%]">
                <img :src="images['07-clock00.png']">
            </div>
        </section>

        <!-- texts section -->
        <section class="absolute w-full h-full top-0 left-0 pointer-events-none" :class="isScrollEnd ? 'fade-scr-out' : 'fade-scr-in'">
            <div class="relative w-full h-full">
                <p class="absolute bottom-[23.2%] left-[35.5%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 1 ? 'opacity-100' : 'opacity-0'">
                    ถึงเวลาทำงานแล้วสินะ
                </p>
                <p class="absolute bottom-[12.2%] left-[23%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 40 ? 'opacity-100' : 'opacity-0'">
                    ไม่อยากทำเลย...
                </p>
                <p class="absolute bottom-[12.2%] left-[44.5%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 80 ? 'opacity-100' : 'opacity-0'">
                    ต้องมาเจอสังคมแบบนั้น
                </p>
            </div>
        </section>

        <!-- scrollable container -->
        <section ref="scrollContainer" @wheel="handleWheel" @scroll="handleScroll" class="absolute top-0 left-0 w-full h-full mask" :class="isScrollEnd || isScrollLock ? '' : 'overflow-y-scroll scroll-smooth' ">
            <div class="w-full h-full"></div>
            <div class="w-full h-[50%]"></div>
        </section>

        <!-- gate section -->
        <section @animationstart="isGoingToNext ? console.log('do nothing') : $emit('togglescroll')" @animationend="isGoingToNext ? $emit('nextpage') : console.log('not now')" class="absolute top-0 left-0" :class="isGateShow && !isGoingToNext ? 'fade-scr-in' : (isGoingToNext ? 'fade-out' : 'hidden')">
            <div>
                <img :src="images[gateCurrentFrame]">
            </div>
            <div class="absolute top-0 left-0">
                <img :src="images['07-work-o-01.png']">
            </div>
            <div class="absolute top-[51%] left-0" :class="isGateOpen ? 'hidden' : '' ">
                <img :src="images['07-work-03-01.png']">
            </div>
            <div class="absolute top-0 left-0">
                <img :src="images['07-work-05-01.png']">
            </div>
            <div @mousedown="startDrag" class="absolute top-[3.8%] left-[6.2%] w-[10%] cursor-pointer"
            :style="{ top: `${pos.top}%`, left: `${pos.left}%`}">
                <img :src="images['07-ID_other.png']">
            </div>
        </section>
    </ElementContainer>
</template>

<script setup>
const images = inject('preloaded')
const isGoUp = ref(false)
const isGateShow = ref(false)
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
}

function handleWheel(event) {
    event.preventDefault()

    const now = performance.now()
    if (now - lastScrollTime < 16) return //frame rate

    if (!scrollContainer.value) return

    const isTrackpad = Math.abs(event.deltaY) < 50 // check if it's trackpad
    const scrollHeight = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight

    //speed for trackpad
    const trackpadMultiplier = 1.1
    //speed for wheel
    const wheelMultiplier = 8

    const scrollMultiplier = isTrackpad ? trackpadMultiplier : wheelMultiplier
    const maxScrollSpeed = (scrollMultiplier / 100) * scrollHeight
    const delta = Math.sign(event.deltaY) * maxScrollSpeed

    scrollContainer.value.scrollBy({ top: delta, behavior: isTrackpad ? 'instant' : 'smooth' })

    lastScrollTime = now
}

watch(scrollPercent, (newVal) => {
    console.log(newVal)
    if (newVal >= 100) {
        setTimeout(() => {
            isScrollEnd.value = true
        },1200)
        setTimeout(() => {
            isGateShow.value = true
        },1900)
    }
})


//------------------------------------------------------------------------------------------------

//animate clock

const short = ref(null)
const long = ref(null)


function animateClock() {
    short.value.classList.add('short')
    long.value.classList.add('long')
}

//animate gate

let gateCurrentFrame = ref('07-work-01-01.png')
let gateInterval
let gatecount = 1;

const isGateOpen = ref(false)

function animateGate() {
    console.log('open gate')
    gateInterval = setInterval(() => {
        if (gatecount >= 8 && gatecount < 9) {
            isGateOpen.value = true
        }
        else if (gatecount <= 9) {
            gateCurrentFrame.value = `07-gateopen-work00${gatecount}.png`
        }
        else if (gatecount >= 10 && gatecount <= 39) {
            gateCurrentFrame.value = `07-gateopen-work0${gatecount}.png`
        }
        else if (gatecount >= 40) {
            clearInterval(gateInterval)
            setTimeout(() => {
                isGoingToNext.value = true
            },500)
        }
        gatecount++;
        console.log(gatecount)
    },30)
}

//drag system

const container = ref(null);
let containerBounds = null;

function getBound() {
    const containerElement = container.value?.$el || container.value;
    container.value = containerElement.getBoundingClientRect();
    containerBounds = containerElement.getBoundingClientRect();
}

let pos = ref({ top: 3.8, left: 6.2 });

function startDrag(e) {

    containerBounds == null ? getBound() : console.log('gotten');

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.top) / container.value.height * 100;

    pos.value.left = pcX - 5
    pos.value.top = pcY - 30

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);

}

function onDrag(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const pcX = (clientX - container.value.left) / container.value.width * 100;
    const pcY = (clientY - container.value.top) / container.value.height * 100;

    pos.value.left = pcX - 5
    pos.value.top = pcY - 30

    if (pos.value.left >= 69 && pos.value.left <= 77 && pos.value.top >= 33 && pos.value.top <= 40) {
        if (!gateInterval) {
            animateGate()
        }
    }
}

function stopDrag() {
    pos.value.left = 6.2
    pos.value.top = 3.8

    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
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
    @apply transition-opacity duration-700
}

@keyframes short {
    0% {
        transform: rotate(0deg);
    }
    85% {
        transform: rotate(4deg);
    }
    90% {
        transform: rotate(6deg);
    }
    95% {
        transform: rotate(4deg);
    }
    100% {
        transform: rotate(5deg);
    }
}

.short {
    animation: short 1.8s forwards;
    transform-origin: 70%;
}

@keyframes long {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(9deg);
    }
    90% {
        transform: rotate(21deg);
    }
    95% {
        transform: rotate(19deg);
    }
    100% {
        transform: rotate(20deg);
    }
}

.long {
    animation: long 1.5s forwards;
    transform-origin: 100%;
}
</style>