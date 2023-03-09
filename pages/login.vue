<template>
    <div class="main">
        <form action="">
            <label for="username">Username</label>
            <input type="text" placeholder="Username" v-model="username">
            <label for="password">Password</label>
            <input type="password" placeholder="Password" v-model="password">
        </form>
        <button class="submit" @click="SignInHandler(username, password)">Login</button>
    </div>
</template>

<script setup lang="ts">
const { signIn } = useSession()
const route = useRoute()

const username: Ref = ref('')
const password: Ref = ref('')

const SignInHandler = async ( username: Ref, password: Ref ) => {
    const { error } = await signIn(
        'credentials',
        {
            username: username,
            password: password,
            redirect: false,
        }
    )

    if (error) {
        alert("Invalid username or password")
    } else {
        // @ts-ignore
        return navigateTo(route.query.callbackUrl || window.location.origin, { external: true })
    }
}
</script>

<style scoped lang="scss">

button {
    padding: 10px;
    border-radius: 5px;
    outline: none;
    background-color: rgb(20, 20, 20);
    color: white;
    border: 1px solid white;
    cursor: pointer;
    width: 50%;
    margin: 3em auto;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: rgb(40, 40, 40);
    }
}
</style>