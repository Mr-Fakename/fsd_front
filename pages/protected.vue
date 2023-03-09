<template>
    <div class="main">
        <p>Welcome, {{ data?.user.name }}</p>
        <pre>{{ JSON.stringify(data, undefined, 4) || 'no token present, are you logged in?' }}</pre>
        <p>Status: {{ status }}</p>
        <p>Last refreshed at: {{ lastRefreshedAt }}</p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { status,  data,  lastRefreshedAt } = useSession()
</script>
