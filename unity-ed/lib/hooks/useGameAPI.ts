/**
 * React hooks for game API integration
 * 
 * These custom hooks provide type-safe access to the game API endpoints
 * from Next.js frontend components.
 */
/**
 * React hooks for game API integration
 * 
 * These custom hooks provide type-safe access to the game API endpoints
 * from Next.js frontend components.
 */

import { useSession } from 'next-auth/react';
import { useState } from 'react';

// Types
export interface GameSession {
    sessionId: number;
    userId: number;
    startTime: string;
    deviceType: 'unity' | 'webgl';
}

export interface UserScore {
    totalScore: number;
    highestScore: number;
    xp: number;
    coins: number;
    gems: number;
}

export interface LeaderboardEntry {
    rank: number;
    userId: number;
    userName: string;
    avatar?: string;
    weeklyScore?: number;
    monthlyScore?: number;
}

export interface Badge {
    id: number;
    name: string;
    description: string;
    icon: string;
    earnedAt: string;
}

export interface UserProgress {
    level: number;
    xp: number;
    completedLessons: string[];
    currentStreak: number;
    longestStreak: number;
    badges: Badge[];
}

// Hook: Get user profile with game data
export function useUserProfile() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<any>(null);

    const fetchProfile = async () => {
        if (!session) return;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/user/me', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw new Error('Failed to fetch profile');

            const data = await res.json();
            setProfile(data.user);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return { profile, loading, error, fetchProfile };
}

// Hook: Get user score
export function useUserScore(userId?: number) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [score, setScore] = useState<UserScore | null>(null);

    const fetchScore = async () => {
        // Use provided userId or get from session via API
        if (!userId && !session) return;

        setLoading(true);
        setError(null);

        try {
            // If no userId provided, fetch current user's score via /me endpoint
            const endpoint = userId
                ? `/api/game/score/${userId}`
                : '/api/user/me';

            const res = await fetch(endpoint);

            if (!res.ok) throw new Error('Failed to fetch score');

            const data = await res.json();
            setScore(userId ? data.score : data.user.score);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return { score, loading, error, fetchScore };
}

// Hook: Get leaderboard
export function useLeaderboard(period: 'weekly' | 'monthly' = 'weekly') {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

    const fetchLeaderboard = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/leaderboard/${period}`);

            if (!res.ok) throw new Error('Failed to fetch leaderboard');

            const data = await res.json();
            setLeaderboard(data.leaderboard);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return { leaderboard, loading, error, fetchLeaderboard };
}

// Hook: Get user progress
export function useUserProgress(userId?: number) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<UserProgress | null>(null);

    const fetchProgress = async () => {
        // Use provided userId or get from session via API
        if (!userId && !session) return;

        setLoading(true);
        setError(null);

        try {
            // If no userId provided, fetch current user's progress via /me endpoint
            const endpoint = userId
                ? `/api/progress/${userId}`
                : '/api/user/me';

            const res = await fetch(endpoint);

            if (!res.ok) throw new Error('Failed to fetch progress');

            const data = await res.json();
            setProgress(userId ? data.progress : data.user.progress);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return { progress, loading, error, fetchProgress };
}

// Hook: Update score
export function useUpdateScore() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateScore = async (
        score: number,
        xp: number,
        coins: number,
        gems?: number,
        level?: number
    ) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/game/score/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ score, xp, coins, gems, level }),
            });

            if (!res.ok) throw new Error('Failed to update score');

            const data = await res.json();
            return data.score;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateScore, loading, error };
}

// Hook: Update progress
export function useUpdateProgress() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProgress = async (
        level: number,
        xp: number,
        completedLessons: string[]
    ) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/progress/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ level, xp, completedLessons }),
            });

            if (!res.ok) throw new Error('Failed to update progress');

            const data = await res.json();
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateProgress, loading, error };
}
