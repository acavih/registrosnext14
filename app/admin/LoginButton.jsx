"use client"

import { Button } from "@mantine/core"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginButton(props) {
    const router = useRouter()
    console.log(props)
    return (
        <div>
            <Button onClick={() => signIn()}>
                Login
            </Button>
            <form onSubmit={async (e) => {
                e.preventDefault()
                const username = e.target['username'].value
                const password = e.target['password'].value

                const result = await signIn('credentials', {
                    redirect: false, username, password
                })

                console.log(result)
                if (result.ok)
                    router.refresh()
            }}>
                <input type="text" name="username" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <input type="submit" value={'login'} />
            </form>
        </div>
    )
}