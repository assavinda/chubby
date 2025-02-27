<template>
    <ElementContainer>
        <!-- bg images -->
        <div class="absolute top-0 left-0">
            <img :src="images['02-bg-room.png']">
        </div>

        <!-- open eyes -->
        <div @animationend="$emit('togglescroll')" class="w-[120%] h-[60%] absolute left-[-10%] top-[-5%] bg-black blur-sm eye-top"></div>

        <div class="w-[120%] h-[60%] absolute left-[-10%] bottom-[-5%] bg-black blur-sm eye-bottom"></div>

        <!-- scrollable container -->
        <section ref="scrollContainer" @wheel="handleWheel" @scroll="handleScroll" class="absolute top-0 left-0 w-full h-full mask" :class="isScrollEnd ? '' : 'overflow-y-scroll scroll-smooth' ">
            <div class="w-full h-full"></div>
            <!-- texts section -->
            <div class="w-full h-[120%]">
                <div class="relative w-full h-full">
                    <div class="absolute top-0 left-0 w-[35%] text-bubble">
                        <img :src="images['02-textroom01.png']">
                    </div>
                    <div class="absolute top-[7%] right-[4%] w-[35%] text-bubble">
                        <img :src="images['02-textroom02.png']">
                    </div>
                    <div class="absolute top-[22%] left-[4%] w-[35%] text-bubble-r">
                        <img :src="images['02-textroom03.png']">
                    </div>
                    <div class="absolute top-[29%] right-[8%] w-[35%] text-bubble">
                        <img :src="images['02-textroom04.png']">
                    </div>
                    <div class="absolute top-[43%] right-[14%] w-[35%] text-bubble-r">
                        <img :src="images['02-textroom05.png']">
                    </div>
                    <div class="absolute top-[50%] left-[4%] w-[35%] text-bubble">
                        <img :src="images['02-textroom07.png']">
                    </div>
                    <div class="absolute top-[58%] right-[1%] w-[50%] text-bubble-r">
                        <img :src="images['02-textroom06.png']">
                    </div>
                </div>
            </div>    
            <div class="w-full h-[80%]"></div>
        </section>
        
        <!-- to click on wardrobe -->
        <div @click="isWadrobeClicked = true" class="w-[40%] h-[80%] absolute left-[30%] top-0 cursor-pointer" :class="isScrollEnd ? '' : 'hidden' "></div>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-wall" :class="isWadrobeClicked ? 'fade-in' : 'opacity-0 pointer-events-none' " ></div>

    </ElementContainer>
</template>

<script setup>
const images = inject("preloaded");
const isWadrobeClicked = ref(false)

//scrolling management ---------------------------------------------------------------------------
const scrollContainer = ref(null)
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
    const trackpadMultiplier = 0.5
    //speed for wheel
    const wheelMultiplier = 6

    const scrollMultiplier = isTrackpad ? trackpadMultiplier : wheelMultiplier
    const maxScrollSpeed = (scrollMultiplier / 100) * scrollHeight
    const delta = Math.sign(event.deltaY) * maxScrollSpeed

    scrollContainer.value.scrollBy({ top: delta, behavior: isTrackpad ? 'instant' : 'smooth' })

    lastScrollTime = now
}

let emit = defineEmits()

watch(scrollPercent, (newVal) => {
    if (newVal >= 100) {
        isScrollEnd.value = true
        emit('togglescroll')
    }
})


//------------------------------------------------------------------------------------------------
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

@keyframes openeyetop {
    0% {
        top: -5%;
    }
    20% {
        top: -5%;
    }
    50% {
        top: -45%;
    }
    65% {
        top: -15%;
    }
    100% {
        top: -65%;
    }
}

@keyframes openeyebottom {
    0% {
        bottom: -5%;
    }
    20% {
        bottom: -5%;
    }
    50% {
        bottom: -45%;
    }
    65% {
        bottom: -15%;
    }
    100% {
        bottom: -65%;
    }
}

.eye-top {
    animation: openeyetop 3s ease-out forwards;
}

.eye-bottom {
    animation: openeyebottom 3s ease-out forwards;
}
</style>