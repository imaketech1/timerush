"use client"; 
import React, { useState, useEffect } from "react";
import styles from "./app/Timer.module.css"; 

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(50 * 60); // Start at 50 minutes for focus
  const [mode, setMode] = useState("FOCUS");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  );
  const [isPaused, setIsPaused] = useState(false); // To track if the timer is paused
  const [focusDuration, setFocusDuration] = useState(50 * 60); // 50 minutes for focus
  const [breakDuration, setBreakDuration] = useState(5 * 60); // 5 minutes for break
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // To control popup visibility for settings
  const [isStatsOpen, setIsStatsOpen] = useState(false); // To control popup visibility for stats
  const [totalFocusTime, setTotalFocusTime] = useState(0); // Total focus time in seconds
  const [totalBreakTime, setTotalBreakTime] = useState(0); // Total break time in seconds

  // Update the current time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }, 1000);
    return () => clearInterval(timeInterval);
  }, []);
  

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      if (mode === "FOCUS") {
        setTotalFocusTime((prevTime) => prevTime + focusDuration);
      } else {
        setTotalBreakTime((prevTime) => prevTime + breakDuration);
      }
      setMode((prevMode) => (prevMode === "FOCUS" ? "BREAK" : "FOCUS"));
      setTimeLeft(mode === "FOCUS" ? breakDuration : focusDuration); // Switch between durations
    }
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft, mode, isPaused, focusDuration, breakDuration]);

  const togglePause = () => {
    setIsPaused(!isPaused); // Toggle between paused and running
  };

  const openSettings = () => {
    setIsSettingsOpen(true); // Open the settings popup
  };

  const closeSettings = () => {
    setIsSettingsOpen(false); // Close the settings popup
  };

  const saveSettings = () => {
    // Here you could save changes and close the popup
    setIsSettingsOpen(false);
  };

  const changeDuration = (type, value) => {
    if (type === "focus") {
      setFocusDuration(value * 60);
      setTimeLeft(value * 60); // Reset the timer
    } else if (type === "break") {
      setBreakDuration(value * 60);
    }
  };

  const openStats = () => {
    setIsStatsOpen(true); // Open the stats popup
  };

  const closeStats = () => {
    setIsStatsOpen(false); // Close the stats popup
  };

  const formatTime = (time) => {
    return `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;
  };

  return (
    <div className={styles.timerContainer}>
      {/* Stats Icon */}
      <div className={styles.statsIcon} onClick={openStats}>
      🎯
      </div>

      {/* Current Time */}
      <div className={styles.currentTime}>{currentTime}</div>

      {/* Date */}
      <div className={styles.date}>{currentDate}</div>

      {/* Mode */}
      <div className={styles.mode}>{mode}</div>

      {/* Countdown Timer */}
      <div className={styles.countdown}>{formatTime(timeLeft)}</div>

      {/* Buttons */}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={togglePause}>
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button className={styles.button} onClick={openSettings}>
          Settings
        </button>
      </div>

      {/* Settings Popup */}
      {isSettingsOpen && (
        <div className={styles.overlay}>
          <div className={styles.settingsPopup}>
            <div className={styles.popupContent}>
              <h2>Change Settings</h2>
              <div className={styles.settingItem}>
                <label>Focus Time (minutes):</label>
                <input
                  type="number"
                  value={focusDuration / 60}
                  onChange={(e) => changeDuration("focus", e.target.value)}
                  min="1"
                />
              </div>
              <div className={styles.settingItem}>
                <label>Break Time (minutes):</label>
                <input
                  type="number"
                  value={breakDuration / 60}
                  onChange={(e) => changeDuration("break", e.target.value)}
                  min="1"
                />
              </div>
              <div className={styles.popupButtons}>
                <button onClick={saveSettings}>Save</button>
                <button onClick={closeSettings}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Popup */}
      {isStatsOpen && (
        <div className={styles.overlay}>
          <div className={styles.statsPopup}>
            <div className={styles.popupContent}>
              <h2>Stats</h2>
              <div className={styles.settingItem}>
                <label>Total Focus Time:</label>
                <p>{formatTime(totalFocusTime)}</p>
              </div>
              <div className={styles.settingItem}>
                <label>Total Break Time:</label>
                <p>{formatTime(totalBreakTime)}</p>
              </div>
              <div className={styles.popupButtons}>
                <button onClick={closeStats}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
