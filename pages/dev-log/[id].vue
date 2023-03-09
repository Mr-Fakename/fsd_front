<template>
    <div class="main">
        <div v-if="error">
            <h1>Error</h1>
            <p>{{ error?.value }}</p>
        </div>
        <article v-else :style="{ backgroundImage: 'url(' + data.image + ')'}">
        <div class="actions">
            <a v-if="checkAuth()" @click="deletePost()">Delete Post</a>
        </div>

        <div class="image-mask"></div>
        <h1 class="title">{{ data.title }}</h1>
        <p class="body">{{ data.body }}</p>
        </article>
    </div>
</template>

<script setup lang="ts">
const { data: userData, status } = useSession()
const route = useRoute()
const config = useRuntimeConfig();


const {data, error} = await useFetch(
    config.API_BASE_URL + 'blog/posts/' + route.params.id + '/',
    {
        headers: {
            'Content-Type': 'application/json',
        },
    }
)
if (error) {
    if (error?.value?.name === 'FetchError') {
        navigateTo('/dev-log')
    }
}

async function deletePost() {
    const json = JSON.parse(JSON.stringify(userData?.value, undefined, 4))
    const jwt = json.access

    const {data, error} = await useFetch(
        config.API_BASE_URL + 'blog/posts/' + route.params.id + '/',
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt,
            },
        }
    )

    navigateTo('/dev-log')
}

function checkAuth() {
    // @ts-ignore
    return status?.value === 'authenticated' && userData?.value?.user.admin
}

</script>

<style scoped lang="scss">
div.main {
    padding: 0;

    h1 {
        font-size: 3em;
        font-weight: 700;
        margin-bottom: 0.5em;
    }

    .actions {
        position: relative;
        z-index: 999;
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
            cursor: pointer;
            &:hover {
                background-color: white;
                color: black;
            }
        }
    }

    article {
        padding: calc(10vh + 5em) 5em;
        min-height: 100vh;
        width: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

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

        .title {
            position: relative;
            font-size: 3em;
            font-weight: 700;
            margin-bottom: 0.5em;
        }

        .body {
            position: relative;
            font-size: 1.5em;
            font-weight: 400;
            margin-bottom: 0.5em;
            line-height: 1.4;
        }
    }
}
</style>