# GPT-plus-plus-five

[简体中文](README.zh-CN.md)

**Get two five-hour ChatGPT Work/Codex usage windows close together when you know you will need a long work session.**

The idea is simple: start the first five-hour window early with one tiny scheduled task. Begin your real work near the end of that window, then continue after the next five-hour window begins.

## Example: heavy work starts at 8:00 AM

```text
4:00 AM   Scheduled “Hi” runs → first five-hour window starts
8:00 AM   You begin the real work
9:00 AM   The first window ends → a new five-hour window can begin
2:00 PM   The second five-hour window ends
```

This lets your concentrated work session use allowance from **two consecutive five-hour windows** instead of waiting five hours for a reset when you need more capacity.

## The entire setup

1. Open ChatGPT on your phone and enter **Work**.
2. Select **GPT-5.6 Luna** with **Light** reasoning.
3. Paste:

   > At 4:00 AM tomorrow, say “Hi” to me once.

4. Confirm the one-time scheduled task.

That is all. On the tested setup, the scheduled task automatically uses the Luna/Light configuration selected in Work. Change `4:00 AM` to suit your schedule.

## Important

This timing trick does not create extra allowance or bypass a limit. It places two normal usage windows close to the time you need them. The scheduled “Hi” consumes a small amount of the shared ChatGPT Work/Codex allowance, weekly limits still apply, and OpenAI may change the behavior. Check **Settings → Usage** to confirm your actual reset time.

Official OpenAI documentation: [usage and pricing](https://learn.chatgpt.com/docs/pricing) · [scheduled tasks](https://learn.chatgpt.com/docs/automations)

MIT licensed. Unofficial and not affiliated with OpenAI.
