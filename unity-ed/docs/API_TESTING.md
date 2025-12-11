# API Testing Guide

Complete guide for testing all game API endpoints using REST client tools like Postman, Thunder Client, or curl.

## Setup

1. **Get Authentication Token**
   - Login as demo student to get JWT token
   - Use token in Authorization header for all subsequent requests

## Authentication

### Login
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "demo@student.com",
  "password": "student123"
}
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "name": "Demo Student",
    "email": "demo@student.com",
    "role": "STUDENT"
  }
}
```

---

## Game Session Endpoints

### Start Game Session
```bash
POST http://localhost:3000/api/game/start
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "deviceType": "unity"
}
```

**Expected Response:**
```json
{
  "success": true,
  "session": {
    "sessionId": 1,
    "userId": 2,
    "startTime": "2025-12-04T09:00:00.000Z",
    "deviceType": "unity"
  }
}
```

### End Game Session
```bash
POST http://localhost:3000/api/game/end
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "sessionId": 1,
  "totalScore": 1500,
  "levelReached": 5,
  "rewardsEarned": {
    "coins": 100,
    "xp": 500
  }
}
```

**Expected Response:**
```json
{
  "success": true,
  "session": {
    "sessionId": 1,
    "startTime": "2025-12-04T09:00:00.000Z",
    "endTime": "2025-12-04T09:15:00.000Z",
    "totalScore": 1500,
    "levelReached": 5,
    "duration": 900
  }
}
```

---

## Score Endpoints

### Update Score
```bash
POST http://localhost:3000/api/game/score/update
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "score": 1500,
  "xp": 750,
  "coins": 150,
  "gems": 5,
  "level": 5
}
```

**Expected Response:**
```json
{
  "success": true,
  "score": {
    "totalScore": 1500,
    "highestScore": 1500,
    "xp": 750,
    "coins": 150,
    "gems": 5
  }
}
```

### Get User Score
```bash
GET http://localhost:3000/api/game/score/2
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "score": {
    "userId": 2,
    "userName": "Demo Student",
    "totalScore": 1500,
    "highestScore": 1500,
    "xp": 750,
    "coins": 150,
    "gems": 5,
    "lastUpdated": "2025-12-04T09:15:00.000Z"
  }
}
```

---

## Leaderboard Endpoints

### Get Weekly Leaderboard
```bash
GET http://localhost:3000/api/leaderboard/weekly
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "userId": 2,
      "userName": "Demo Student",
      "avatar": null,
      "weeklyScore": 1500,
      "lastReset": "2025-12-02T00:00:00.000Z"
    }
  ],
  "resetInfo": {
    "nextReset": "2025-12-09T00:00:00.000Z",
    "period": "weekly"
  }
}
```

### Get Monthly Leaderboard
```bash
GET http://localhost:3000/api/leaderboard/monthly
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "userId": 2,
      "userName": "Demo Student",
      "avatar": null,
      "monthlyScore": 1500,
      "lastReset": "2025-12-01T00:00:00.000Z"
    }
  ],
  "resetInfo": {
    "nextReset": "2026-01-01T00:00:00.000Z",
    "period": "monthly"
  }
}
```

---

## Progress Endpoints

### Update Progress
```bash
POST http://localhost:3000/api/progress/update
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "level": 5,
  "xp": 750,
  "completedLessons": ["lesson_1", "lesson_2", "lesson_3"]
}
```

**Expected Response:**
```json
{
  "success": true,
  "progress": {
    "level": 5,
    "xp": 750,
    "completedLessons": ["lesson_1", "lesson_2", "lesson_3"],
    "currentStreak": 0,
    "longestStreak": 0
  },
  "newBadges": [
    {
      "id": 1,
      "name": "First Steps",
      "description": "Complete your first lesson",
      "icon": "🎯"
    }
  ]
}
```

### Get User Progress
```bash
GET http://localhost:3000/api/progress/2
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "progress": {
    "userId": 2,
    "userName": "Demo Student",
    "level": 5,
    "xp": 750,
    "completedLessons": ["lesson_1", "lesson_2", "lesson_3"],
    "currentStreak": 0,
    "longestStreak": 0,
    "lastPlayed": "2025-12-04T09:15:00.000Z",
    "badges": [
      {
        "id": 1,
        "name": "First Steps",
        "description": "Complete your first lesson",
        "icon": "🎯",
        "earnedAt": "2025-12-04T09:15:00.000Z"
      }
    ]
  }
}
```

---

## Analytics Endpoints

### Log Analytics Event
```bash
POST http://localhost:3000/api/analytics/event
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "eventType": "level_complete",
  "eventData": {
    "level": 5,
    "time": 300,
    "accuracy": 0.95
  },
  "sessionId": 1
}
```

**Expected Response:**
```json
{
  "success": true,
  "event": {
    "id": 1,
    "eventType": "level_complete",
    "timestamp": "2025-12-04T09:15:00.000Z"
  }
}
```

---

## User Endpoints

### Get Current User Profile
```bash
GET http://localhost:3000/api/user/me
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": 2,
    "name": "Demo Student",
    "email": "demo@student.com",
    "avatar": null,
    "role": "STUDENT",
    "score": {
      "totalScore": 1500,
      "highestScore": 1500,
      "xp": 750,
      "coins": 150,
      "gems": 5
    },
    "progress": {
      "level": 5,
      "xp": 750,
      "currentStreak": 0,
      "longestStreak": 0,
      "completedLessons": ["lesson_1", "lesson_2", "lesson_3"]
    },
    "leaderboard": {
      "weeklyScore": 1500,
      "monthlyScore": 1500,
      "weeklyRank": 1,
      "monthlyRank": 1
    },
    "badges": [
      {
        "id": 1,
        "name": "First Steps",
        "description": "Complete your first lesson",
        "icon": "🎯",
        "earnedAt": "2025-12-04T09:15:00.000Z"
      }
    ]
  }
}
```

### Update User Profile
```bash
PUT http://localhost:3000/api/user/me
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "name": "Updated Name",
  "avatar": "https://example.com/avatar.png"
}
```

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": 2,
    "name": "Updated Name",
    "email": "demo@student.com",
    "avatar": "https://example.com/avatar.png",
    "role": "STUDENT"
  }
}
```

---

## Testing Checklist

- [ ] Test authentication with demo credentials
- [ ] Create game session
- [ ] Update score with valid values
- [ ] Try updating score with invalid values (should fail anti-cheat)
- [ ] Get user score
- [ ] Get weekly leaderboard
- [ ] Get monthly leaderboard
- [ ] Update progress and verify badge awards
- [ ] Get user progress with badges
- [ ] Log analytics event
- [ ] Get complete user profile
- [ ] Update user profile
- [ ] End game session
- [ ] Verify leaderboard updated after session end

## Common Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized - Authentication required"
}
```

### 404 Not Found
```json
{
  "error": "User not found"
}
```

### 400 Bad Request
```json
{
  "error": "Invalid score value"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to update score"
}
```

---

## Notes

- All timestamps are in ISO 8601 format
- Scores must be non-negative integers
- Anti-cheat validation allows max 1000 points per second
- Badge awards are automatic when progress is updated
- Leaderboards reset weekly (Monday) and monthly (1st of month)
- Analytics events support any JSON data structure
