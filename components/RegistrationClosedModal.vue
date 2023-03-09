<template>
    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Registration Closed</h2>
            </div>
            <div class="modal-body">
                <p>
                    Registration is currently closed.
                    Please check back later.
                </p>
            </div>
            <div class="modal-footer">
                <NuxtLink to="/">
                    <button>Home</button>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script lang="js">
export default {
    name: 'RegistrationClosedModal',
}

</script>

<style scoped lang="scss">
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;

    .modal-content {
        background-color: rgb(20, 20, 20);
        width: 50%;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 1em;

        .modal-header {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid black;
            padding-bottom: 1em;

            h2 {
                font-size: 1.5em;
                padding: 0.5em;
            }
        }

        .modal-body {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1em;

            p {
                font-size: 1.2em;
                line-height: 2em;
            }
        }

        .modal-footer {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1em;

            button {
                padding: 1em 2em;
                border: none;
                border-radius: 5px;
                background-color: black;
                color: white;
                font-size: 1.2em;
                cursor: pointer;
                transition: all .3s ease;

                &:hover {
                    background-color: #333;
                }
            }
        }
    }
}
</style>