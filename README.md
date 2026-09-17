# Plus Double Five

A tiny planner for aligning a five-hour ChatGPT Work/Codex usage window with a focused work session.

If you expect to start a large session at 08:00 and want the next window to begin at 09:00, schedule one minimal task for 04:00. That first window then reaches its five-hour boundary one hour into your session.

> [!IMPORTANT]
> This does **not** double, bypass, or add usage. The warm-up task consumes the same shared allowance, weekly limits may also apply, and OpenAI can change plan behavior. Always verify the reset time shown in **Settings → Usage**.

## Why this can be useful

OpenAI's documentation says:

- ChatGPT Work and Codex share usage.
- Plus usage is estimated in five-hour periods; it is not a fixed message count.
- Scheduled tasks can run in the background on supported ChatGPT surfaces.
- Consumption varies by model, context, reasoning, tools, retrieval, and caching.

The planner performs only date arithmetic. It never signs in, reads your account, creates a task, or sends analytics.

## Try it

Open `index.html` locally or serve the directory:

```bash
python3 -m http.server 8080
```

Then visit <http://localhost:8080>.

## Formula

```text
warm-up time = work start + desired reset delay - 5 hours
```

Example:

```text
work start:    08:00
reset delay:   1 hour
warm-up task:  04:00
next window:   09:00
```

Use a one-time task with the lightest eligible model available to your plan. Delete or leave the completed task inactive afterward; there is no benefit to making it recurring unless your work schedule truly recurs.

## Verify the assumption

Before relying on this for important work:

1. Create a one-time minimal task.
2. After it runs, open **Settings → Usage** or run `/status` in Codex CLI.
3. Confirm the reset time matches the expected five-hour boundary.
4. Check the weekly allowance too.

If your account shows different behavior, trust the product's Usage screen—not this project.

## Development

There are no runtime dependencies.

```bash
npm test
```

## Sources

- [OpenAI: pricing and usage limits](https://learn.chatgpt.com/docs/pricing)
- [OpenAI: scheduled tasks](https://learn.chatgpt.com/docs/automations)

This project is unofficial and is not affiliated with or endorsed by OpenAI.

## Contributing

Bug reports and small pull requests are welcome. Please avoid claims about account behavior unless they can be reproduced and clearly label observations that are not documented guarantees.

## License

[MIT](LICENSE)
