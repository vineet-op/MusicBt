// src/components/search.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X } from "lucide-react";
import { useState } from "react";

interface SearchProps {
    onSearch: (query: string) => void;
}

export function Search({ onSearch }: SearchProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleClear = () => {
        setQuery("");
        onSearch("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-lg gap-2">
            <div className="relative flex-1">
                <Input
                    type="text"
                    placeholder="Search for songs or artists..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pr-10 bg-gray-800 border-gray-700"
                />
                {query && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={handleClear}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Button type="submit">
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
            </Button>
        </form>
    );
}