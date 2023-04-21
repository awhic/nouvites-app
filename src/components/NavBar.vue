<template>
    <nav class="navbar" :class="{ 'navbar--open': isOpen }">
        <div class="navbar__title">
            {{ title }}
            <span class="navbar_pronunciation"> {{ pronunciation }}</span>
        </div>
        <div class="navbar__hamburger" @click="toggleHamburger">
            <div class="navbar__hamburger-line"></div>
            <div class="navbar__hamburger-line"></div>
            <div class="navbar__hamburger-line"></div>
        </div>
    </nav>
    <SideBar :is-open="isOpen">
        <Preferences />
    </SideBar>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Preferences from './Settings.vue';
import SideBar from './SideBar.vue';

export default defineComponent({
    name: "NavBar",
    props: {
        title: {
            type: String,
            default: "NouVites"
        },
        pronunciation: {
            type: String,
            default: "(noo-veets)"
        }
    },
    setup(props) {
        const isOpen = ref(false);
        const toggleHamburger = () => {
            isOpen.value = !isOpen.value;
        };
        return {
            isOpen,
            toggleHamburger
        };
    },
    components: { SideBar, Preferences }
});
</script>
  
<style scoped>
.navbar {
    background-color: #41b883;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
    padding: 0 16px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.navbar__title {
    color: #fff;
    font-family: Arial, sans-serif;
    font-size: 24px;
    font-weight: bold;
}

.navbar__hamburger {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 24px;
    width: 30px;
    z-index: 2;
}

.navbar__hamburger-line {
    background-color: #fff;
    height: 3px;
    transition: all 0.3s ease-in-out;
}

.navbar--open .navbar__hamburger-line:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.navbar--open .navbar__hamburger-line:nth-child(2) {
    opacity: 0;
}

.navbar--open .navbar__hamburger-line:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

.navbar_pronunciation {
    color: rgba(255, 255, 255, 0.6);
    font-family: Arial, sans-serif;
    font-size: 18px;
    margin-left: 4px;
    vertical-align: middle;
}
</style>
  