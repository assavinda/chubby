<template>
  <section class="flex h-screen w-screen bg-black place-items-center justify-center">
    <audio ref="themesong" loop>
      <source :src="`./sounds/${currentThemeSong}.mp3`" type="audio/mpeg">
    </audio>

    <audio ref="soundeffects" v-if="currentSoundEffect != ''" :loop="currentSoundEffect === 'message'">
      <source :src="`./sounds/effects/${currentSoundEffect}.mp3`" type="audio/mpeg">
    </audio>

    <section class="absolute pointer-events-none z-[100] transition-opacity duration-300" :class="isShowScrollIcon ? 'opacity-100' : 'opacity-0' ">
      <div class="relative w-fit h-fit overflow-hidden">
        <img :src="images['00-cover00.png']" class="max-w-screen max-h-screen object-contain opacity-0">

        <GeneralScrIcon/>
      </div>
    </section>
    

    <Scene00 v-if="currentScene === '00'" @start="setScene('01')" @togglesound="toggleSound" @themesong="playThemeSong" :SoundState="SoundState" />

    <Scene01 v-if="currentScene === '01'" @nextpage="setScene('02')" @togglescroll="toggleScrollIcon"/>

    <Scene02 v-if="currentScene === '02'" @nextpage="setScene('03')" @togglescroll="toggleScrollIcon"/>

    <Scene03 v-if="currentScene === '03'" @nextpage="setScene('04')" @soundeffect="playSoundEffect"/>

    <Scene04 v-if="currentScene === '04'" @nextpage="setScene('05')" @togglescroll="toggleScrollIcon"/>

    <Scene05 v-if="currentScene === '05'" @nextpage="setScene('06')"/>

    <Scene06 v-if="currentScene === '06'" @nextpage="setScene('07')" @soundeffect="playSoundEffect"/>

    <Scene07 v-if="currentScene === '07'" @nextpage="setScene('08')" @soundeffect="playSoundEffect" @pauseeffect="pauseSoundEffect" @togglescroll="toggleScrollIcon"/>

    <Scene08 v-if="currentScene === '08'" @nextpage="setScene('09')" @togglescroll="toggleScrollIcon"/>

    <Scene09 v-if="currentScene === '09'" @nextpage="setScene('10')" @pausethemesong="pauseThemeSong" @togglescroll="toggleScrollIcon"/>

    <Scene10 v-if="currentScene === '10'" @nextpage="setScene('12')" @themesong="playThemeSong" @soundeffect="playSoundEffect" @pauseeffect="pauseSoundEffect" @togglescroll="toggleScrollIcon"/>

    <Scene11 v-if="currentScene === '11'" @nextpage="setScene('12')"/>

    <Scene12 v-if="currentScene === '12'" @nextpage="setScene('13')"/>

    <Scene13 v-if="currentScene === '13'" @nextpage="setScene('14')"/>

    <Scene14 v-if="currentScene === '14'" @nextpage="setScene('15')"/>

    <Scene15 v-if="currentScene === '15'" @nextpage="setScene('16')" @togglescroll="toggleScrollIcon"/>

    <Scene16test v-if="currentScene === '16'" @nextpage="setScene('17')" @togglescroll="toggleScrollIcon"/>

    <Scene17 v-if="currentScene === '17'"/>

  </section>
</template>

<script setup>
//head
useHead({
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "./images/icon/logo.png",
    },
  ],
  title: "Chubby",
});

//use image preloader
const { images } = useImagePreloader();
provide("preloaded", images);

//scenes management
const currentScene = ref('14');

function setScene(sceneName) {
  currentScene.value = sceneName;
}

//scroll icon
const isShowScrollIcon = ref(false)

function toggleScrollIcon() {
  isShowScrollIcon.value = !isShowScrollIcon.value
}

//sounds management
const SoundState = ref('off')

function toggleSound() {
  SoundState.value == 'off' ? SoundState.value = 'on' : SoundState.value = 'off'
  console.log(SoundState.value)
}

watch(SoundState, (State) => {
  if (State == 'off') {
    pauseThemeSong();
  }
});

//theme songs
const themesong = ref(null);
const currentThemeSong = ref('main')

function playThemeSong(sound) {
  if (SoundState.value == 'off') return;
  currentThemeSong.value = sound;
  nextTick(() => {
    themesong.value.load();
    themesong.value.play();
  });
  if (sound == 'main') {
    themesong.value.volume = 0.05;
  }
  else {
    themesong.value.volume = 0.025;
  }
};

function pauseThemeSong() {
  themesong.value.pause();
};

//sound effects
const soundeffects = ref(null)
const currentSoundEffect = ref('')

function playSoundEffect(sound) {
  if (SoundState.value == 'off') return;
  currentSoundEffect.value = sound;
  nextTick(() => {
    soundeffects.value.load();
    soundeffects.value.play();
  });
};

function pauseSoundEffect() {
  soundeffects.value.pause();
};

</script>

<style>
* {
  cursor: url('/cursor/NH32-32-s.png') 32 20, auto !important;
}

.cursor-pointer {
  cursor: url('/cursor/H32-32-s.png') 32 20, pointer !important;
}

.cursor-arrow {
  cursor: url('/cursor/webarrow2.png') 10 10, pointer !important;
}

body {
  overflow: hidden;
  font-family: "Kanit", serif;
}

img {
  -webkit-user-drag: none;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: none;
}

::-webkit-scrollbar {
  display: none;
}

/* general animations */
/* fades */
@keyframes fade {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.fade-out {
  animation: fade 0.7s ease forwards;
}

.fade-in {
  animation: fade 0.7s reverse ease forwards;
}

/* fades scroll */
@keyframes fade-scroll-in {
  0% {
    opacity: 0;
    transform: translateY(40%);
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}

@keyframes fade-scroll-out {
  0% {
    opacity: 1;
    transform: translateY(0%);
  }

  100% {
    opacity: 0;
    transform: translateY(-40%);
  }
}

.fade-scr-in {
  animation: fade-scroll-in 1.2s ease-in-out forwards;
}

.fade-scr-out {
  animation: fade-scroll-out 1.2s ease-in-out forwards;
}

/* text bubbles */
@keyframes text-bubble {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.05);
  }
}

.text-bubble {
  animation: text-bubble 1.2s infinite alternate ease-in-out;
}

.text-bubble-r {
  animation: text-bubble 1.2s infinite alternate-reverse ease-in-out;
}
</style>
