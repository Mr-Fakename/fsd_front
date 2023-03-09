<template>
    <div class="main">
        <RegistrationClosedModal v-if="showModal"/>

        <form>
            <label for="username">Username</label>
            <input v-model="username" type="text" name="username" id="username">
            <label for="email">Email</label>
            <input v-model="email" type="email" name="email" id="email">
            <label for="first_name">First Name</label>
            <input v-model="first_name" type="text" name="first_name" id="first_name">
            <label for="last_name">Last Name</label>
            <input v-model="last_name" type="text" name="last_name" id="last_name">
            <label for="password">Password</label>
            <input v-model="password" type="password" name="password" id="password">
            <button :disabled="!username || !password" type="submit"
                    @click.prevent=""
            >
                Register
            </button>
        </form>

    </div>
</template>

<script lang="ts">
import RegistrationClosedModal from "~/components/RegistrationClosedModal.vue";
export default {
    components: {RegistrationClosedModal},
    data() {
        return {
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            showModal: true,
        }
    },
    methods: {
        // async register() {
        //     const response = await fetch('', {
        //         method: 'POST',
        //         headers: {
        //             'Content-type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             username: this.username,
        //             email: this.email,
        //             first_name: this.first_name,
        //             last_name: this.last_name,
        //             password: this.password,
        //         }),
        //     })
        //     const data = await response.json()
        // }
    }
}

</script>

<style scoped lang="scss">
.main {
    height: 100vh;
    width: 100vw;
    padding-top: 5em;
    background: linear-gradient(to bottom, black, transparent);
    color: white;

    form {
        margin: 5em auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1em;
        width: 100%;
        max-width: 500px;

        label {
            display: block;
            text-align: left;
            width: 100%;
        }

        input {
            width: 100%;
            padding: 1em;
            border: none;
            border-radius: 5px;
            background: #1e1e1e;
            color: white;
        }

        button {
            width: 100%;
            padding: 1em;
            border: none;
            border-radius: 5px;
            background: #1e1e1e;
            color: white;
            cursor: pointer;

            &:disabled {
                background: #333;
                cursor: not-allowed;
            }
        }
    }
}
</style>