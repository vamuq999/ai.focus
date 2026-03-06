"use client";

import { useEffect, useRef, useState } from "react";

type Phase =
  | "idle"
  | "countdown"
  | "hold"
  | "release"
  | "success"
  | "fail";

function getDelayForLevel(level: number) {
  if (level <= 1) return 2600;
  if (level === 2) return 2300;
  if (level === 3) return 2000;
  if (level === 4) return 1750;
  if (level === 5) return 1500;
  return Math.max(850, 1450 - (level - 5) * 55);
}

function getWindowForLevel(level: number) {
  if (level <= 1) return 1200;
  if (level === 2) return 1000;
  if (level === 3) return 850;
  if (level === 4) return 720;
  if (level === 5) return 620;
  return Math.max(320, 580 - (level - 5) * 16);
}

function getStateLabel(score: number) {
  if (score >= 90) return "Deep Focus";
  if (score >= 75) return "Focused";
  if (score >= 55) return "Building";
  if (score >= 35) return "Distracted";
  return "Scattered";
}

export default function FocusTrainer() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [instruction, setInstruction] = useState("Press Start Trial");
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(100);
  const [streak, setStreak] = useState(0);
  const [holding, setHolding] = useState(false);
  const [running, setRunning] = useState(false);
  const [feedback, setFeedback] = useState(
    "The system will guide your attention."
  );
  const [countdown, setCountdown] = useState<number | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeWindowRef = useRef(false);
  const expectedActionRef = useRef<"press" | "release" | null>(null);
  const awaitingResultRef = useRef(false);
  const mountedRef = useRef(true);

  const clearTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    timeoutRef.current = null;
    intervalRef.current = null;
  };

  const buzz = (ms: number) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(ms);
    }
  };

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      clearTimers();
    };
  }, []);

  const endRun = (reason: string, nextFeedback?: string) => {
    clearTimers();
    activeWindowRef.current = false;
    expectedActionRef.current = null;
    awaitingResultRef.current = false;
    setRunning(false);
    setPhase("fail");
    setInstruction(reason);
    setFeedback(nextFeedback ?? "Focus lost. Re-center and try again.");
    setCountdown(null);
  };

  const advanceToNextLevel = () => {
    const nextLevel = level + 1;
    const gained = 6 + Math.min(8, level);
    setLevel(nextLevel);
    setStreak((prev) => prev + 1);
    setScore((prev) => Math.min(100, prev + gained));
    setPhase("success");
    setInstruction("Cycle Cleared");
    setFeedback("Signal stable. The next sequence tightens.");

    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      beginCycle(nextLevel);
    }, 950);
  };

  const beginReleasePhase = (currentLevel: number) => {
    const windowMs = getWindowForLevel(currentLevel);
    const randomJitter = Math.floor(Math.random() * 160) - 80;

    setPhase("release");
    setInstruction("RELEASE");
    setFeedback("Lift now.");
    activeWindowRef.current = true;
    expectedActionRef.current = "release";
    awaitingResultRef.current = true;
    buzz(120);

    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current || !awaitingResultRef.current) return;
      endRun("Too Slow", "You held past the release command.");
    }, Math.max(300, windowMs + randomJitter));
  };

  const beginHoldPhase = (currentLevel: number) => {
    const delayMs = getDelayForLevel(currentLevel);
    const randomJitter = Math.floor(Math.random() * 450) - 225;
    const effectiveDelay = Math.max(700, delayMs + randomJitter);

    setPhase("hold");
    setInstruction("HOLD");
    setFeedback("Press and stay steady.");
    activeWindowRef.current = true;
    expectedActionRef.current = "press";
    awaitingResultRef.current = true;
    buzz(40);

    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current || !awaitingResultRef.current) return;
      endRun("Missed Hold", "You did not engage in time.");
    }, effectiveDelay);
  };

  const beginCycle = (currentLevel: number) => {
    clearTimers();
    setCountdown(null);
    setPhase("countdown");
    setInstruction("Prepare");
    setFeedback("Steady yourself. Sequence incoming.");
    activeWindowRef.current = false;
    expectedActionRef.current = null;
    awaitingResultRef.current = false;

    let ticks = 3;
    setCountdown(ticks);

    intervalRef.current = setInterval(() => {
      ticks -= 1;

      if (!mountedRef.current) return;

      if (ticks > 0) {
        setCountdown(ticks);
      } else {
        clearTimers();
        beginHoldPhase(currentLevel);
      }
    }, 500);
  };

  const startTrial = () => {
    clearTimers();
    activeWindowRef.current = false;
    expectedActionRef.current = null;
    awaitingResultRef.current = false;

    setLevel(1);
    setScore(100);
    setStreak(0);
    setHolding(false);
    setRunning(true);
    setPhase("countdown");
    setInstruction("Prepare");
    setFeedback("The Light narrows into signal.");
    beginCycle(1);
  };

  const handlePointerDown = () => {
    if (!running) return;

    setHolding(true);

    if (phase === "release") {
      const penalty = 18 + Math.min(12, level * 2);
      setScore((prev) => Math.max(0, prev - penalty));
      endRun("Early Hold", "You pressed when the system demanded release.");
      return;
    }

    if (phase !== "hold") return;

    if (activeWindowRef.current && expectedActionRef.current === "press") {
      clearTimers();
      activeWindowRef.current = false;
      expectedActionRef.current = null;
      awaitingResultRef.current = false;
      setFeedback("Good. Stay steady.");

      timeoutRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        beginReleasePhase(level);
      }, 900 + Math.floor(Math.random() * 500));
    }
  };

  const handlePointerUp = () => {
    if (!running) return;

    setHolding(false);

    if (phase === "hold") {
      const penalty = 16 + Math.min(10, level * 2);
      setScore((prev) => Math.max(0, prev - penalty));
      endRun("Released Early", "You let go before the signal allowed it.");
      return;
    }

    if (phase !== "release") return;

    if (activeWindowRef.current && expectedActionRef.current === "release") {
      clearTimers();
      activeWindowRef.current = false;
      expectedActionRef.current = null;
      awaitingResultRef.current = false;
      advanceToNextLevel();
    }
  };

  const focusState = getStateLabel(score);
  const orbCenterText =
    phase === "hold"
      ? "HOLD"
      : phase === "release"
      ? "RELEASE"
      : holding
      ? "HOLDING"
      : "READY";

  return (
    <section className="trainer-shell">
      <div className="trainer-panel">
        <div className="panel-top">
          <div className="panel-chip">Live Trial</div>
          <div className="panel-chip muted">{focusState}</div>
        </div>

        <div className="instruction-wrap">
          <p className="instruction-label">Current Command</p>
          <h2 className={`instruction phase-${phase}`}>
            {countdown !== null ? countdown : instruction}
          </h2>
          <p className="feedback">{feedback}</p>
        </div>

        <div
          className={[
            "focus-orb",
            holding ? "holding" : "",
            running ? "running" : "",
            phase === "hold" ? "state-hold" : "",
            phase === "release" ? "state-release" : "",
            phase === "fail" ? "state-fail" : "",
            phase === "success" ? "state-success" : "",
          ].join(" ")}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => {
            if (holding) handlePointerUp();
          }}
        >
          <div className="orb-ring orb-ring-1" />
          <div className="orb-ring orb-ring-2" />
          <div className="orb-ring orb-ring-3" />
          <div className="orb-core" />
          <div className="orb-text">{orbCenterText}</div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Focus Score</span>
            <strong>{score}</strong>
          </div>
          <div className="stat-card">
            <span>Level</span>
            <strong>{level}</strong>
          </div>
          <div className="stat-card">
            <span>Streak</span>
            <strong>{streak}</strong>
          </div>
          <div className="stat-card">
            <span>State</span>
            <strong>{focusState}</strong>
          </div>
        </div>

        <div className="actions">
          <button className="primary-btn" onClick={startTrial}>
            {running ? "Restart Trial" : "Start Trial"}
          </button>
        </div>

        <p className="hint">
          Press on <strong>HOLD</strong>. Lift instantly on{" "}
          <strong>RELEASE</strong>. The orb now changes color and vibrates on release.
        </p>
      </div>
    </section>
  );
}