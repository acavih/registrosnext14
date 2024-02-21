"use client"

import { Button } from "@mantine/core"
import { signOut } from "next-auth/react";

export default function LogoutButton(props) {
    return (
        <Button onClick={() => signOut()}>
            Cerrar sesión
        </Button>
    )
}