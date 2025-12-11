/**
 * Unity C# Integration Examples for Gamified Learning API
 * 
 * This file contains complete examples of how to integrate the Unity game
 * with the backend API endpoints.
 */

using UnityEngine;
using UnityEngine.Networking;
using System.Collections;
using System.Text;
using System;

[Serializable]
public class AuthResponse
{
    public string token;
    public User user;
}

[Serializable]
public class User
{
    public int id;
    public string name;
    public string email;
    public string role;
}

[Serializable]
public class GameSessionResponse
{
    public bool success;
    public GameSessionData session;
}

[Serializable]
public class GameSessionData
{
    public int sessionId;
    public int userId;
    public string startTime;
    public string deviceType;
}

[Serializable]
public class ScoreUpdateRequest
{
    public int score;
    public int xp;
    public int coins;
    public int gems;
    public int level;
}

[Serializable]
public class ProgressUpdateRequest
{
    public int level;
    public int xp;
    public string[] completedLessons;
}

[Serializable]
public class LeaderboardResponse
{
    public bool success;
    public LeaderboardEntry[] leaderboard;
}

[Serializable]
public class LeaderboardEntry
{
    public int rank;
    public int userId;
    public string userName;
    public string avatar;
    public int weeklyScore;
    public int monthlyScore;
}

public class GameAPIManager : MonoBehaviour
{
    // API Configuration
    private const string API_BASE_URL = "https://your-domain.com/api";
    private string authToken = "";
    private int currentSessionId = -1;

    #region Authentication

    /// <summary>
    /// Login user and get authentication token
    /// </summary>
    public IEnumerator Login(string email, string password, Action<bool, string> callback)
    {
        WWWForm form = new WWWForm();
        form.AddField("email", email);
        form.AddField("password", password);

        UnityWebRequest request = UnityWebRequest.Post($"{API_BASE_URL}/auth/login", form);
        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            try
            {
                AuthResponse response = JsonUtility.FromJson<AuthResponse>(request.downloadHandler.text);
                authToken = response.token;
                PlayerPrefs.SetString("AuthToken", authToken);
                callback(true, "Login successful");
            }
            catch (Exception e)
            {
                callback(false, $"Parse error: {e.Message}");
            }
        }
        else
        {
            callback(false, $"Login failed: {request.error}");
        }
    }

    #endregion

    #region Game Session Management

    /// <summary>
    /// Start a new game session
    /// </summary>
    public IEnumerator StartGameSession(Action<bool, int> callback)
    {
        string json = "{\"deviceType\": \"unity\"}";
        byte[] bodyRaw = Encoding.UTF8.GetBytes(json);

        UnityWebRequest request = new UnityWebRequest($"{API_BASE_URL}/game/start", "POST");
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        request.SetRequestHeader("Authorization", $"Bearer {authToken}");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            try
            {
                GameSessionResponse response = JsonUtility.FromJson<GameSessionResponse>(request.downloadHandler.text);
                currentSessionId = response.session.sessionId;
                callback(true, currentSessionId);
                Debug.Log($"Game session started: {currentSessionId}");
            }
            catch (Exception e)
            {
                callback(false, -1);
                Debug.LogError($"Session parse error: {e.Message}");
            }
        }
        else
        {
            callback(false, -1);
            Debug.LogError($"Start session failed: {request.error}");
        }
    }

    /// <summary>
    /// End current game session
    /// </summary>
    public IEnumerator EndGameSession(int totalScore, int levelReached, Action<bool> callback)
    {
        string json = $"{{\"sessionId\": {currentSessionId}, \"totalScore\": {totalScore}, \"levelReached\": {levelReached}}}";
        byte[] bodyRaw = Encoding.UTF8.GetBytes(json);

        UnityWebRequest request = new UnityWebRequest($"{API_BASE_URL}/game/end", "POST");
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        request.SetRequestHeader("Authorization", $"Bearer {authToken}");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            callback(true);
            Debug.Log("Game session ended successfully");
        }
        else
        {
            callback(false);
            Debug.LogError($"End session failed: {request.error}");
        }
    }

    #endregion

    #region Score Management

    /// <summary>
    /// Update player score during gameplay
    /// </summary>
    public IEnumerator UpdateScore(int score, int xp, int coins, int level, Action<bool> callback)
    {
        ScoreUpdateRequest scoreData = new ScoreUpdateRequest
        {
            score = score,
            xp = xp,
            coins = coins,
            level = level
        };

        string json = JsonUtility.ToJson(scoreData);
        byte[] bodyRaw = Encoding.UTF8.GetBytes(json);

        UnityWebRequest request = new UnityWebRequest($"{API_BASE_URL}/game/score/update", "POST");
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        request.SetRequestHeader("Authorization", $"Bearer {authToken}");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            callback(true);
            Debug.Log($"Score updated: {score}");
        }
        else
        {
            callback(false);
            Debug.LogError($"Update score failed: {request.error}");
        }
    }

    #endregion

    #region Leaderboard

    /// <summary>
    /// Get weekly leaderboard
    /// </summary>
    public IEnumerator GetWeeklyLeaderboard(Action<bool, LeaderboardEntry[]> callback)
    {
        UnityWebRequest request = UnityWebRequest.Get($"{API_BASE_URL}/leaderboard/weekly");
        request.SetRequestHeader("Authorization", $"Bearer {authToken}");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            try
            {
                LeaderboardResponse response = JsonUtility.FromJson<LeaderboardResponse>(request.downloadHandler.text);
                callback(true, response.leaderboard);
            }
            catch (Exception e)
            {
                callback(false, null);
                Debug.LogError($"Leaderboard parse error: {e.Message}");
            }
        }
        else
        {
            callback(false, null);
            Debug.LogError($"Get leaderboard failed: {request.error}");
        }
    }

    /// <summary>
    /// Get monthly leaderboard
    /// </summary>
    public IEnumerator GetMonthlyLeaderboard(Action<bool, LeaderboardEntry[]> callback)
    {
        UnityWebRequest request = UnityWebRequest.Get($"{API_BASE_URL}/leaderboard/monthly");
        request.SetRequestHeader("Authorization", $"Bearer {authToken}");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            try
            {
                LeaderboardResponse response = JsonUtility.FromJson<LeaderboardResponse>(request.downloadHandler.text);
                callback(true, response.leaderboard);
            }
            catch (Exception e)
            {
                callback(false, null);
                Debug.LogError($"Leaderboard parse error: {e.Message}");
            }
        }
        else
        {
            callback(false, null);
            Debug.LogError($"Get leaderboard failed: {request.error}");
        }
    }

    #endregion

    #region Progress & Achievements

    /// <summary>
    /// Update player progress and trigger badge awards
    /// </summary>
    public IEnumerator UpdateProgress(int level, int xp, string[] completedLessons, Action<bool> callback)
    {
        ProgressUpdateRequest progressData = new ProgressUpdateRequest
        {
            level = level,
            xp = xp,
            completedLessons = completedLessons
        };

        string json = JsonUtility.ToJson(progressData);
        byte[] bodyRaw = Encoding.UTF8.GetBytes(json);

        UnityWebRequest request = new UnityWebRequest($"{API_BASE_URL}/progress/update", "POST");
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        request.SetRequestHeader("Authorization", $"Bearer {authToken}");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            callback(true);
            Debug.Log("Progress updated successfully");
        }
        else
        {
            callback(false);
            Debug.LogError($"Update progress failed: {request.error}");
        }
    }

    #endregion

    #region Analytics

    /// <summary>
    /// Log analytics event
    /// </summary>
    public IEnumerator LogAnalyticsEvent(string eventType, string eventData, Action<bool> callback)
    {
        string json = $"{{\"eventType\": \"{eventType}\", \"eventData\": {eventData}, \"sessionId\": {currentSessionId}}}";
        byte[] bodyRaw = Encoding.UTF8.GetBytes(json);

        UnityWebRequest request = new UnityWebRequest($"{API_BASE_URL}/analytics/event", "POST");
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");
        request.SetRequestHeader("Authorization", $"Bearer {authToken}");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            callback(true);
        }
        else
        {
            callback(false);
            Debug.LogError($"Log analytics failed: {request.error}");
        }
    }

    #endregion

    #region Example Usage

    /// <summary>
    /// Complete game flow example
    /// </summary>
    public IEnumerator CompleteGameFlowExample()
    {
        // 1. Login
        bool loginSuccess = false;
        yield return Login("demo@student.com", "student123", (success, message) =>
        {
            loginSuccess = success;
            Debug.Log(message);
        });

        if (!loginSuccess)
        {
            Debug.LogError("Login failed, stopping game flow");
            yield break;
        }

        // 2. Start game session
        int sessionId = -1;
        yield return StartGameSession((success, id) =>
        {
            sessionId = id;
        });

        if (sessionId == -1)
        {
            Debug.LogError("Failed to start session");
            yield break;
        }

        // 3. Simulate gameplay - update score periodically
        int currentScore = 0;
        int currentXP = 0;
        int currentLevel = 1;

        for (int i = 0; i < 5; i++)
        {
            yield return new WaitForSeconds(10f); // Wait 10 seconds

            currentScore += 100;
            currentXP += 50;

            yield return UpdateScore(currentScore, currentXP, 0, currentLevel, (success) =>
            {
                if (success)
                {
                    Debug.Log($"Score updated to {currentScore}");
                }
            });
        }

        // 4. Complete lesson and update progress
        string[] completedLessons = new string[] { "lesson_1", "lesson_2", "lesson_3" };
        yield return UpdateProgress(currentLevel, currentXP, completedLessons, (success) =>
        {
            if (success)
            {
                Debug.Log("Progress updated");
            }
        });

        // 5. Log gameplay event
        yield return LogAnalyticsEvent("level_complete", "{\"level\": 1, \"time\": 150}", (success) =>
        {
            Debug.Log("Analytics event logged");
        });

        // 6. End game session
        yield return EndGameSession(currentScore, currentLevel, (success) =>
        {
            if (success)
            {
                Debug.Log("Game session ended");
            }
        });

        // 7. Get leaderboard
        yield return GetWeeklyLeaderboard((success, leaderboard) =>
        {
            if (success && leaderboard != null)
            {
                Debug.Log($"Leaderboard has {leaderboard.Length} entries");
                for (int i = 0; i < Mathf.Min(10, leaderboard.Length); i++)
                {
                    Debug.Log($"#{leaderboard[i].rank}: {leaderboard[i].userName} - {leaderboard[i].weeklyScore} points");
                }
            }
        });
    }

    #endregion
}
