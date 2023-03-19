<template>
    <div class="sidebar" :class="{ 'sidebar-open': isOpen }">
        <slot></slot>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Sidebar',
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
});
</script>
  
<style>
.sidebar {
    position: fixed;
    top: 0;
    right: -300px;
    width: 300px;
    height: 100%;
    background-color: #353535;
    color: #f7f7f7;
    transition: right 0.3s ease-in-out;
    margin-top: 64px;
}

.sidebar-open {
    right: 0;
}
</style>
  