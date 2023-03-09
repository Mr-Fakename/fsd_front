import {H3Event} from "h3";

export const fetchWithCookie = async (event: H3Event, url: string) => {
    const res = await $fetch.raw(url)
    const cookies = (res.headers.get('set-cookie') || '').split(',')
    for (const cookie of cookies) {
        appendHeader(event, 'set-cookie', cookie)
    }
    return res._data
}
