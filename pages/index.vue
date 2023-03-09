<template>
    <main>
        <div class="container">
            <div class="feature grid-item-1">
                <img alt=""
                     class="feature-img"
                     src="../assets/images/plant_grid_1.jpg"
                >
                <div class="content">
                    <h3>The project</h3>
                    <NuxtLink to="/about">Learn More</NuxtLink>
                </div>
            </div>

            <div class="feature grid-item-2">
                <img alt=""
                     class="feature-img"
                     src="../assets/images/plant_grid_2.jpg"
                >
                <div class="content">
                    <h3>Dev log</h3>
                    <NuxtLink to="/dev-log">Learn More</NuxtLink>
                </div>
            </div>

            <div class="feature grid-item-3">
                <img alt=""
                     class="feature-img"
                     src="../assets/images/plant_grid_3.jpg"
                >
                <div class="content">
                    <h3>Beta</h3>
                    <NuxtLink to="/register">Learn More</NuxtLink>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>

</script>

<style scoped lang="scss">

main {
    background: url("../assets/images/bg3.jpg") no-repeat fixed center center;
}

.container {
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto;
    background-color: rgba(0, 0, 0, 0.6);

    .grid-item-1 {
        grid-column: 1 / -1;
        grid-row: 1;
    }

    .grid-item-2 {
        grid-column: 1;
        grid-row: 2;
    }

    .grid-item-3 {
        grid-column: 2;
        grid-row: 2;
    }

    @media (max-width: 768px) {
        .grid-item-2 {
            grid-column: 1 / -1;
            grid-row: 2;
        }
        .grid-item-3 {
            grid-column: 1 / -1;
            grid-row: 3;
        }
        .feature {
            .feature-img,
            .demo-bg {
                opacity: 1;
                transform: scale(1);
            }
            .content {
                transform: translateX(0);
            }
        }
        a {
            opacity: 1;
        }
    }
}

.feature {
    display: grid;
    place-items: center;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(255, 255, 255, .2);

    h3 {
        font-size: 2rem;
        font-weight: 300;
        margin-bottom: 1rem;
    }

    .content {
        width: 80%;
        text-align: left;
        font-size: 1.2rem;
        font-weight: 300;
        line-height: 1.5;
        margin: 0 auto;
        transition: transform .3s ease;
    }

    .feature-img {
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        opacity: 0;
        transform: scale(1.2);
        transition: transform 6s, opacity .3s ease;
        width: 100%;
    }

    &:hover {
        .feature-img,
        .demo-bg {
            opacity: 1;
            transform: scale(1);
        }
        a {
            opacity: 1;
        }
        .content {
            transform: scale(1.2);
            transform-origin: left 50%;
        }
    }
}

a {
    background: white;
    color: #000;
    padding: 1rem 2rem;
    text-decoration: none;
    font-weight: bold;
    border-radius: 5px;
    text-transform: uppercase;
    transition: all .3s ease;
    font-size: 1.2rem;
    opacity: 0;
}
</style>