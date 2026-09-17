import test from "node:test";
import assert from "node:assert/strict";
import { calculateWindow, taskPrompt } from "../app.js";

test("places a five-hour window one hour into the work session", () => {
  const start = new Date("2026-09-18T08:00:00+08:00");
  const result = calculateWindow(start, 1);

  assert.equal(result.warmupAt.toISOString(), "2026-09-17T20:00:00.000Z");
  assert.equal(result.resetAt.toISOString(), "2026-09-18T01:00:00.000Z");
  assert.equal(result.secondWindowEndsAt.toISOString(), "2026-09-18T06:00:00.000Z");
});

test("supports a fractional reset delay", () => {
  const start = new Date("2026-01-01T10:00:00Z");
  const result = calculateWindow(start, 0.5);

  assert.equal(result.warmupAt.toISOString(), "2026-01-01T05:30:00.000Z");
  assert.equal(result.resetAt.toISOString(), "2026-01-01T10:30:00.000Z");
});

test("rejects delays outside the five-hour window", () => {
  assert.throws(() => calculateWindow(new Date(), 5), RangeError);
  assert.throws(() => calculateWindow(new Date(), -1), RangeError);
});

test("creates a deliberately tiny task prompt", () => {
  const prompt = taskPrompt(new Date("2026-01-01T10:00:00Z"));
  assert.match(prompt, /^At the scheduled time, reply only with:/);
});
