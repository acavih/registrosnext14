"use client"

import { Button } from "@mantine/core"
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton(props) {
    const [unable, setUnable] = useState(false)
    const router = useRouter()
    return (
        <Button disabled={unable} onClick={async () => {
            try {
                setUnable(true)
                await signOut({redirect: false})
                router.refresh()
            } catch (error) {
                setUnable(false)
            }
        }}>
            Cerrar sesión
        </Button>
    )
}