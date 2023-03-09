<template>
    <nav class="navbar">
        <NuxtLink to="/">
            <img src="../assets/images/logo.svg" alt="logo" class="logo">
        </NuxtLink>
        <button class="toggle"></button>
        <div class="inner-nav">
            <button class="toggle"></button>
            <NuxtLink to="/setup" v-if="status === 'authenticated'">My Setups</NuxtLink>
            <NuxtLink to="/about">About</NuxtLink>
            <NuxtLink to="/dev-log">Blog</NuxtLink>
            <NuxtLink v-if="status !== 'authenticated'" to="/login">Login</NuxtLink>
            <a v-if="status === 'authenticated'" @click="signOut({ callbackUrl: '/' })">Logout</a>
        </div>
    </nav>

    <main>
        <slot />
    </main>
</template>

<script setup lang="ts">

const { status, data, signOut } = useSession();
import { onMounted } from "vue";

onMounted(() => {
    const innerNav = document.querySelectorAll('.inner-nav')[0];
    const toggle = document.querySelectorAll('.toggle');

    toggle.forEach((button) => {
        button.addEventListener('click', () => {
            innerNav.classList.toggle('active');
        })
    })

    innerNav.addEventListener('click', () => {
        innerNav.classList.remove('active');
    })
})

</script>

<style scoped lang="scss">
nav {
    z-index: 999;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    width: 100%;
    height: 10vh;
    background: linear-gradient(to bottom, black, transparent);

    & > a:first-of-type {
        padding: 0;
    }

    .logo {
        max-height: 10vh;
    }

    .toggle {
        display: none;
        width: 2rem;
        height: 2rem;
        border: none;
        background: transparent;
        cursor: pointer;
        transition: all 200ms ease-in-out;

        &::before,
        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            background: white;
            transition: all 200ms ease-in-out;
        }

        &::before {
            transform: translateY(-5px);
        }

        &::after {
            transform: translateY(5px);
        }

        @media (max-width: 700px) {
            display: block;
        }
    }

    .inner-nav {
        display: flex;
        gap: 1rem;
        transition: all 200ms ease-in-out;

        @media (max-width: 700px) {

            &.active {
                display: inherit;
            }

            display: none;
            flex-direction: column;
            align-items: flex-end;
            position: absolute;
            top: 0;
            right: 0;
            width: 100%;
            height: 100vh;
            padding: 1rem;
            gap: 2rem;
            background: linear-gradient(to bottom, black, transparent);
        }
    }
}

a {
    color: white;
    padding: 1rem 2rem;
    text-decoration: none;
    text-transform: uppercase;
    transition: all .3s ease;
    font-size: 1rem;
    cursor: pointer;
}
</style>
