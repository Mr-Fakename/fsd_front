<template>
    <div class="main">
        <div class="actions">
            <NuxtLink to="/dev-log/create" v-if="checkAuth()">New Post</NuxtLink>
        </div>
        <div class="card-wrapper">
            <article class="card" v-for="post in data" :key="post.id" :style="{ backgroundImage: 'url(' + post.image + ')'}">
                <div class="image-mask"></div>
                <h1 class="title">{{ post.title }}</h1>
                <p class="body">{{ post.body }}</p>
                <NuxtLink :to="'/dev-log/' + post.id">Read more</NuxtLink>
            </article>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
const { data: userData, status } = useSession()

const config = useRuntimeConfig();
const { data } = await useFetch(
    config.API_BASE_URL + 'blog/posts/',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
)

onMounted(() => {
    const cards = document.querySelectorAll<HTMLElement>('.card')
    cards.forEach((card) => {
        card.onmousemove = e => handleOnMouseMove(e);

    })
})
const handleOnMouseMove = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    target.style.setProperty('--mouse-x', x + 'px')
    target.style.setProperty('--mouse-y', y + 'px')
}

function checkAuth() {
    // @ts-ignore
    return status?.value === 'authenticated' && userData?.value?.user.admin
}

</script>

<style scoped lang="scss">
div.main {
    min-height: 100vh;
    overflow: hidden;
    padding: 10vh;
    background-color: rgb(20, 20, 20);
    color: white;

    .actions {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 2em;

        a {
            padding: 1em 2em;
            border: 1px solid white;
            border-radius: 5px;
            text-decoration: none;
            color: white;
            transition: all .3s ease;
            &:hover {
                background-color: white;
                color: black;
            }
        }
    }

    .card-wrapper {
        padding: 2em;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .card {
        border: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        padding: 1em;
        margin: 0;
        border-radius: 5px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
        height: 250px;
        width: 250px;
        overflow: clip;
        position: relative;

        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-clip: padding-box;

        &:hover {
            &::before {
                opacity: 1;
            }
        }

        &::before {
            border-radius: inherit;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
            content: "";
            position: absolute;
            background: radial-gradient(
                    circle at var(--mouse-x) var(--mouse-y),
                    rgba(255, 255, 255, 0.1) 0%,
                    rgba(255, 255, 255, 0) 70%
            );
            z-index: 10;
            opacity: 0;
            transition: opacity 0.2s ease-in-out;
        }

        .title {
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: 1rem;
            position: relative;
        }

        .body {
            width: 80%;
            text-align: left;
            font-size: 1.2rem;
            font-weight: 300;
            line-height: 1.5;
            margin: 0 auto;
            transition: transform .3s ease;
            position: relative;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
        }

        .image-mask {
            position: absolute;
            overflow: hidden;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: rgba(0, 0, 0, 0.65);
            z-index: 0;
        }

        a {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center;
            padding: 1rem 0;
            background: linear-gradient(
                    180deg,
                    rgba(0, 0, 0, 0.85) 0%,
                    rgba(0, 0, 0, 0.35) 100%
            );
            color: white;
            text-decoration: none;
            text-transform: uppercase;
            transition: all .3s ease;
            font-size: 1rem;
            z-index: 10;
        }
    }
}
</style>