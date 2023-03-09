<template>
    <div class="main">
        <LineChart ref="line"/>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

import LineChart from "~/components/LineChart.vue";

const { data: userData, status, signOut } = useSession()

if (status?.value === 'authenticated') {
    const route = useRoute()
    const config = useRuntimeConfig();

    const json = JSON.parse(JSON.stringify(userData?.value, undefined, 4))
    const jwt = json.access

    const { data, error } = await useFetch(
        config.API_BASE_URL + 'api/setup/' + route.params.id + '/',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwt,
            },
        }
    )

    if (error) {
        if (error?.value?.name === 'FetchError') {
            navigateTo('/setup')
        }
        if (error?.value?.data.messages[0].token_type === 'access') {
            window.alert('Your session has expired. Please log in again.')
            await signOut({ callbackUrl: '/login' })
        }
    }
}

</script>
