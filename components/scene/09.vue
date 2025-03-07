<template>
    <GeneralContainer>
        <!-- bg color -->
        <div class="bg-gray-900 w-full h-full absolute top-0 left-0"></div>

        <!-- video bully -->
        <section class="absolute top-0 left-0">
            <video ref="videoRef" class="w-full" playsinline muted>
                <source src="/videos/puklukmind.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </section>

        <section ref="scrollContainer" @wheel="handleWheel" @scroll="handleScroll" class="absolute top-0 left-0 w-full h-full z-[20] mask" :class="isScrollEnd || isScrollLock ? 'hidden' : 'overflow-y-scroll scroll-smooth' ">
            <div class="w-full h-[50%]"></div>
            <!-- texts section -->
            <div class="w-full h-[120%]">
                <div class="relative w-full h-full">
                    <!-- 40% -->
                    <div class="absolute top-0 left-[10%] w-[35%] text-bubble bullyspeech" :class="scrollPercent >= 1 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['09-textเก็บกด02_other.png']">
                    </div>
                    <div class="absolute top-[18%] left-[5%] w-[35%] text-bubble bullyspeech" :class="scrollPercent >= 8 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['09-textเก็บกด01_other.png']">
                    </div>
                    <div class="absolute top-[13%] right-[38%] w-[35%] text-bubble bullyspeech" :class="scrollPercent >= 12 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['09-textเก็บกด01_other.png']">
                    </div>
                    <div class="absolute top-[5%] right-[14%] w-[35%] text-bubble-r bullyspeech" :class="scrollPercent >= 16 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['09-textเก็บกด03_other.png']">
                    </div>
                    <div class="absolute top-[26%] right-[15%] w-[35%] text-bubble bullyspeech" :class="scrollPercent >= 24 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['09-textเก็บกด04_other.png']">
                    </div>
                    <div class="absolute top-[38%] left-[12%] w-[35%] text-bubble-r bullyspeech" :class="scrollPercent >= 32 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['09-textเก็บกด05_other.png']">
                    </div>
                    <div class="absolute top-[48%] right-[10%] w-[35%] text-bubble bullyspeech" :class="scrollPercent >= 40 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['09-textเก็บกด06_other.png']">
                    </div>
                    <div class="absolute top-[65%] left-[1%] w-[47%] text-bubble-r bullyspeech" :class="scrollPercent >= 48 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['09-textเก็บกด07_other.png']">
                    </div>
                    <div class="absolute top-[76%] right-[8%] w-[47%] text-bubble-r bullyspeech" :class="scrollPercent >= 56 ? 'opacity-100 translate-y-[0]' : 'opacity-0 translate-y-[60%]' ">
                        <img :src="images['09-textเก็บกด08_other.png']">
                    </div>
                </div>
            </div> 
            <div class="w-full h-[110%]"></div>
        </section>

        <div @click="isQuestionShow = true; console.log(isQuestionShow)" class="absolute bottom-[2%] right-[2%] w-[8%] z-[99]" :class="isScrollEnd ? '' : 'hidden' ">
            <GeneralButtonRight></GeneralButtonRight>
        </div>
    
        <section class="absolute top-0 left-0 backdrop-blur-xs z-[100] transition-opacity duration-700" :class="isQuestionShow && !answer ? 'opacity-100' : 'opacity-0 pointer-events-none' ">
            <div>
                <img :src="images['09-yorn-02.png']">
            </div>
            <div @click="answer = 'yes'" class="absolute bottom-[20.9%] left-[33.85%] w-[12%]">
                <GeneralButton>
                    <img :src="images['09-yes-btn.png']">
                </GeneralButton>
            </div>
            <div @click="answer = 'no'" class="absolute bottom-[20.9%] left-[53.85%] w-[12%]">
                <GeneralButton>
                    <img :src="images['09-no-btn.png']">
                </GeneralButton>
            </div>
            
        </section>

        <section class="absolute top-0 left-0 backdrop-blur-xs z-[100] transition-opacity duration-200" :class="answer ? 'opacity-100' : 'opacity-0 pointer-events-none' ">
            <div :class="answer == 'yes' ? '' : 'hidden'">
                <div>
                    <img :src="images['09-yes-01.png']">
                </div>
                <div @click="isGoingToNext = true" class="absolute bottom-[16.2%] left-[46.5%] w-[7%]">
                    <GeneralButton>
                        <img :src="images['09-yes-next.png']">
                    </GeneralButton>
                </div>
            </div>
            <div :class="answer == 'no' ? '' : 'hidden'">
                <div>
                    <img :src="images['09-never-02.png']">
                </div>
                <div @click="isGoingToNext = true" class="absolute bottom-[16.2%] left-[46.5%] w-[7%]">
                    <GeneralButton>
                        <img :src="images['09-never-next.png']">
                    </GeneralButton>
                </div>
            </div>
        </section>

        <!-- fg fade out -->
        <div @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-wall z-[102]" :class="isGoingToNext ? 'fade-in' : 'opacity-0 pointer-events-none' " ></div>

    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')
const isQuestionShow = ref(false)
const answer = ref(null)
const isGoingToNext =  ref(false)

//video management
const videoRef = ref(null)

onMounted(() => {
    setTimeout(() => {
        if (videoRef.value) {
            const playPromise = videoRef.value.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Video play failed:", error);
                });
            }
        }
    }, 500);

    videoRef.value?.addEventListener("ended", () => {
        if (videoRef.value) {
            videoRef.value.currentTime = 13.64;
            videoRef.value.play();
        }
    });
});

//scrolling management ---------------------------------------------------------------------------
const scrollContainer = ref(null)
const scrollPercent = ref(0)
const isScrollEnd = ref(false)
const isScrollLock = ref(true)

let lastScrollTime = 0

onMounted(() => {
    setTimeout(() => {
        isScrollLock.value = false
        console.log('unlock')
    },1500)
});

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
    console.log(newVal)
    if (newVal >= 100) {
        isScrollEnd.value = true
        emit('togglescroll')
    }
})


</script>

<style scoped>
.bullyspeech {
    @apply transition-all duration-500
}
</style>