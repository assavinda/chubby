<template>
    <GeneralContainer>
        <section id="save" class="absolute top-0 left-0 w-full h-full">
            <section>
                <div class="absolute top-0 left-0">
                    <img :src="images['17-bg-01.png']">
                </div>
                <div class="absolute top-[2%] left-[8%] w-[35%]">
                    <img :src="dressingImage">
                </div>
                <div class="absolute top-0 left-0">
                    <img :src="images[`17-${postitColors[currentPostitIndex]}-02.png`]">
                </div>
                <div class="absolute top-[25%] right-[12.3%] w-[27%] h-[40%]">
                    <div class="relative w-full h-full flex justify-center place-items-center">
                        <textarea 
                            v-model="inputText" 
                            @input="adjustHeight($event)"
                            ref="autoTextarea"
                            class="w-[90%] min-h-[10%] max-h-[100%] merry text-center text-white responsive-text focus:outline-none focus:ring-0 resize-none break-words overflow-hidden"
                        ></textarea>
                    </div>
                </div>
                <div @click="currentPostitIndex < 2 ? currentPostitIndex += 1 : currentPostitIndex = 0" class="absolute bottom-[10.6%] right-[16.8%] w-[5.5%]">
                    <GeneralButton>
                        <img :src="images['17-heart-01.png']">
                    </GeneralButton>
                </div>
                <div @click="saveAsPNG" class="absolute bottom-[11.1%] right-[10.8%] w-[5.5%]">
                    <GeneralButton>
                        <img :src="images['17-share-01.png']">
                    </GeneralButton>
                </div>
            </section>
            
            <section class="absolute top-0 left-0" :class="isCredit ? '' : 'hidden' ">
                <div>
                    <img :src="images['17-credit.png']">
                </div>
                <div @click="reloadPage" class="absolute bottom-[12.6%] right-[10.4%] w-[5.5%]">
                    <GeneralButton>
                        <img :src="images['17-home-01.png']">
                    </GeneralButton>
                </div>
            </section>

            <div class="absolute top-[30%] right-0 w-[8.5%] h-[41%]">
                <div class="relative flex flex-col h-full w-full">
                    <div @click="isCredit = true" class="w-full h-full cursor-pointer"></div>
                    <div @click="isCredit = false" class="w-full h-full cursor-pointer"></div>
                </div>
            </div>
        </section>

        <section class="absolute bottom-[1.6%] right-[0.8%] w-[6.5%]">
            <GeneralButton>
                <img :src="images['17-arrow-01.png']">
            </GeneralButton>
        </section>

        <!-- fg fade in -->
        <div class="absolute top-0 left-0 w-full h-full bg-wall z-[202] fade-out pointer-events-none"></div>

    </GeneralContainer>
</template>

<script setup>
import html2canvas from 'html2canvas';

const images = inject("preloaded");
let dressingImage = localStorage.getItem('dressingImage');
const inputText = ref('');
const autoTextarea = ref(null);

const postitColors = ['pk','pa','bu']
const currentPostitIndex = ref(0)

const isCredit = ref(false)

function reloadPage() {
    window.location.reload()
}

const adjustHeight = (event) => {
    const textarea = event.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
};

onMounted(() => {
    if (autoTextarea.value) {
        adjustHeight({ target: autoTextarea.value });
    }
});

//save
function saveAsPNG() {
    const element = document.getElementById("save");
    
    if (element) {
        
        const scaleFactor = 6;

        html2canvas(element, {
            scale: scaleFactor,
        }).then((canvas) => {
            
            const dataUrl = canvas.toDataURL("image/png");

            
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'YourChubby.png'; 
            link.click();
        }).catch((error) => {
            console.error('Error:', error);
        });
    } else {
        console.error("Error");
    }
}
</script>

<style scoped>
.responsive-text {
    font-size: 3.62666666vh;
}

@media (max-aspect-ratio: 16/9) {
    .responsive-text {
        font-size: 2.04vw;
    }
}

.merry {
    font-family: "merry", serif;
}
</style>