<template>
    <GeneralContainer>
        <div class="absolute top-0 left-0 w-[30%]">
            <img :src="dressingImage">
        </div>
    </GeneralContainer>
</template>

<script setup>
let dressingImage = localStorage.getItem('dressingImage')
</script>

<style scoped>

</style>