<template>
    <div class="main">
        <article>
            <h1>
                Leverage the power of <span class="highlight">open source</span> to get <span class="highlight">affordable</span>,
                and <span class="highlight">trustworthy</span> monitoring for your plants
            </h1>
            <p>
                Built with Arduino, Raspberry Pi, and a whole lot of open source software, this project is designed to
                be as accessible as possible.
            </p>
            <p>
                The goal will be to have a fully functional, and customizable monitoring system for your plants, with
                the ability to add more sensors, and more features as you see fit.
            </p>
            <p>
                The first step of the project is a proof of concept; where the sensors send data to the server, and you
                can see what's going on by logging in to the website.
            </p>
            <p>
                The second step will be two-way communication, so that you can send commands to the sensors directly
                from your browser; and control the environment of your plants (water pump, heater, fans...).
            </p>
            <p>
                At first, the hardware will make use of stock boards and sensors, but as the project grows, more
                efficient and cost effective parts will be used.
            </p>
            <p>
                Beta testing will be available soon, so stay tuned!
            </p>

        </article>
    </div>
</template>

<style lang="scss" scoped>

@keyframes highlight-text {
    from {
        background-position: 0 center;
    }
    to {
        background-position: -200% center;
    }
}


div.main {
    display: flex;
    flex-direction: column;

    article {
        margin: auto;
        width: 50%;
        text-align: left;
        color: white;
        font-size: 1.5em;
        font-weight: 300;
        line-height: 1.5em;
        padding-bottom: 5em;

        h1 {
            font-size: 2em;
            font-weight: 400;
            line-height: 1.5em;
            padding: 5em 0;
        }

        p {
            padding: 1em 0;
        }

        .highlight {
            font-weight: 600;
            background: linear-gradient(
                    to right,
                    rgb(54, 115, 58) 0%,
                    rgb(102, 175, 129) 33%,
                    rgb(121, 173, 140) 66%,
                    rgb(54, 115, 58) 100%
            );
            background-size: 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            white-space: nowrap;
            animation: highlight-text 10s ease infinite;
        }
    }
}
</style>