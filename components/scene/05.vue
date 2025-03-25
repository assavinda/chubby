<template>
    <GeneralContainer>
        <!-- bg box -->
        <section @animationend="isScrollLock = false" class="absolute top-0 left-0" :class="isScrollEnd ? 'fade-out' : 'fade-scr-in' ">
            <div>
                <img :src="images['05-eat-bg.png']"> 
            </div>
            <div class="absolute top-0 left-0">
                <img :src="images[momCurrentFrame]">
            </div>
        </section>

        <!-- scrollable container -->
        <section ref="scrollContainer" @wheel="handleWheel" @scroll="handleScroll" class="absolute top-0 left-0 w-full h-full overflow-y-scroll scroll-smooth mask" :class=" isScrollEnd || isScrollLock ? 'hidden' : 'overflow-y-scroll scroll-smooth' ">
            <div class="w-full h-[50%] text-center"></div>
            <!-- texts section -->
            <div class="w-full h-[120%]">
                <div class="relative w-full h-full">
                    <!-- 40% -->
                    <div class="absolute top-0 left-[8%] w-[35%] text-bubble mom-dialogue" :class="scrollPercent >= 6 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['05-textm01.png']">
                    </div>
                    <div class="absolute top-[18%] left-[0%] w-[35%] text-bubble mom-dialogue" :class="scrollPercent >= 12 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['05-textm02.png']">
                    </div>
                    <div class="absolute top-[6%] right-[15%] w-[35%] text-bubble-r mom-dialogue" :class="scrollPercent >= 18 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['05-textm03.png']">
                    </div>
                    <div class="absolute top-[23%] right-[8%] w-[35%] text-bubble mom-dialogue" :class="scrollPercent >= 24 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['05-textm04.png']">
                    </div>
                    <div class="absolute top-[37%] right-[12%] w-[35%] text-bubble-r mom-dialogue" :class="scrollPercent >= 30 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['05-textm05.png']">
                    </div>
                    <div class="absolute top-[34%] left-[-2%] w-[45%] text-bubble mom-dialogue" :class="scrollPercent >= 36 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['05-textm06.png']">
                    </div>
                    <div class="absolute top-[60%] left-[8%] w-[35%] text-bubble-r mom-dialogue" :class="scrollPercent >= 48 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['05-textm07.png']">
                    </div>
                    <div class="absolute top-[53%] right-[2%] w-[45%] text-bubble-r mom-dialogue" :class="scrollPercent >= 56 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['05-textm08.png']">
                    </div>
                </div>
            </div>   
            <div class="w-full h-[70%] text-center"></div> 
        </section>

        <!-- tired text -->
        <section class="absolute top-[5%] left-[10%] w-[80%] pointer-events-none">
            <img :src="images[tiredCurrentFrame]">
        </section>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-wall" :class="isGoingToNext ? 'fade-in' : 'opacity-0 pointer-events-none' " ></div>

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
//scroll speed
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
    const trackpadMultiplier = 0.5
    //speed for wheel
    const wheelMultiplier = 6

    const scrollMultiplier = isTrackpad ? trackpadMultiplier : wheelMultiplier
    const maxScrollSpeed = (scrollMultiplier / 100) * scrollHeight
    const delta = Math.sign(event.deltaY) * maxScrollSpeed

    scrollContainer.value.scrollBy({ top: delta, behavior: isTrackpad ? 'instant' : 'smooth' })

    lastScrollTime = now
}

watch(scrollPercent, (newVal) => {
    console.log(newVal)
    if (scrollPercent.value >= 100) {
        isScrollEnd.value = true
        stopMom()
        setTimeout(() => {
            animateTired()
        },700)
    }
    else {
        if (scrollPercent.value >= 10 && !momInterval) {
            animateMom()
        }
    }
});


//------------------------------------------------------------------------------------------------

//animate mom
const momCurrentFrame = ref('05-mom08.png')
let momInterval

function animateMom() {
    let momcount = 1;
    momInterval = setInterval(() => {
        momCurrentFrame.value = `05-mom0${momcount}.png`;
        if (momcount >= 8) {
            momcount = 1;
        } else {
            momcount++;
        }
    }, 150);
}

function stopMom() {
    clearInterval(momInterval)
    momCurrentFrame.value = `05-mom08.png`;
}

//animate tired
const tiredCurrentFrame = ref('others-blank.png')
let tiredInterval

function animateTired() {
    let tiredcount = 271;
    tiredInterval = setInterval(() => {
        tiredCurrentFrame.value = `05-tired-eatM_00${tiredcount}.png`;
        if (tiredcount >= 379) {
            tiredcount = 361;
            isGoingToNext.value = true
        } else {
            tiredcount++;
        }
    }, 30);
}

function stopTired() {
    clearInterval(tiredInterval)
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

.mom-dialogue {
    @apply transition-all duration-500
}

</style>