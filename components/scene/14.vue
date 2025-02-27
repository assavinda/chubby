<template>
    <ElementContainer>
        <div class="absolute top-0 left-0">
            <img :src="images['14-m1-01.png']">
        </div>

        <div class="absolute top-[12.4%] left-[42%] w-[5%] lamp">
            <img :src="images['14-lamp.png']">
        </div>

        <div class="absolute top-[12.4%] right-[1.35%] w-[5%] lamp">
            <img :src="images['14-lamp.png']">
        </div>

        <!-- Select menu -->
        <div class="absolute top-0 left-0">
            <img :src="images[`14-menu-${currentCategory}.png`]">

            <div class="absolute flex top-[5%] right-[3.7%] w-[52%] h-[8%] wearing z-[100]">
                <div v-for="section in Object.keys(categorydict)" @click="setCategory(section)" class="w-full h-full cursor-pointer">

                </div>
            </div>

            <div class="absolute grid grid-cols-3 grid-rows-3 gap-[6.8%] pr-[1.5%] pl-[1.1%] pt-[1.4%] pb-[0.5%] top-[14.3%] right-[7.8%] w-[43.6%] h-[80%] z-[100]">
                <div v-for="(zindex, item) in categorydict[currentCategory]" @click="setItem(currentCategory,item,zindex)" class="w-full h-full rounded-[15%] cursor-pointer" :class="Object.keys(selectedItems[currentCategory]).includes(item) ? 'blur-[2px] opacity-15 bg-amber-500' : '' ">

                </div>
            </div>

            <div class="absolute top-[10.5%] left-[31%] w-[7%] h-[11%]  z-[100]">
                <div v-for="skin in skins" @click="setSkin(skin); console.log(currentSkin)" class="w-full h-full cursor-pointer">

                </div>
            </div>
        </div>

        <!-- Button -->
        <div class="absolute bottom-[5.5%] right-[1%] z-[101] w-[6.3%] cursor-pointer hover:scale-[1.2]">
            <ElementButtonRight @click="nextgame()">
                <img :src="images['14-button.png']">
            </ElementButtonRight>
        </div>

        <!-- Body -->
        <div class="absolute top-0 left-0">
            <img :src="images[`14-body-${currentSkin}.png`]">
        </div>

        <!-- Items -->
        <div class="absolute top-0 left-0 w-full h-full">
            <div ref="wearingItemsBox" class="relative w-full h-full">
                <div v-if="Object.keys(selectedItems['hair']).includes('07')" class="absolute top-0 left-0 w-full h-full z-[90]">
                    <img :src="images[`14-hair-07-p.png`]">
                </div>
                <div v-else-if="Object.keys(selectedItems['hair']).includes('06')" class="absolute top-0 left-0 w-full h-full z-[90]">
                    <img :src="images[`14-hair-06-p.png`]">
                </div>
                <div v-for="(items, category) in selectedItems" :key="category" class="absolute top-0 left-0 w-full h-full">
                    <div v-for="(zindex,item) in items" :key="item" class="absolute top-0 left-0" :style="{ zIndex: zindex}">
                        <img :src="images[`14-${category}-${item}.png`]">
                    </div>
                </div>
            </div>
        </div>

        <!-- curtain -->
        <div ref="curtainBox" @click="animateCurtain" class="absolute top-0 left-0 z-[200] transition-all duration-500 cursor-pointer">
            <img class="curtain" ref="curtain" :src="images[currentCurtainFrame]">
        </div>

        <!-- fg fade out -->
        <div @animationstart="$emit('togglescroll')" @animationend="$emit('nextpage')" class="absolute top-0 left-0 w-full h-full bg-wall z-[201]" :class="isGoingToNext ? 'fade-in' : 'opacity-0 pointer-events-none' " ></div>

        <!-- fg fade in -->
        <div class="absolute top-0 left-0 w-full h-full bg-wall z-[201] fade-out pointer-events-none"></div>

    </ElementContainer>
</template>

<script setup>
const images = inject("preloaded");
const isGoingToNext = ref(false)
const currentLayerType = ref(1)
const wearingItemsBox = ref(null)
const categorydict = ref({})
const categoryType1 = {
    'eyes':{
        '01':'15',
        '02':'15',
        '03':'15',
        '04':'15',
        '05':'15',
        '06':'15'
    },
    'mouth':{
        '01':'14',
        '02':'14',
        '03':'14',
        '04':'14',
        '05':'14'
    },
    'hair':{
        '01':'8',
        '02':'8',
        '03':'8',
        '04':'8',
        '05':'2',
        '06':'2',
        '07':'2',
        '08':'8'
    },
    'clothes':{
        '01':'3',
        '02':'3',
        '03':'3',
        '04':'3',
        '05':'7'
    },
    'trousers':{
        '01':'6',
        '02':'6',
        '03':'6',
        '04':'6',
        '05':'6'
    },
    'dresses':{
        '01':'7',
        '02':'7',
        '03':'1',
        '04':'7'
    },
    'shoes':{
        '01':'1',
        '02':'1',
        '03':'1',
        '04':'1',
        '05':'1'
    },
    'accessories':{
        '01':'11',
        '02':'10',
        '03':'5',
        '04':'9',
        '05':'13',
        '06':'4',
        '07':'12'
    }
}
const categoryType2 = {
    'eyes':{
        '01':'16',
        '02':'16',
        '03':'16',
        '04':'16',
        '05':'16',
        '06':'16'
    },
    'mouth':{
        '01':'15',
        '02':'15',
        '03':'15',
        '04':'15',
        '05':'15'
    },
    'hair':{
        '01':'8',
        '02':'8',
        '03':'8',
        '04':'8',
        '05':'1',
        '06':'1',
        '07':'1',
        '08':'8'
    },
    'clothes':{
        '01':'1',
        '02':'1',
        '03':'1',
        '04':'1',
        '05':'1'
    },
    'trousers':{
        '01':'1',
        '02':'1',
        '03':'1',
        '04':'1',
        '05':'1'
    },
    'dresses':{
        '01':'1',
        '02':'1',
        '03':'4',
        '04':'1'
    },
    'shoes':{
        '01':'6',
        '02':'6',
        '03':'6',
        '04':'6',
        '05':'6'
    },
    'accessories':{
        '01':'11',
        '02':'10',
        '03':'3',
        '04':'9',
        '05':'13',
        '06':'7',
        '07':'12'
    }
}
const selectedItems = ref({
    eyes: {},
    mouth: {},
    hair: {},
    clothes: {},
    trousers: {},
    dresses: {},
    shoes: {},
    accessories: {}
});
const skins = ['body01','body02','body03']

const currentCategory = ref('eyes')
const currentSkin = ref('body01')

watch(currentLayerType, (newValue) => {
    const previousSelections = JSON.parse(JSON.stringify(selectedItems.value));

    Object.keys(selectedItems.value).forEach(category => {
        selectedItems.value[category] = {}; 
    });

    categorydict.value = newValue === 1 ? { ...categoryType1 } : { ...categoryType2 };

    for (const category in previousSelections) {
        for (const item in previousSelections[category]) {
            const newZIndex = categorydict.value[category]?.[item];
            if (newZIndex) {
                selectedItems.value[category][item] = newZIndex;
            }
        }
    }

    selectedItems.value = { ...selectedItems.value };

}, { immediate: true });


function setCategory(categoryName) {
    currentCategory.value = categoryName
}

function setSkin(skin) {
    currentSkin.value = skin
}

function setItem(category, item , zindex) {
    //check if it's pink dress
    if (category == 'dresses' && item == '03') {
        //check if there already has the same item then delete it
        if(Object.keys(selectedItems.value[category]).includes(item)) {
            delete selectedItems.value[category][item]
            currentLayerType.value = 1
            console.log('type = ', currentLayerType.value)
        }
        else {
            currentLayerType.value = 2
            console.log('type = ', currentLayerType.value)
            selectedItems.value['clothes'] = {}
            selectedItems.value['dresses'] = {}
            selectedItems.value['trousers'] = {}
            //add item
            selectedItems.value[category] = Object.assign({}, selectedItems.value[category], { [item]: zindex });
        }
    }
    else {
        //check if there already has the same item then delete it
        if(Object.keys(selectedItems.value[category]).includes(item)) {
            delete selectedItems.value[category][item]
        }
        else {
            //check if current layer type is 2
            if (currentLayerType.value == 2) {
                //check if it's clothes trousers dresses
                if (category == 'clothes' || category == 'dresses' || category == 'trousers') {
                    currentLayerType.value = 1
                    delete selectedItems.value['dresses']['03']
                    console.log('type = ', currentLayerType.value, category)
                    //add item
                    selectedItems.value[category] = Object.assign({}, selectedItems.value[category], { [item]: zindex });
                }
                else {
                    if (category == 'hair') {
                        selectedItems.value['hair'] = {}
                    }
                    //check if it's the same z-index then delete the other
                    if (Object.values(selectedItems.value).some(items => Object.values(items).includes(zindex))) {
                        for (const cat in selectedItems.value) {
                            for (const key in selectedItems.value[cat]) {
                                if (selectedItems.value[cat][key] === zindex) {
                                    delete selectedItems.value[cat][key];
                                }
                            }
                        }
                        //add item
                        selectedItems.value[category] = Object.assign({}, selectedItems.value[category], { [item]: zindex });
                    }
                    else {
                        //add item
                        selectedItems.value[category] = Object.assign({}, selectedItems.value[category], { [item]: zindex });
                    }
                }
            }
            else {
                if (category == 'dresses') {
                    selectedItems.value['clothes'] = {}
                    selectedItems.value['trousers'] = {}
                }
                else if (category == 'trousers' || category == 'clothes') {
                    selectedItems.value['dresses'] = {}
                }
                else if (category == 'hair') {
                    selectedItems.value['hair'] = {}
                }

                //check if it's the same z-index then delete the other
                if (Object.values(selectedItems.value).some(items => Object.values(items).includes(zindex))) {
                    for (const cat in selectedItems.value) {
                        for (const key in selectedItems.value[cat]) {
                            if (selectedItems.value[cat][key] === zindex) {
                                delete selectedItems.value[cat][key];
                            }
                        }
                    }
                    //add item
                    selectedItems.value[category] = Object.assign({}, selectedItems.value[category], { [item]: zindex });
                }
                else {
                    //add item
                    selectedItems.value[category] = Object.assign({}, selectedItems.value[category], { [item]: zindex });
                }
            }
        }
    }
}

const curtain = ref(null)
const curtainBox = ref(null)
const currentCurtainFrame = ref('14-curtain-c1_10.png')
let c = 0

function animateCurtain() {
    if (!curtain.value) return
    curtainBox.value.classList.add('pointer-events-none')
    function step() {
        if (c < 60) {
            currentCurtainFrame.value = `14-curtain-c1_1${c}.png`
            c++
            setTimeout(step, 40)
        } else {
            curtain.value.classList.add('hidden')
        }
    }

    step()
}


function nextgame() {
    if (!curtain.value) return
    c = 60
    curtain.value.classList.remove('hidden')
    function step() {
        if (c >= 0) {
            currentCurtainFrame.value = `14-curtain-c1_1${c}.png`
            c--
            setTimeout(step, 40)
        }
        else {
            setTimeout(() => {
                isGoingToNext.value = true
            },700)
        }
    }
    step()
}
</script>

<style scoped>

@keyframes lamp {
    0% {
        rotate: -10deg;
    }
    100% {
        rotate: 10deg;
    }
}
.lamp {
    animation: lamp alternate infinite 1.2s ease-in-out;
    transform-origin: top;
}
</style>