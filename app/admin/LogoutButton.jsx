"use client"

import { Button } from "@mantine/core"
import { signOut } from "next-auth/react";

export default function LogoutButton(props) {
    console.log(props)
    return (
        <Button onClick={() => signOut()}>
            Logout
        </Button>
    )
}