# ComfyUI-Bionic

**English** · [Français](README.md)

A Bionic-style chat right inside ComfyUI: it talks to any local OpenAI-compatible server (LM Studio, Ollama, llama.cpp), accepts text, voice, images and documents, counts the tokens of the whole conversation, and pushes the prompt into a node that runs the workflow.

## Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Quick start](#quick-start)
- [The panel](#the-panel)
- [Audio and silence detection](#audio-and-silence-detection)
- [Token counter](#token-counter)
- [Unloading the model](#unloading-the-model)
- [Settings](#settings)
- [Node and workflow](#node-and-workflow)
- [Internet access](#internet-access)
- [How it works](#how-it-works)
- [Limitations](#limitations)
- [Troubleshooting](#troubleshooting)

## Features

- Floating chat panel connected to any local OpenAI-compatible server: LM Studio, Ollama, llama.cpp or a custom address.
- **System prompt** selector next to the model: switch between saved prompts without opening the settings.
- French or English interface, switchable in ⚙ (panel and node).
- Streaming answers, collapsible reasoning, model picker in the panel.
- Vision input: 🖼 button, `Ctrl+V` paste or drag and drop, up to 6 images per message, resized to 1280 px on the long side.
- Documents: ＋ button to attach **PDF**, **DOCX** or text files (TXT, MD, CSV, JSON…), sent to the model as context.
- Audio input: 🎙 button, microphone recording and local transcription (faster-whisper), with automatic sending of the transcription.
- Automatic stop of the recording after 2 seconds of silence, with a **microphone level meter** and an **adjustable silence threshold**.
- `⧉ Copy`, `✎ Edit`, `↻ Resend` and `🔁 Repeat run` buttons under every message: `Copy` puts the whole request (text, images and attached documents) on the clipboard so it can be pasted back unchanged, `Edit` puts the request (text, images, documents) back into the input and drops the following exchanges so you can fix it, `Resend` replays the request exactly, and `Repeat run` sends it back into the chat after every finished ComfyUI run and runs the new answer, until you click `⏹ Stop`.
- Token counter **cumulative over the whole conversation**, with the prompt / answer breakdown on hover.
- ⏹ button to stop the running answer or the workflow it started.
- ⏏ button to **unload the model** from memory, whatever the server, with an option to unload it automatically after every answer.
- **Bionic Chat Prompt** node: receives the chat prompt and outputs it as a `STRING`.
- `⚡ Run` button: writes the prompt into the node, then runs the workflow, exactly like ComfyUI's Run button.
- Automatic workflow run as soon as the model finishes answering (on by default, can be turned off).
- Internet access: the model can search the web and open pages to answer (off by default).

## Requirements

- ComfyUI (tested with version 0.45).
- A local OpenAI-compatible server with at least one chat model:

| Server | Default address | How to start it |
|---|---|---|
| LM Studio | `http://127.0.0.1:1234/v1` | Developer tab → *Start server* |
| Ollama | `http://127.0.0.1:11434/v1` | `ollama serve` |
| llama.cpp | `http://127.0.0.1:9931/v1` | `llama-server -m model.gguf` (port 8080 on older builds, `--port` to change it) |

These three addresses are offered as presets in ⚙, and the field stays free-form: any server exposing `/chat/completions` works.

## Installation

```bash
cd ComfyUI/custom_nodes
git clone https://github.com/Verolelb/ComfyUI-Bionic.git
```

Install the transcription dependency into the Python used by ComfyUI:

```bash
# Windows portable install
../../../python_embeded/python.exe -m pip install -r ComfyUI-Bionic/requirements.txt

# standard install
pip install -r ComfyUI-Bionic/requirements.txt
```

Restart ComfyUI: the `💬 Bionic` button appears in the bottom right corner of the interface.

The Whisper `small` model (~480 MB) is downloaded automatically the first time you use the microphone; model size and language are set in ⚙.

PDF and DOCX support is optional and needs `pypdf` (or `PyPDF2`) and `python-docx`:

```bash
../../../python_embeded/python.exe -m pip install pypdf python-docx
```

## Quick start

1. Open the panel with `💬 Bionic`, then ⚙: pick your server (LM Studio / Ollama / llama.cpp) and check the address.
2. Choose a model in the panel's dropdown.
3. Add the **Bionic Chat Prompt** node (right click → Add Node → Bionic) and connect its `prompt` output to the `text` input of a CLIP Text Encode.
4. Type your prompt, optionally attach images, documents or dictate it, then send: when streaming ends the prompt is written into the node and the workflow is started.

If no **Bionic Chat Prompt** node exists in the graph, it is created automatically on the first Run.

## The panel

| Control | Purpose |
|---|---|
| `💬 Bionic` | opens or closes the panel |
| `⚙` | settings (server, system prompt, options, transcription) |
| list next to the model | active system prompt, picked among the prompts saved in ⚙ ("custom system prompt" when the current text is none of them) |
| `＋` | new conversation: clears the history and resets the token counter |
| `🖼` | attaches one or more images |
| `＋` in the toolbar | attaches a document (PDF, DOCX, text) |
| `🎙` | starts or stops the microphone recording |
| `🌐` | enables or disables the model's Internet access |
| `⏏` | unloads the model loaded on the server |
| `⏹` | stops the running answer, or the workflow that is running |
| `⚡ Run` | sends the text into the node and runs the workflow |
| `Send` | sends the message to the model |

Any reasoning appears in a collapsible block above the answer, and every answer has a `Copy` button. Under each of your own messages, `✎ Edit` loads the request back into the input — the message and everything after it are removed, so you can fix it and send again — and `↻ Resend` replays the request exactly, images and documents included. The `⧉ Copy` button next to `✎ Edit` copies the entire request — text, images and documents — so pasting it back with `Ctrl+V` restores it unchanged, and pasting it into another app gives you the text plus the document contents. The `🔁 Repeat run` button turns the request into a loop: every time a ComfyUI run finishes, the request goes back into the chat as if you had just typed it, the model's answer is sent to the workflow straight away, and so on; `⏹ Stop`, a failed run, an interrupted run or an empty answer end the repetition.

## Audio and silence detection

The 🎙 button records the microphone, then the server transcribes the audio locally with faster-whisper (CPU, `int8`). The text is added to the input field; if **Automatic sending of the transcription** is on, the message is sent right away, and the workflow follows when automatic run is on.

**Stop on silence** (off by default): with the option checked, recording stops after **2 seconds of silence**, then transcription, sending and the workflow follow without touching the keyboard.

While recording, a **level meter** appears next to the timer:

- the bar follows the measured level and turns **green** while you speak;
- a **red marker** shows the silence threshold;
- the timer shows the countdown, for example `● 00:03 · silence 1.2/2 s`;
- hovering the meter gives the current level in dB.

The **silence threshold** is set in ⚙ (slider from **-70 dB to -15 dB**, **-45 dB** by default):

- silence is never detected, or the countdown never starts: **lower** the threshold;
- it cuts while you are speaking, or background noise restarts the countdown: **raise** it.

Detection needs at least 0.5 s of speech before it arms, and a short noise (breath, keyboard) no longer resets the countdown: it only slows it down.

## Token counter

- The displayed number is the **conversation total**: every prompt sent plus every answer generated, across all requests. It does not restart for each message.
- While generating it grows as an estimate (`≈ 837 tok`), then settles on the exact total once the server reports its `usage`.
- The tooltip gives the breakdown: "Conversation total — prompt: 645 · answers: 192 · 3 request(s)". It adds "estimate" when the server reported no `usage`.
- The ＋ button (new conversation) resets it.

## Unloading the model

The ⏏ button queries the configured server and picks the right method per backend:

| Server | Method used |
|---|---|
| LM Studio 0.4+ | `GET /api/v1/models` to find loaded instances, then `POST /api/v1/models/unload` |
| llama.cpp (router mode only) | `POST /models/unload` |
| Ollama | `POST /api/generate` with `keep_alive: 0` |

The panel shows the backend and the unloaded model, then refreshes the model list. A server exposing none of these routes gets an explicit message (LM Studio 0.4+, Ollama, or llama.cpp in router mode are required).

A `llama-server` started with a model via `-m` has **no** unload route: the model is the process itself. Bionic detects that case (`GET /props` then answers with `model_path`) and says so instead of the generic message. To get the ⏏ button back, restart it in router mode (no `-m`, with `--models-dir <folder>` or `--models-preset <file.ini>`); the model id then becomes its file name, to be picked once again in the panel. Failing that, `--sleep-idle-seconds 600` frees the model after idling, in both modes.

The **Unload the model automatically after each answer** option does the same without a click, after every answer and after every `⚡ Run`: the GPU goes back to ComfyUI immediately, at the cost of reloading the model on the next message.

## Settings

The ⚙ button in the panel lets you change:

| Setting | Default | Purpose |
|---|---|---|
| Interface language | French | panel and node messages |
| Preset address | — | LM Studio / Ollama / llama.cpp / custom |
| Server (OpenAI compatible) | `http://127.0.0.1:1234/v1` | free-form, `/chat/completions` appended when missing |
| System prompt | Bionic prompt | up to **128,000 characters** |
| Temperature | `0.8` | model creativity |
| Maximum tokens per answer | `8192` | longest answer allowed, from 256 to 32768 |
| Run the workflow automatically after the answer | on | queues the Run after streaming |
| Automatic sending of the audio transcription after the microphone | on | sends the dictated text without a click |
| Stop recording after 2 s of silence | off | stops the microphone on its own |
| Silence threshold | `-45 dB` | from `-70 dB` to `-15 dB` |
| Unload the model automatically after each answer | off | frees GPU memory |
| Internet access (web search + URL opening) | off | server-side web tools |
| Audio transcription model | `small` | `tiny`, `base`, `small`, `medium`, `large-v3` |
| Transcription language | French | French, English, auto-detect, Spanish, German, Italian |

Settings are saved in `bionic_chat/config.json` inside ComfyUI's user directory. The chosen model is stored there too, but it is picked from the panel's list.

A system prompt can be kept under a name: type the name next to the field, click 💾, then pick it in the list just below to load it (`Load`) or delete it (🗑). Those named prompts live in `bionic_chat/prompts.json`.

A value that is already saved is never overwritten: coming from an earlier version, the token field may still show `4096`, and raising it is up to you. A value above the model's context window makes the server return an error.

**After updating the repository, restart ComfyUI**: the Python server has to reload `bionic_server.py` to accept the new settings. Refreshing the page only reloads the interface.

## Node and workflow

- The **Bionic Chat Prompt** node (category `Bionic`) exposes a multiline `prompt` input and a `STRING` output named `prompt`.
- `⚡ Run` writes the prompt into the node, then queues the workflow like ComfyUI's Run button.
- With automatic run on, the same happens at the end of streaming, without a click.
- `⏹` stops the current generation; used while nothing is generating, it interrupts the running workflow.

## Internet access

When 🌐 is on (panel button or ⚙ setting), the server gives the model two tools:

- `web_search`: Bing search without an API key, with a DuckDuckGo fallback;
- `open_url`: reads the text of a page, to go beyond a snippet.

The server runs the tool-calling loop (3 rounds maximum, then a forced text answer) and sums the tokens of every round. Local and private addresses are rejected, so a model cannot reach the internal network.

## How it works

- `nodes.py`: the `BionicChatPrompt` node (`STRING` output).
- `bionic_server.py`: `/bionic_chat/config`, `/bionic_chat/prompts` (named system prompts), `/bionic_chat/chat` (streaming proxy to the configured server), `/bionic_chat/transcribe` (local Whisper), `/bionic_chat/document` (PDF / DOCX / text extraction) and `/bionic_chat/unload` (model freeing) routes.
- `web/bionic_chat.js` and `web/bionic_chat.css`: chat panel, audio recording, level meter and silence detection, attachments, cumulative counter and workflow triggering.
- The microphone is sent as 16 kHz mono WAV; the server converts the audio back to that format before transcribing.
- The counter reads the server's `usage` field (`stream_options: {include_usage: true}`); without `usage`, an estimate is used.

## Limitations

- Transcription starts after recording stops: no real-time word-by-word transcription.
- Transcription runs on the CPU in `int8`; `small` stays fast, `medium` and `large-v3` are much slower.
- PDFs require `pypdf` or `PyPDF2`, DOCX requires `python-docx`: without them those formats are refused (text files always work).
- Documents are limited to 3 per message, 20 MB and 60,000 characters each; audio is limited to 30 MB per recording.
- Conversation history is not kept between two page reloads (so the counter starts over).
- The token counter depends on the `usage` reported by the server; otherwise it is an estimate (~3.8 characters per token).
- Unloading only works when the server exposes it: a `llama-server` started with a single model (`-m`, no router mode) has no `/models/unload`; the panel reports it and says how to restart it.
- Web search goes through Bing (DuckDuckGo fallback) without an API key: results vary with the availability of those engines.
- Silence detection depends on the microphone and the room noise: tune it with the threshold.

## Troubleshooting

| Symptom | What to check |
|---|---|
| No model in the list | the local server is not running, or the address/port is wrong |
| "Server unreachable" | check the port in ⚙: LM Studio 1234, Ollama 11434, llama.cpp 9931 |
| A new checkbox does not stay checked | restart ComfyUI: the server has not reloaded the new settings yet |
| Silence is never detected | lower the threshold, and check that the meter bar rises when you speak |
| Recording cuts in the middle of a sentence | raise the silence threshold |
| The first recording is slow | the Whisper `small` model is downloading on first use |
| PDF or DOCX refused | install `pypdf` and `python-docx` |
| Unloading fails (llama.cpp) | the server runs a single model: restart it without `-m`, with `--models-dir` or `--models-preset` |
| The answer is cut off mid-sentence | raise **Maximum tokens per answer** in ⚙ |
| Web search returns nothing | try again later: the queried engines are public and keyless |
