<template>
    <GeneralContainer>
        <!-- bg images -->
        <section class="absolute top-0 left-0">
            <video ref="videoRef" class="w-full" playsinline muted>
                <source src="/videos/cover.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </section>

        <div @click="$emit('togglesound'); $emit('themesong','main')" class="w-[5%] h-[15%] absolute top-[4%] right-[4%] z-[20] cursor-pointer transition-all duration-300 hover:scale-[1.2]">
            <img :src="images[`others-sound${SoundState}.png`]">
        </div>

        <!-- start btn -->
        <GeneralButton @click="isSuggestShow = true" class="w-[10%] absolute top-[87%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img :src="images['00-btn-start.png']">
        </GeneralButton>

        <!-- suggestion section -->
        <div class="absolute top-0 left-0 backdrop-blur-sm transition-opacity duration-400" :class="isSuggestShow ? 'opacity-100' : 'opacity-0 pointer-events-none' ">
            <!-- suggestion bg -->
            <div>
                <img :src="images['00-suggest01.png']">
            </div>

            <!-- suggestion btn (emit here) -->
            <GeneralButton @click="isGameStart = true" class="w-[10%] absolute top-[70%] left-[50.5%] transform -translate-x-1/2 -translate-y-1/2">
                <img :src="images['00-btn-suggest.png']">
            </GeneralButton>

        </div>

        <!-- fg fade out -->
        <div @animationend="$emit('start'); $emit('themesong','heavy')" class="absolute top-0 left-0 w-full h-full bg-wall" :class="isGameStart ? 'fade-in' : 'opacity-0 pointer-events-none' " ></div>

        <!-- fg fade in -->
        <div class="absolute top-0 left-0 w-full h-full bg-wall fade-out pointer-events-none"></div>
    </GeneralContainer>
</template>

<script setup>
const images = inject("preloaded");

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
            videoRef.value.currentTime = 0;
            videoRef.value.play();
        }
    });
});

//props
const { SoundState } = defineProps({ SoundState: String });

//suggestion
const isSuggestShow = ref(false)

//game start
const isGameStart =  ref(false)

let emit = defineEmits()

</script>

<style scoped>

</style>