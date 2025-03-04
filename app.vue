<template>
  <section class="flex h-screen w-screen bg-black place-items-center justify-center">

    <Scene00 v-if="currentScene === '00'" @start="setScene('01')"></Scene00>

    <Scene01 v-if="currentScene === '01'" @nextpage="setScene('02')" @togglescroll="toggleScrollIcon"></Scene01>

    <Scene02 v-if="currentScene === '02'" @nextpage="setScene('03')" @togglescroll="toggleScrollIcon"></Scene02>

    <Scene03 v-if="currentScene === '03'" @nextpage="setScene('04')"></Scene03>

    <Scene04 v-if="currentScene === '04'" @nextpage="setScene('05')" @togglescroll="toggleScrollIcon"></Scene04>

    <Scene05 v-if="currentScene === '05'" @nextpage="setScene('06')"></Scene05>

    <Scene06 v-if="currentScene === '06'" @nextpage="setScene('07')"></Scene06>

    <Scene07 v-if="currentScene === '07'" @nextpage="setScene('08')" @togglescroll="toggleScrollIcon"></Scene07>

    <Scene08 v-if="currentScene === '08'" @nextpage="setScene('10')" @togglescroll="toggleScrollIcon"></Scene08>

    <Scene09 v-if="currentScene === '09'" @nextpage="setScene('10')"></Scene09>

    <Scene10 v-if="currentScene === '10'" @nextpage="setScene('12')" @togglescroll="toggleScrollIcon"></Scene10>

    <Scene11 v-if="currentScene === '11'" @nextpage="setScene('12')"></Scene11>

    <Scene12 v-if="currentScene === '12'" @nextpage="setScene('13')"></Scene12>

    <Scene13 v-if="currentScene === '13'" @nextpage="setScene('14')"></Scene13>

    <Scene14 v-if="currentScene === '14'" @nextpage="setScene('15')"></Scene14>

    <Scene15 v-if="currentScene === '15'" @nextpage="setScene('16')" @togglescroll="toggleScrollIcon"></Scene15>

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
    <div ref="cursor" class="custom-cursor">
      <img :src="currentCursor" width="60%">
    </div>
  </section>
</template>

<script setup>
const isShowScrollIcon = ref(false)

function toggleScrollIcon() {
  isShowScrollIcon.value = !isShowScrollIcon.value
}

//use image preloader
const { images } = useImagePreloader();
provide("preloaded", images);

// Refs to manage cursor and its state
const cursor = ref(null);
const isPointer = ref(false);
const currentCursor = ref('/cursor/NH32-32.png');

// Watch the pointer state to change cursor image
watch(isPointer, (newValue) => {
  if (newValue) {
    if (currentCursor.value != '/cursor/H32-32.png') {
      currentCursor.value = '/cursor/H32-32.png';
    }
  } else {
    if (currentCursor.value != '/cursor/NH32-32.png') {
      currentCursor.value = '/cursor/NH32-32.png';
    }
  }
});

// Update cursor position and type efficiently
const updateCursor = (e) => {
  const percentX = (e.clientX / window.innerWidth) * 100;
  const percentY = (e.clientY / window.innerHeight) * 100;

  if (cursor.value) {
    cursor.value.style.left = `${percentX + 2}%`;
    cursor.value.style.top = `${percentY}%`;
  }

  // Check if the mouse is over an element with cursor-pointer
  const element = document.elementFromPoint(e.clientX, e.clientY);
  if (element && element.classList.contains('cursor-pointer')) {
    isPointer.value = true;
  } else {
    isPointer.value = false;
  }
};

onMounted(() => {
  // Handle the cursor movement in an efficient manner using requestAnimationFrame
  const moveCursor = (e) => {
    requestAnimationFrame(() => updateCursor(e));
  };

  // Add event listener for mousemove
  document.addEventListener('mousemove', moveCursor);

  // Handle hover events using mouseenter/mouseleave
  const elementsWithPointer = document.querySelectorAll('.cursor-pointer');

  elementsWithPointer.forEach(element => {
    element.addEventListener('mouseenter', () => {
      isPointer.value = true;
    });

    element.addEventListener('mouseleave', () => {
      isPointer.value = false;
    });
  });
});

// Clean up event listeners when the component is unmounted
onUnmounted(() => {
  document.removeEventListener('mousemove', moveCursor);
});

//font Kanit
useHead({
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "./images/icon/logo.png",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap",
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
  cursor: none !important;
}

body {
  overflow: hidden;
  font-family: "Kanit", serif;
}

.custom-cursor {
    position: fixed;
    width: 10%;
    height: 10%;
    /* background: url('/cursor/H32-32.svg') no-repeat center;
    background-size: cover; */
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
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
