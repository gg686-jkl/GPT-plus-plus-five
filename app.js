const WINDOW_HOURS = 5;

export function calculateWindow(workStart, resetDelayHours = 1) {
  if (!(workStart instanceof Date) || Number.isNaN(workStart.getTime())) {
    throw new TypeError("workStart must be a valid Date");
  }

  const delay = Number(resetDelayHours);
  if (!Number.isFinite(delay) || delay < 0 || delay >= WINDOW_HOURS) {
    throw new RangeError("resetDelayHours must be at least 0 and less than 5");
  }

  const hour = 60 * 60 * 1000;
  const resetAt = new Date(workStart.getTime() + delay * hour);
  const warmupAt = new Date(resetAt.getTime() - WINDOW_HOURS * hour);
  const secondWindowEndsAt = new Date(resetAt.getTime() + WINDOW_HOURS * hour);

  return { warmupAt, resetAt, secondWindowEndsAt };
}

export function taskPrompt(workStart) {
  const date = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  }).format(workStart);

  return `At the scheduled time, reply only with: Ready for my focused work session on ${date}.`;
}

function localInputValue(date) {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function parseLocalDate(value) {
  return value ? new Date(value) : new Date(Number.NaN);
}

function formatDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

function init() {
  const form = document.querySelector("#planner");
  if (!form) return;

  const startInput = document.querySelector("#work-start");
  const delayInput = document.querySelector("#reset-delay");
  const result = document.querySelector("#result");
  const copyButton = document.querySelector("#copy-prompt");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(8, 0, 0, 0);
  startInput.value = localInputValue(tomorrow);

  function render() {
    try {
      const workStart = parseLocalDate(startInput.value);
      const timing = calculateWindow(workStart, delayInput.value);
      const prompt = taskPrompt(workStart);

      document.querySelector("#warmup-at").textContent = formatDate(timing.warmupAt);
      document.querySelector("#start-at").textContent = formatDate(workStart);
      document.querySelector("#reset-at").textContent = formatDate(timing.resetAt);
      document.querySelector("#ends-at").textContent = formatDate(timing.secondWindowEndsAt);
      document.querySelector("#task-prompt").textContent = prompt;
      result.hidden = false;
      form.querySelector("[role=alert]").textContent = "";
    } catch (error) {
      result.hidden = true;
      form.querySelector("[role=alert]").textContent = error.message;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  copyButton.addEventListener("click", async () => {
    const prompt = document.querySelector("#task-prompt").textContent;
    await navigator.clipboard.writeText(prompt);
    copyButton.textContent = "Copied";
    window.setTimeout(() => (copyButton.textContent = "Copy prompt"), 1600);
  });

  render();
}

if (typeof document !== "undefined") init();
