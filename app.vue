<template>
  <section class="flex h-screen w-screen bg-black place-items-center justify-center">

    <Scene00 v-if="currentScene === '00'" @start="setScene('01')" @themesong="playThemeSong" @pausethemesong="pauseThemeSong"></Scene00>

    <Scene01 v-if="currentScene === '01'" @nextpage="setScene('02')" @togglescroll="toggleScrollIcon"></Scene01>

    <Scene02 v-if="currentScene === '02'" @nextpage="setScene('03')" @togglescroll="toggleScrollIcon"></Scene02>

    <Scene03 v-if="currentScene === '03'" @nextpage="setScene('04')" @soundeffect="playSoundEffect"></Scene03>

    <Scene04 v-if="currentScene === '04'" @nextpage="setScene('05')" @togglescroll="toggleScrollIcon"></Scene04>

    <Scene05 v-if="currentScene === '05'" @nextpage="setScene('06')"></Scene05>

    <Scene06 v-if="currentScene === '06'" @nextpage="setScene('07')" @soundeffect="playSoundEffect"></Scene06>

    <Scene07 v-if="currentScene === '07'" @nextpage="setScene('08')" @soundeffect="playSoundEffect" @pauseeffect="pauseSoundEffect" @togglescroll="toggleScrollIcon"></Scene07>

    <Scene08 v-if="currentScene === '08'" @nextpage="setScene('09')" @togglescroll="toggleScrollIcon"></Scene08>

    <Scene09 v-if="currentScene === '09'" @nextpage="setScene('10')" @pausethemesong="pauseThemeSong" @togglescroll="toggleScrollIcon"></Scene09>

    <Scene10 v-if="currentScene === '10'" @nextpage="setScene('12')" @themesong="playThemeSong" @soundeffect="playSoundEffect" @pauseeffect="pauseSoundEffect" @togglescroll="toggleScrollIcon"></Scene10>

    <Scene11 v-if="currentScene === '11'" @nextpage="setScene('12')"></Scene11>

    <Scene12 v-if="currentScene === '12'" @nextpage="setScene('13')"></Scene12>

    <Scene13 v-if="currentScene === '13'" @nextpage="setScene('14')"></Scene13>

    <Scene14 v-if="currentScene === '14'" @nextpage="setScene('15')"></Scene14>

    <Scene15 v-if="currentScene === '15'" @nextpage="setScene('16')" @togglescroll="toggleScrollIcon"></Scene15>

    <Scene16 v-if="currentScene === '16'" @nextpage="setScene('17')" @togglescroll="toggleScrollIcon"></Scene16>

    <Scene17 v-if="currentScene === '17'"></Scene17>

    <div class="absolute pointer-events-none z-[100] transition-opacity duration-300" :class="isShowScrollIcon ? 'opacity-100' : 'opacity-0' ">
      <section class="relative w-fit h-fit overflow-hidden">
        <!-- bg holder -->
        <div>
            <img :src="images['00-cover00.png']" class="max-w-screen max-h-screen object-contain opacity-0">
        </div>

        <!-- scroll icon -->
        <GeneralScrIcon/>
      </section>
    </div>

    <div class="absolute top-0 left-0">
        <audio ref="themesong" loop>
          <source :src="`./sounds/${currentThemeSong}.mp3`" type="audio/mpeg">
        </audio>
    </div>

    <div v-if="currentSoundEffect != ''" class="absolute top-0 left-0">
        <audio ref="soundeffects">
          <source :src="`./sounds/effects/${currentSoundEffect}.mp3`" type="audio/mpeg">
        </audio>
    </div>

  </section>
</template>

<script setup>
const isShowScrollIcon = ref(false)

function toggleScrollIcon() {
  isShowScrollIcon.value = !isShowScrollIcon.value
}

const themesong = ref(null);
const currentThemeSong = ref('main')
const soundeffects = ref(null)
const currentSoundEffect = ref('')

function playThemeSong(sound) {
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
  console.log('pause')
  themesong.value.pause();
};

function playSoundEffect(sound) {
  currentSoundEffect.value = sound;
  nextTick(() => {
    soundeffects.value.load();
    soundeffects.value.play();
  });
};

function pauseSoundEffect() {
  console.log('pause')
  soundeffects.value.pause();
};

//use image preloader
const { images } = useImagePreloader();
provide("preloaded", images);

//font Kanit
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

//--SCENES MANAGEMENT--

//current scene (state)
const currentScene = ref('00');

//set scene function
function setScene(sceneName) {
  currentScene.value = sceneName;
}
</script>

<style>

* {
  cursor: url('/cursor/NH32-32-s.png') 35 50, auto !important;
}

.cursor-pointer {
  cursor: url('/cursor/H32-32-s.png') 35 50, pointer !important;
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
