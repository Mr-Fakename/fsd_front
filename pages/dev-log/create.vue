<template>
    <div class="main">
        <form action="">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" v-model="title">
            <label for="body">Body</label>
            <textarea name="body" id="body" cols="30" rows="10" v-model="body"></textarea>
            <button type="submit" @click="onSubmit">Submit</button>
        </form>
    </div>
</template>

<script setup lang="ts">
const { data: userData, status } = useSession()

const title = ref('');
const body = ref('');
let jwt = ''

if (status?.value === 'authenticated' && userData?.value?.user.admin) {
    const json = JSON.parse(JSON.stringify(userData?.value, undefined, 4))
    jwt = json.access
}

const onSubmit = async (e: any) => {
    e.preventDefault();

    const {data, error} = await useFetch(
        'http://localhost:8000/blog/posts/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt,
            },
            body: JSON.stringify({
                title: title.value,
                body: body.value,
            })
        }
    )

    title.value = ''
    body.value = ''
}

</script>
