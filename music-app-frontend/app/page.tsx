// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Song } from "@/types";
import { getAllSongs, searchSongs, getFavoriteSongs } from "@/lib/api";
import { SongCard } from "@/components/song-card";
import { Search } from "@/components/search";
import { toast } from "sonner"


export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all songs
        const songsData = searchQuery
          ? await searchSongs(searchQuery)
          : await getAllSongs();

        // Fetch favorites
        const favoritesData = await getFavoriteSongs();
        const favoriteIds = favoritesData.map(song => song.id);

        setSongs(songsData);
        setFavorites(favoriteIds);
      } catch (error) {
        toast("Failed to load songs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, toast]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFavoriteToggle = (songId: number, isFavorite: boolean) => {
    if (isFavorite) {
      setFavorites(prev => [...prev, songId]);
    } else {
      setFavorites(prev => prev.filter(id => id !== songId));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center mb-8">
        <Search onSearch={handleSearch} />
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p>Loading songs...</p>
        </div>
      ) : songs.length === 0 ? (
        <div className="text-center py-12">
          <p>No songs found{searchQuery ? ` for "${searchQuery}"` : ""}.</p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : "All Songs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {songs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                isFavorite={favorites.includes(song.id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}