<template>
    <button class="cursor-arrow transition-transform duration-200">
        <slot></slot>
    </button>
</template>

<script setup>

</script>

<style scoped>
button {
    transform: scale(1);
}
button:hover {
    transform: scale(1.2);
}
</style>