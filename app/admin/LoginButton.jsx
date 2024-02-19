"use client"

import { Button } from "@mantine/core"
import { signIn } from "next-auth/react";

export default function LoginButton(props) {
    console.log(props)
    return (
        <Button onClick={() => signIn()}>
            Login
        </Button>
    )
}