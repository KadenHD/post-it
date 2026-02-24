"use client";

import { usePathname } from "next/navigation"

export default function NotFound() {
    const pathname = usePathname()

    return (
        <section id="not-found">
            <h1>404</h1>

            <p>No page found at:</p>

            <code>{pathname}</code>
        </section>
    )
}
