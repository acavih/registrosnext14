"use client"

import { Button } from "@mantine/core"
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton(props) {
    const router = useRouter()
    return (
        <Button onClick={async () => {
            await signOut({redirect: false})
            router.refresh()
        }}>
            Cerrar sesión
        </Button>
    )
}