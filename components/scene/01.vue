<template>
    <GeneralContainer>
        <!-- scrollable container -->
        <section ref="scrollContainer" @wheel="handleWheel" @scroll="handleScroll" class="absolute top-0 left-0 w-full h-full overflow-y-scroll scroll-smooth">
            <div v-for="i in 12" class="w-full h-full text-center"></div>
        </section>

        <!-- texts section -->
        <section class="absolute w-full h-full top-0 left-0 pointer-events-none">
            <div class="relative w-full h-full">
                <p class="absolute top-[17.2%] left-[38.5%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 1 ? 'opacity-100' : 'opacity-0'">
                    ทุกวันของปุ๊กลุก
                </p>
                <p class="absolute top-[28.2%] left-[18%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 8 ? 'opacity-100' : 'opacity-0'">
                    ได้เจอการถูกบูลลี่เรื่องการแต่งตัว
                </p>
                <p class="absolute top-[28.2%] left-[65.5%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 16 ? 'opacity-100' : 'opacity-0'">
                    รูปร่างที่อ้วน
                </p>
                <p class="absolute top-[39.2%] left-[13%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 24 ? 'opacity-100' : 'opacity-0'">
                    จากคนรอบข้าง
                </p>
                <p class="absolute top-[39.2%] left-[36%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 32 ? 'opacity-100' : 'opacity-0'">
                    สังคมที่ทำงาน
                </p>
                <p class="absolute top-[39.2%] left-[57.2%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 40 ? 'opacity-100' : 'opacity-0'">
                    แม้กระทั่ง....
                </p>
                <p class="absolute top-[39.2%] left-[72.5%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 48 ? 'opacity-100' : 'opacity-0'">
                    ครอบครัว
                </p>
                <p class="absolute top-[50.2%] left-[20.2%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 56 ? 'opacity-100' : 'opacity-0'">
                    เธอต้องอดทนถูกกระทำแบบนี้
                </p>
                <p class="absolute top-[50.2%] left-[62.5%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 64 ? 'opacity-100' : 'opacity-0'">
                    ซ้ำ ๆ ทุกวัน
                </p>
                <p class="absolute top-[61.2%] left-[31.5%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 72 ? 'opacity-100' : 'opacity-0'">
                    จนทำให้เธอขาดความมั่นใจ
                </p>
                <p class="absolute top-[72.2%] left-[22.5%] text-blue font-medium responsive-text appearing-text" :class="scrollPercent >= 80 ? 'opacity-100' : 'opacity-0'">
                    ไม่กล้าที่จะแต่งตัวในแบบ
                </p>
                <div class="absolute top-[-0.4%] left-[0%] w-full appearing-text" :class="scrollPercent >= 88 ? 'opacity-100' : 'opacity-0'">
                    <img :src="images['01-text-12.png']">
                </div>
            </div>
        </section>

        <!-- fg fade out -->
        <div @animationstart="$emit('togglescroll')" @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-black" :class="isScrollEnd ? 'fade-in' : 'opacity-0 pointer-events-none' " ></div>
    </GeneralContainer>
</template>

<script setup>
const images = inject("preloaded");

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
    const trackpadMultiplier = 0.25
    //speed for wheel
    const wheelMultiplier = 6

    const scrollMultiplier = isTrackpad ? trackpadMultiplier : wheelMultiplier
    const maxScrollSpeed = (scrollMultiplier / 100) * scrollHeight
    const delta = Math.sign(event.deltaY) * maxScrollSpeed

    scrollContainer.value.scrollBy({ top: delta, behavior: isTrackpad ? 'instant' : 'smooth' })

    lastScrollTime = now
}


//------------------------------------------------------------------------------------------------

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

.appearing-text {
    @apply transition-opacity duration-700
}
</style>
