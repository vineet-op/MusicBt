// src/components/song-card.tsx
"use client";

import { Song } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";
import { addToFavorites, removeFromFavorites } from "@/lib/api";
import { toast } from "sonner"


interface SongCardProps {
    song: Song;
    isFavorite: boolean;
    onFavoriteToggle: (songId: number, isFavorite: boolean) => void;
}

export function SongCard({ song, isFavorite, onFavoriteToggle }: SongCardProps) {
    const [favorite, setFavorite] = useState(isFavorite);
    const [isLoading, setIsLoading] = useState(false);


    const handleFavoriteToggle = async () => {
        setIsLoading(true);
        try {
            if (favorite) {
                await removeFromFavorites(song.id);
                toast("Removed from favorites");
            } else {
                await addToFavorites(song.id);
                toast("Added to favorites");
            }
            setFavorite(!favorite);
            onFavoriteToggle(song.id, !favorite);
        } catch (error) {
            toast("Failed to update favorites");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-bold">{song.title}</h3>
                        <p className="text-sm text-gray-400">{song.artist}</p>
                        {song.album && <p className="text-xs text-gray-500 mt-1">{song.album}</p>}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleFavoriteToggle}
                        disabled={isLoading}
                        className={favorite ? "text-red-500" : "text-gray-400"}
                    >
                        <Heart className={favorite ? "fill-red-500" : ""} />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}