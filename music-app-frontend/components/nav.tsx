// src/components/nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Nav() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "All Songs" },
        { href: "/favorites", label: "Favorites" },
    ];

    return (
        <nav className="flex space-x-4 lg:space-x-6">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === link.href
                            ? "text-white border-b-2 border-green-500"
                            : "text-muted-foreground"
                    )}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}