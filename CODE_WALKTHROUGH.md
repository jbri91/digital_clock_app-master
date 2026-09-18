# Code Walkthrough

Plain-language notes on how this app works, file by file, and what's changed from the original 2020 version on this `ai-assisted` branch.

## Files at a glance

| File | Job |
|---|---|
| [index.html](index.html) | Page structure/skeleton — the elements on screen |
| [style.css](style.css) | Visual styling — colors, borders, layout, typography |
| [main.js](main.js) | Behavior — ticks the clock every second, handles the toggle button |
| [format-time.js](format-time.js) | Pure formatting logic — turns raw hours/minutes/seconds into a display string, with no dependency on `Date` or the DOM |
| [test-manual.html](test-manual.html) | Standalone page that feeds edge-case values into `formatTime` and shows PASS/FAIL on screen |

Still no build tools, no frameworks, no npm packages — the browser reads all of this directly. `format-time.js` is a plain script tag, not a JS module.

## index.html

- Google Fonts (`Share Tech Mono` for the clock digits/title, `Poppins` for everything else) are linked in `<head>`, alongside `style.css`.
- Two scripts load at the bottom of `<body>`, in order: `format-time.js` first, then `main.js` — order matters here, since `main.js` calls `formatTime()`, which must already exist.
- Key elements JS hooks into, by `id`: `current-date`, `current-time`, and `toggle` (the button).

## style.css

- CSS custom properties at the top (`--bg`, `--accent`, `--accent-glow`, `--radius`) define the whole red/black palette in one place.
- `body` is a flex column that centers everything on the page, both directions — replaces the old fixed pixel margins that only happened to look centered at one screen size.
- `.date` and `.time` (and `header`) use rounded corners (`border-radius`) and a soft red `box-shadow` glow instead of flat, heavy borders.
- `clamp()` on font sizes and `flex-wrap` on `.clock` keep the layout usable on narrow screens.
- `.toggle-btn` is a real styled button with hover/active states — the original markup referenced Bootstrap classes (`btn btn-dark btn-black`) that did nothing, since Bootstrap was never actually loaded on the page.

## main.js — the logic

```js
let militaryTime = false;

const dateOptions = { year: 'numeric', month: 'numeric', day: '2-digit' };
const dateEl = document.getElementById('current-date');
const currentTime = document.getElementById('current-time');
```
`dateEl` and `currentTime` are looked up once, since the DOM elements themselves never change — only their text content does, every tick.

```js
function increment() {
  const now = new Date();
  dateEl.textContent = now.toLocaleString('en-us', dateOptions);
  currentTime.textContent = formatTime(now.getHours(), now.getMinutes(), now.getSeconds(), militaryTime);
}
```
Both the date and the time are recalculated from a fresh `Date()` every time `increment()` runs (once a second). All the actual formatting logic (12hr vs 24hr, AM/PM, zero-padding) lives in `formatTime()`, in `format-time.js` — `main.js`'s only job is to grab the current time and hand it off.

```js
toggle.addEventListener("click", function () {
  militaryTime = !militaryTime;
  increment();
});

setInterval(increment, 1000);
increment();
```
Clicking the button flips `militaryTime` and immediately calls `increment()` once, so the display updates instantly instead of waiting up to ~1 second for the next scheduled tick. The single `setInterval` keeps ticking normally afterward — there's only ever one timer running, for the life of the page.

## format-time.js

```js
function formatTime(rawHours, minutes, seconds, militaryTime) {
  const meridiem = rawHours >= 12 ? 'PM' : 'AM';
  ...
  if (militaryTime) {
    const hours = String(rawHours).padStart(2, '0');
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }

  let hours = rawHours % 12;
  if (hours === 0) hours = 12;
  return `${hours}:${paddedMinutes}:${paddedSeconds} ${meridiem}`;
}
```
This is a **pure function** — same inputs always produce the same output, no `Date`, no DOM. That's what makes it possible to test directly with made-up edge-case values (see `test-manual.html`) instead of needing to fake the system clock.

Two details worth calling out:
- `meridiem` is computed from `rawHours` (the untouched 0–23 value) *before* any 12-hour conversion happens, using `>= 12`. That ordering matters — computing it after converting to 12-hour format is what caused noon to show "AM" in the original version.
- Military mode uses `rawHours` directly (padded to 2 digits), while standard mode converts down via `rawHours % 12` (with `0` mapped to `12`). Keeping these separate is what fixed midnight showing "12:00:00" in military mode.

## test-manual.html

A plain HTML page (open it in Live Server the same way as `index.html`) that runs `formatTime()` against 9 hand-picked cases — including the exact noon and midnight scenarios that were bugged — and prints PASS/FAIL for each directly on the page. No test framework needed, since `formatTime` has no external dependencies to mock.

## History: what was fixed on this branch

1. **Noon AM/PM bug** — meridiem was computed after hours were already converted to 12-hour format, so noon (`12:00`) showed "AM" instead of "PM".
2. **Midnight-in-military-mode bug** — hours were forced to `12` unconditionally whenever they were `0`, so midnight in 24-hour mode showed "12:00:00" instead of "00:00:00".
3. **Frozen date** — the date was computed once at page load and never updated; now it's recalculated every tick.
4. **Stacking timers** — every click of the toggle button started an *additional* `setInterval`, on top of any already running; now the click only flips the flag and re-renders once.
5. **Implicit global variable** — `time = ...` (no `let`/`const`) was leaking into global scope.
6. **Dead code cleanup** — unused CSS classes, stray semicolons in HTML `id` attributes, and non-functional Bootstrap classes on the button were all removed.
