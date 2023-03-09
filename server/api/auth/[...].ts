import CredentialsProvider from "next-auth/providers/credentials"
import {NuxtAuthHandler} from '#auth'

export default NuxtAuthHandler({
    callbacks: {
        // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
        jwt: async ({token, user}) => {
            const isSignIn = !!user;
            if (isSignIn) {
                const accessToken = (user as any).access;

                // unpack the access token to get the added user info
                let base64Url = accessToken.split('.')[1];
                let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                const jsonPayloadObj = JSON.parse(jsonPayload);

                token.access = user ? (user as any).access || '' : '';
                token.refresh = user ? (user as any).refresh || '' : '';
                token.email = user ? jsonPayloadObj.email || '' : '';
                token.name = user ? jsonPayloadObj.username || '' : '';
                token.admin = user ? jsonPayloadObj.admin || false : false;
            }
            return Promise.resolve(token);
        },
        // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
        session: async ({session, token}) => {
            (session as any).access = token.access;
            (session as any).refresh = token.refresh;
            (session as any).user.admin = token.admin;

            // const offset = 60 * 60000; // 60 minutes
            // const issuedAt = token.iat;
            // // @ts-ignore
            // const issuedAtDate = new Date(issuedAt * 1000);
            // const accessExpiration = new Date(issuedAtDate.getTime() + offset);

            // refresh the access token if it is expired; by default it expires in 60 minutes
            // see DRF settings.py for more details
            // TODO: update the access token in the jwt and currently used pages
            //if (accessExpiration < new Date()) {
            //    console.log('refreshing access token');
            //    const options = {
            //        method: 'POST',
            //        headers: {
            //            'Content-Type': 'application/json'
            //        },
            //        body: `${JSON.stringify({refresh: token.refresh})}`
            //    };
            //    fetch('http://127.0.0.1:8000/api/token/refresh/', options)
            //        .then(response => response.json())
            //        .then(response => {
            //                (session as any).access = response.access
            //                console.log("new token: ", response.access)
            //            }
            //        )
            //        .catch(err => console.error(err));
            //}
            return Promise.resolve(session);
        },
        async redirect({url, baseUrl}) {
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`
            } else if (new URL(url).origin === baseUrl) {
                return url
            }
            return baseUrl
        },
    },
    secret: 'R217p&AkRg!w',
    pages: {
        signIn: '/login',
    },
    providers: [
        // @ts-expect-error
        CredentialsProvider.default({
            name: 'credentials',
            async authorize(credentials: any, req: any) {
                const res = await fetch("http://127.0.0.1:8000/api/token/", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {"Content-Type": "application/json"}
                })
                const user = await res.json()

                if (res.ok && user) {
                    return user
                }
                return null
            }
        })
    ],
})
