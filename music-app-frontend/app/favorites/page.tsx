// app/favorites/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Song } from "@/types";
import { getFavoriteSongs } from "@/lib/api";
import { SongCard } from "@/components/song-card";
import { toast } from "sonner";

export default function Favorites() {
    const [favorites, setFavorites] = useState<Song[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchFavorites = async () => {
            setIsLoading(true);
            try {
                const favoritesData = await getFavoriteSongs();
                setFavorites(favoritesData);
            } catch (error) {
                toast("Failed to load favorite songs",);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, [toast]);

    const handleFavoriteToggle = (songId: number, isFavorite: boolean) => {
        if (!isFavorite) {
            setFavorites(prev => prev.filter(song => song.id !== songId));
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Your Favorites</h1>

            {isLoading ? (
                <div className="text-center py-12">
                    <p>Loading favorites...</p>
                </div>
            ) : favorites.length === 0 ? (
                <div className="text-center py-12">
                    <p>You haven't added any songs to your favorites yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.map((song) => (
                        <SongCard
                            key={song.id}
                            song={song}
                            isFavorite={true}
                            onFavoriteToggle={handleFavoriteToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}