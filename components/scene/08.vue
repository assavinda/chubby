<template>
    <GeneralContainer>
        <!-- office bg -->
        <section class="absolute top-0 left-0 z-[10] fade-scr-in">
            <div>
                <img :src="images['08-office1.png']"> 
            </div>
            <div class="absolute top-0 left-0">
                <img :src="images[handCurrentFrame]">
            </div>
            <div class="absolute top-0 left-0">
                <img :src="images['08-textoff-01.png']"> 
            </div>
        </section>

        <!-- people -->
        <section @animationstart="isTextShow = false" @animationend="isPeopleCome = false; isPeopleGo = false ; isScrollLock = false; currentPeopleSet++" class="absolute top-[-30%] right-[-16%] z-[9] w-[55%]" :class="[isPeopleCome ? 'opacity-100 translate-y-[0%] transition-all duration-500' : 'opacity-0 translate-y-[40%]', isPeopleGo ? 'peoplego' : '']">
            <div>
                <img :src="images['08-people.png']">
            </div>
        </section>

        <!-- texts section -->
        <section class="absolute top-0 left-0 w-full h-full z-[19]">
            <div class="relative w-full h-full" :class="currentPeopleSet == 1 ? '' : 'hidden' ">
                <!-- set 01 -->
                <div class="absolute top-[-5%] left-[25%] w-[35%] text-bubble transition-all duration-300" :class="isTextShow ? 'opacity-100 translate-y-[0%] scale-[1]' : 'opacity-0 translate-y-[40%] scale-[0.5]' ">
                    <img :src="images['08-text-textoffice01.png']">
                </div>
                <div class="absolute top-[18%] right-[35%] w-[35%] text-bubble transition-all duration-300" :class="isTextShow ? 'opacity-100 translate-y-[0%] scale-[1]' : 'opacity-0 translate-y-[40%] scale-[0.5]' ">
                    <img :src="images['08-text-textoffice03.png']">
                </div>
                <div class="absolute top-[8%] left-[2%] w-[35%] text-bubble-r transition-all duration-300" :class="isTextShow ? 'opacity-100 translate-y-[0%] scale-[1]' : 'opacity-0 translate-y-[40%] scale-[0.5]' ">
                    <img :src="images['08-text-textoffice02.png']">
                </div>
            </div>
            <!-- set 02 -->
            <div class="relative w-full h-full" :class="currentPeopleSet == 2 ? '' : 'hidden' ">
                <div class="absolute top-[2%] left-[2%] w-[35%] text-bubble transition-all duration-300" :class="isTextShow ? 'opacity-100 translate-y-[0%] scale-[1]' : 'opacity-0 translate-y-[40%] scale-[0.5]' ">
                    <img :src="images['08-text-textoffice04.png']">
                </div>
                <div class="absolute top-[2%] left-[30%] w-[35%] text-bubble-r transition-all duration-300" :class="isTextShow ? 'opacity-100 translate-y-[0%] scale-[1]' : 'opacity-0 translate-y-[40%] scale-[0.5]' ">
                    <img :src="images['08-text-textoffice05.png']">
                </div>
                <div class="absolute top-[14%] left-[11%] w-[35%] text-bubble-r transition-all duration-300" :class="isTextShow ? 'opacity-100 translate-y-[0%] scale-[1]' : 'opacity-0 translate-y-[40%] scale-[0.5]' ">
                    <img :src="images['08-text-textoffice06.png']">
                </div>
                <div class="absolute top-[17%] left-[37%] w-[35%] text-bubble transition-all duration-300" :class="isTextShow ? 'opacity-100 translate-y-[0%] scale-[1]' : 'opacity-0 translate-y-[40%] scale-[0.5]' ">
                    <img :src="images['08-text-textoffice07.png']">
                </div>
            </div>

            <!-- set 03 -->
            <div class="relative w-full h-full" :class="currentPeopleSet == 3 ? '' : 'hidden' ">
                <div class="absolute top-[7%] left-[-3%] w-[35%] text-bubble transition-all duration-300" :class="isTextShow && scrollPercent >= 65 ? 'opacity-100 translate-y-[0%] scale-[1]' : 'opacity-0 translate-y-[40%] scale-[0.5]' ">
                    <img :src="images['08-text-textoffice08.png']">
                </div>
                <div class="absolute top-[0%] left-[25%] w-[35%] text-bubble-r transition-all duration-300" :class="isTextShow && scrollPercent >= 80 ? 'opacity-100 translate-y-[0%] scale-[1]' : 'opacity-0 translate-y-[40%] scale-[0.5]' ">
                    <img :src="images['08-text-textoffice07.png']">
                </div>
                <div class="absolute top-[17%] left-[23%] w-[47%] text-bubble-r transition-all duration-300" :class="isTextShow && scrollPercent >= 95 ? 'opacity-100 translate-y-[0%] scale-[1]' : 'opacity-0 translate-y-[40%] scale-[0.5]' ">
                    <img :src="images['08-text-textoffice10.png']">
                </div>
            </div>

        </section>

        <!-- scrollable container -->
        <section ref="scrollContainer" @wheel="handleWheel" @scroll="handleScroll" class="absolute top-0 left-0 w-full h-full z-[20] mask" :class="isScrollEnd || isScrollLock ? '' : 'overflow-y-scroll scroll-smooth' ">
            <div class="w-full h-full"></div>
            <div class="w-full h-full"></div>
        </section>

        <!-- stop bully -->
         <section class="absolute top-0 left-0 pointer-events-none z-[30]">
            <div>
                <img :src="images[bullyCurrentFrame]">
            </div>
         </section>

        <!-- fg fade in -->
        <div class="absolute top-0 left-0 w-full h-full bg-wall fade-out pointer-events-none z-[21]"></div>

    </GeneralContainer>
</template>

<script setup>
const images = inject('preloaded')


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
    const trackpadMultiplier = 0.5
    //speed for wheel
    const wheelMultiplier = 4

    const scrollMultiplier = isTrackpad ? trackpadMultiplier : wheelMultiplier
    const maxScrollSpeed = (scrollMultiplier / 100) * scrollHeight
    const delta = Math.sign(event.deltaY) * maxScrollSpeed

    scrollContainer.value.scrollBy({ top: delta, behavior: isTrackpad ? 'instant' : 'smooth' })

    lastScrollTime = now
}

const currentPeopleSet = ref(1)

watch(scrollPercent, (newVal) => {
    console.log(newVal)
    if (newVal == 2 || newVal == 28 || newVal == 56) {
        isPeopleCome.value = true
    }
    else if (newVal == 7 || newVal == 33 || newVal == 61) {
        isTextShow.value = true
    }
    else if (newVal == 26 || newVal == 54) {
        isScrollLock.value = true
        isPeopleGo.value = true
    }
    else if (newVal >= 100) {
        isScrollEnd.value = true
        setTimeout(() => {
            isPeopleGo.value = true
            setTimeout(() => {
                animateBully()
            },500)
        }, 2500)
    }
})

//------------------------------------------------------------------------------------------------

//animate hand
const handCurrentFrame = ref('08-hand3.png')
let handInterval

function animateHand() {
    let handcount = 1;
    handInterval = setInterval(() => {
        handCurrentFrame.value = `08-hand${handcount}.png`;
        if (handcount >= 3) {
            handcount = 1;
        } else {
            handcount++;
        }
    }, 150);
}

onMounted(() => {
    animateHand()
    emit('togglescroll')
    setTimeout(() => {
        isScrollLock.value = false
        console.log('unlock')
    },700)
});

//animate people
const isPeopleCome = ref(false)
const isPeopleGo = ref(false)
const isTextShow = ref(false)

let emit = defineEmits()

//animate bully
const bullyCurrentFrame = ref('08-stop-รวม_00024.png')
let bullyInterval

function animateBully() {
    let bullycount = 24;
    bullyInterval = setInterval(() => {
        if (bullycount >= 281) {
            bullyCurrentFrame.value = `08-stop-รวม_00${bullycount}.png`
            emit('nextpage')
        } 
        else if (bullycount <= 99) {
            bullyCurrentFrame.value = `08-stop-รวม_000${bullycount}.png`
        }
        else if (bullycount >= 100 && bullycount < 281) {
            bullyCurrentFrame.value = `08-stop-รวม_00${bullycount}.png`
        }
        bullycount++;
    }, 30);
}

</script>

<style scoped>
@keyframes peoplego {
    0% {
        transform: translate(0%, 0%);
    }
    10% {
        transform: translate(-20%, -2%);
    }
    20% {
        transform: translate(-40%, 0%);
    }
    30% {
        transform: translate(-60%, -2%);
    }
    40% {
        transform: translate(-80%, 0%);
    }
    50% {
        transform: translate(-100%, -2%);
    }
    60% {
        transform: translate(-120%, 0%);
    }
    70% {
        transform: translate(-140%, -2%);
    }
    80% {
        transform: translate(-160%, 0%);
    }
    90% {
        transform: translate(-180%, -2%);
    }
    100% {
        transform: translate(-200%, 0%);
    }
}

.peoplego {
    animation: peoplego 1.2s backwards;
}
</style>