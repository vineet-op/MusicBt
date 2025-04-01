// src/lib/api.ts
import { Song } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const USER_ID = 1; // For simplicity, we'll hardcode the user ID

export async function getAllSongs(): Promise<Song[]> {
    const response = await fetch(`${API_URL}/songs`);
    if (!response.ok) {
        throw new Error('Failed to fetch songs');
    }
    return response.json();
}

export async function searchSongs(query: string): Promise<Song[]> {
    const response = await fetch(`${API_URL}/songs/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error('Failed to search songs');
    }
    return response.json();
}

export async function getFavoriteSongs(): Promise<Song[]> {
    const response = await fetch(`${API_URL}/users/${USER_ID}/favorites`);
    if (!response.ok) {
        throw new Error('Failed to fetch favorite songs');
    }
    return response.json();
}

export async function addToFavorites(songId: number): Promise<void> {
    const response = await fetch(`${API_URL}/users/${USER_ID}/favorites/${songId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to add song to favorites');
    }
}

export async function removeFromFavorites(songId: number): Promise<void> {
    const response = await fetch(`${API_URL}/users/${USER_ID}/favorites/${songId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to remove song from favorites');
    }
}