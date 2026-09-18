# Code Walkthrough

Plain-language notes on how this app currently works, file by file. No functional changes — just documentation, for relearning the codebase before we touch anything.

## Files at a glance

| File | Job |
|---|---|
| [index.html](index.html) | Page structure/skeleton — the elements on screen |
| [style.css](style.css) | Visual styling — colors, borders, layout |
| [main.js](main.js) | Behavior — computing and updating the time, handling the toggle button |

No build tools, no frameworks, no npm packages — the browser reads these three files directly.

## index.html

- `<link href="style.css" rel="stylesheet">` in the `<head>` pulls in the CSS.
- `<script src="main.js">` at the bottom of `<body>` pulls in the JS. It's placed at the end of the body (not in `<head>`) so the HTML elements above it already exist in the page by the time the script runs and tries to grab them with `getElementById`.
- Key elements JS hooks into, by `id`:
  - `current-date` (a `<p>`) — filled in with today's date.
  - `current-time` (a `<p>`) — filled in with the ticking clock, starts as a static placeholder `00:00:00`.
  - `toggle` (a `<button>`) — switches between 12-hour and 24-hour display.
- Small oddity: `id="current-date";` and `id="current-time";` both have a stray `;` inside the tag. Browsers ignore it silently (it just becomes part of the tag, not a real attribute), so it's harmless, but it's not valid HTML.

## style.css

- `body { background-color: black; }` sets the dark theme.
- `.clock` uses `display: flex`, which lays its two children (`.date` and `.time`) out side by side horizontally instead of stacking them — that's the whole reason the date and time appear next to each other.
- `.options` also uses `display: flex`, same idea, for the settings row.
- The red 10px borders around `header`, `.date`, `.time`, and `.option` are what create those boxed panels you see around each section.
- `.current_date` and `.current_time` classes are defined here but **not actually used anywhere in the HTML** — the real elements use the `date`/`time`/`current-date`/`current-time` ids/classes instead. Leftover from an earlier version, presumably.

## main.js — the logic

**Setup (runs once, when the page loads):**
```js
militaryTime = false;
const today = new Date();
```
- `militaryTime` is a global flag tracking which display mode we're in (starts in 12-hour mode).
- `today` captures the date/time at the *moment the page loads* — this copy is only used once, to print the date. It is not what updates every second (see below).

```js
const date = document.getElementById('current-date');
date.textContent = today.toLocaleString('en-us', options);
```
This writes the formatted date (e.g. `9/18/2026`) into the page one time, on load. Since `today` is never recalculated, **the date on screen won't update if the app is left open past midnight** — it's frozen at whatever date the page was opened.

**`increment()` — runs every second, does the actual clock ticking:**
```js
function increment() {
  let currentTime = document.getElementById('current-time');
  let today = new Date();   // fresh timestamp, every call
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
```
Unlike the date setup above, this grabs a brand-new `Date()` every single time it runs, so the *time* portion stays accurate (the date bug above is specific to the date text, not the clock).

```js
  if (hours === 0) hours = 12;         // midnight (0:xx) displays as 12
  if (minutes < 10) minutes = "0" + minutes;   // zero-pad to "05" etc.
  if (seconds < 10) seconds = "0" + seconds;

  meridiem = hours > 12 ? 'PM' : 'AM';
```
This line decides AM/PM **before** hours has been converted down to 12-hour format below — worth remembering for later, since at exactly noon (`hours === 12`), this evaluates `12 > 12` as `false` and prints "AM" instead of "PM". Not fixing it now, just flagging it since we noticed it earlier.

```js
  if (militaryTime == true) {
    time = `${hours}:${minutes}:${seconds}`;
    currentTime.innerHTML = time;
  } else {
    hours = hours > 12 ? hours - 12 : hours;
    currentTime.textContent = `${hours}:${minutes}:${seconds} ${meridiem}`;
  }
}
```
- Military mode: prints raw 24-hour `hours` (e.g. `14:05:09`), no AM/PM.
- Standard mode: *now* converts `hours` down to 12-hour format (e.g. 14 → 2) and appends the meridiem computed earlier.

**The toggle button:**
```js
const toggle = document.getElementById("toggle");

toggle.addEventListener("click", function () {
  setInterval(increment, 1000);
  militaryTime = !militaryTime;
});

setInterval(increment, 1000);
```
- The clock starts ticking immediately on page load via the standalone `setInterval(increment, 1000)` at the bottom.
- Clicking the toggle button flips `militaryTime` (true ↔ false), which is what actually switches the display format on the next tick.
- Worth noting: the click handler *also* calls `setInterval(increment, 1000)` again every time it's clicked. Since `increment` is idempotent (it just re-renders the same clock each time), this doesn't cause a visible bug, but it does mean every click leaves an extra timer running in the background permanently — clicking the button 5 times means 6 timers are now all calling `increment()` every second, forever. Minor memory/performance leftover, not user-visible at this scale.

## Summary of things noticed (not changed)

1. Noon (12:00 PM) incorrectly displays "AM" — the meridiem check happens before the hour is converted to 12-hour format.
2. The date display freezes at page-load time and won't roll over at midnight if left open.
3. Every click of the toggle button stacks an additional, redundant `setInterval` timer instead of reusing the existing one.
4. Two CSS classes (`.current_date`, `.current_time`) are defined but unused.
5. Stray semicolons inside two HTML `id` attributes (harmless, but not valid HTML).

These are good candidates for our next round of changes on `feature/clock-fixes` once you're ready.
