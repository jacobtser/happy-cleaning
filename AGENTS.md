<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Persistent notes: Dangme TTS (work in progress)

## Paths
- Project: `C:\Users\jacob\OneDrive\Desktop\Audio Engineering\dangme_tts`
- Canonical source recordings: `C:\Users\jacob\OneDrive\Desktop\Audio Engineering\full tts recordings`
- Candidate correction recordings (not yet applied): `C:\Users\jacob\OneDrive\Desktop\Correction audios`
- Prepared store: `dangme_tts/data/units/` (`inventory.json`, `metadata.csv`, `wavs/`, `features/`, `qa_tags.json`)
- Read-only source project: `C:\Users\jacob\OneDrive\Desktop\TESTING\bot3tts` — never modify it.
- This notes file: `C:\Users\jacob\AGENTS.md`

## Undertakings / invariants (do not regress)
- Closed phonetic inventory only. Unknown text must raise `TokenizationError`; no `<unk>`, no letter-to-sound guessing, no silent fallback.
- No fabricated Dangme sentences. Only real native-speaker sentence, drill and rare-word recordings may be used for utterance work.
- Vowel key: `A = À` for every vowel; `Ã = Ã̀` for every vowel except E/O; plain and tilde forms stay acoustically distinct. Tilde+grave copies from the tilde source, never from plain. E/O have grave aliases only.
- Re-recorded plain source files are canonical. When a plain source that feeds aliases is corrected/re-recorded, re-prepare the corpus so all mapped grave/tilde-grave units are refreshed together.
- Voice-safe cleanup: remove only confidently unvoiced silence/noise; never remove or attenuate detected voice; overlapping noise stays until the unit is re-recorded. No aggressive gating.
- Numbers always use dedicated recordings; words use basic phonetic recordings. No phonetic fallback for numbers.
- Decimal point is the single recorded word `NGMLÓBI` (`NGMLÓBI.wav`), never `NGMLÓ` + `BÍ` as two units.
- QA tags are `breakages`, `silences`, `worng word` (spelling is intentional). Tags persist in `data/units/qa_tags.json`; reports go to `qa_reports/` (`.` in the UI means project root).
- Back up `qa_tags.json` before any `ttsforge.prepare` run because `--overwrite` clears `data/units`; restore it afterwards.

## User's exact carry-forward note
after the correction of the audios that are to be recorded ( the plain ones that are mapped to some other ones are done for the new recording)

Meaning in practice: the plain source recordings that map to other units have been re-recorded for the new recording set; the remaining noisy/broken units are still outstanding and will be handled in later sessions. Preserve this note verbatim.

## Progress as of 2026-11-26
- Voice-safe cleanup is implemented in `ttsforge/audio.py` and used by `prepare.py` and `utterances.py`; raw source WAVs are untouched.
- Number routing lives in `ttsforge/number_audio.py` and is wired into `demo_engine.py`, `infer.py` and `demo_app.py`. Modes: `digits` (default), `all`, `off`.
- `NGMLÓBI.wav` was copied from the read-only bot3tts corpus into the canonical recording directory and included in a fresh prepare. Plans now resolve `3.14 → 3 KƐ NGMLÓBI 1 4` and `0.5 → NGMLÓBI 5`.
- Prepared store: **1,521 units**, 9 WORLD variants, 0 rejected, 0 WORLD failures, 1,435/86 train/val split, ~910.3 s processed audio. 372 vowel-alias links; verified `BA = BÀ`, `BA ≠ BÃ`, `BÃ = BÃ̀`. One unexplained duplicate group (`I͂́ / Ĩ́`) remains in `duplicate_audio_groups.csv`.
- `qa_tags.json` was backed up before re-prepare and restored (empty items after the earlier save/clear smoke test).
- QA app (`qa_app.py`) and tester (`demo_app.py`) were restarted against the 1,521-unit store at `http://127.0.0.1:7861` and `http://127.0.0.1:7862`. Port 7860 is held/reserved by Windows, so the tester now uses 7862.
- `pytest -q`: **68 passed**; `python -m compileall -q .`: clean.
- All edits are uncommitted; no commit or push has been made.

## Update 2026-11-27
- The harness restart cancelled the background shell notices, but both interfaces were still responding at `http://127.0.0.1:7861` (QA) and `http://127.0.0.1:7862` (tester).
- Added `scripts/audit_audio.py` (read-only, reuses the conservative VAD) and ran it: 1,521 units scanned, **74 heuristic candidates** flagged in `qa_reports/audio_audit_20261127_001155.csv`. Longest surviving internal gaps: `TSLƐ̃`/`TSLƐ̃̀` ~490 ms, `TĨ`/`TĨ̀` ~430 ms, `NGMLÓBI` ~370 ms, `WƐ`/`WƐ̀` ~370 ms, `NYÃ`/`NYÃ̀` ~340 ms. Alias pairs share one source, so they appear together. Flags are review candidates, not confirmed defects.
- User clarification 2026-11-27: the decimal marker must stay the **single unit `NGMLÓBI`** from the existing `NGMLÓBI.wav`; do **not** substitute `NGMLÓ` + `BÍ`, and do **not** rename the label to plain `NGMLOBI`. Verified end-to-end: `3.14 → 3 KƐ NGMLÓBI 1 4`, `0.5 → NGMLÓBI 5`, `12.05 → 10 KƐ 2 KƐ NGMLÓBI NGMLÓBI 5`; no stitching remains in any `.py` file.
- User asked 2026-11-27 for **maximum** silence/pause removal. Added `configs/aggressive_clean.yaml` as an overlay after `configs/default.yaml` (voice-detection thresholds unchanged; only non-voice frames are gated/collapsed). Subset test: default removed 0.80 s / collapsed 0.00 s; aggressive removed 4.96 s / collapsed 1.04 s. Full re-prepare with `--config configs/default.yaml --config configs/aggressive_clean.yaml`: **1,521 units**, 9 WORLD variants, 0 WORLD failures, **792.31 s** processed audio (was 910.3 s), **292.06 s removed / 47.01 s collapsed**, 441 clicks, max gate 36 dB, 1,433/88 train/val. `qa_tags.json` was backed up before and restored after. Aliases re-verified: 372 links, `BA = BÀ`, `BA ≠ BÃ`, `BÃ = BÃ̀`.
- `NGMLÓBI` root cause checked: the source had a genuine 370 ms pause at 1.500–1.870 s with a −83 dB silent floor. After the aggressive prepare that silence is gone; the surviving ~360 ms VAD "gap" is quiet speech at −45 dB (floor −39.8 dB), not silence. A full-corpus scan found **0 units** with genuine near-silence gaps ≥150 ms. `scripts/audit_audio.py` was updated to distinguish `internal_pause` (≥15 dB below the clip's noise floor) from `quiet_stretch`; latest report `qa_reports/audio_audit_20261127_005944.csv` has 41 review candidates but **0 internal_pause** flags.
- User asked again 2026-11-27 for **more** silence aggressiveness. Tightened `configs/aggressive_clean.yaml` further and added an optional blunt second pass in `ttsforge/audio.py` (`post_silence_offset_db`, `post_min_silence_ms`; off by default, only cuts whole frame windows >32 dB below the clip peak, capped at 60% of a clip). Subset: 8.47 s removed / 2.96 s collapsed (was 4.96 / 1.04). Full re-prepare: **1,521 units**, 9 WORLD variants, 0 WORLD failures, **724.89 s** processed audio, **464.89 s removed / 135.74 s collapsed**, 1,265 clicks, 40 dB gate, 1,446/75 train/val. `qa_tags.json` backed up before and restored after. Aliases re-verified: `BA = BÀ`, `BA ≠ BÃ`, `BÃ = BÃ̀`. Genuine near-silence gaps >=150 ms: **0 units**.
- `scripts/audit_audio.py` latest report `qa_reports/audio_audit_20261127_020055.csv`: 85 candidates, but **0 internal_pause**; 68 are `low_dynamic_range` (an artifact of shorter clips), 17 leading / 3 trailing pause candidates, 3 quiet stretches. `NGMLÓBI` is now 1.54 s with a 260 ms quiet-speech stretch (−45.5 dB, noise floor −39.7 dB), not silence.
- User reported `python app.py` fails with missing `checkpoints/acoustic/best.pt`. Expected: neural UI needs trained checkpoints. Current `app.py` already catches it and points to `demo_app.py`. `py 3.9 app.py` is invalid syntax and 3.9 is not installed; use plain `python` (uv 3.12) from the `dangme_tts` folder. Root `.gitignore` has `/*`, so the project tree is invisible to `git status`.
- No QA tags have been saved yet; no audio has been changed since the maximum prepare. The decision to leave `Correction audios` pending still stands.
- Added a full local recording-review gallery at `dangme_tts/qa_gallery/` (`index.html` + stdlib `server.py`) on **http://127.0.0.1:7863**. It lists all 1,521 units, supports accent-insensitive search/filters, click-to-play with a small report popup (`breakages` / `silences` / `worng word` + notes), progress counts, keyboard navigation, compatible report generation into `qa_reports/`, and no external requests. Browser evaluation: PASS (no console errors, 1,521 cards, save/report flows verified with `qa_tags.json` backed up/restored). The gallery server was started from `dangme_tts` with `C:\Users\jacob\.local\bin\python3.exe qa_gallery\server.py` and returned HTTP 200 with 1,521 units.
- `python app.py` is now the single entry point: if trained checkpoints are missing it automatically calls `demo_app.main()` with host/port from `app.py` (default fallback port **7862** because Windows reserves 7860); the trained neural UI path is untouched when checkpoints exist. Added a direct QA-gallery link (`http://127.0.0.1:7863/`) to the header of both `app.py` and `demo_app.py`. Added a tiny `Audio Engineering\app.py` shim so plain `python app.py` also works from the parent `Audio Engineering` folder (it only `chdir`s into `dangme_tts`; no project code/data is changed). The old demo_app process on 7862 was stopped so the user's own `python app.py` can bind that port.
- QA gallery upgraded (2026-11-27): every tag Save auto-regenerates latest QA reports and git-syncs them into the repo-tracked `C:\Users\jacob\dangme_tts_qa_reports\` (allowlisted in root `.gitignore`), then commits and best-effort pushes to `origin`. Added unsaved-change protection (`beforeunload`, close/navigate confirmation), Clear tags/notes, Save & Next, Ctrl+S, and dirty indicator. Checkboxes can be unchecked before saving to untag. `ttsforge.qa.generate_report` gained `timestamped=False` for lightweight latest-only auto-updates. Full pytest: 68 passed.

## Still pending
- **Noises, breakages and pauses remain in some recordings.** No QA items are tagged yet, so the affected units are not yet confirmed. Use the new gallery at `http://127.0.0.1:7863` (or the older QA app at `http://127.0.0.1:7861`) to play units (start with the audit shortlist), tag `breakages` / `silences` / `worng word`, add notes and generate a report; the report lists the exact units to re-record. Overlapping noise cannot be removed safely by cleanup — re-record those units instead.
- `C:\Users\jacob\OneDrive\Desktop\Correction audios` contains 92 candidate replacement WAVs (67 match existing labels, 25 have new macron spellings). **Decision 2026-11-26: leave them pending** — do not import them into the canonical store. Tag the bad units in QA first, re-record only those units, then re-prepare and verify aliases again.
- `sentences.txt` and `rare_words.txt` are still comment-only; the native-speaker drill count was not supplied. Run `ttsforge.utterances check`, `prompts`, recording/import and `ingest` once real material exists.
- No production acoustic/vocoder checkpoints exist, so `app.py` cannot be exercised; it now points users to `demo_app.py`. T4 training notebooks have not been run end-to-end. `sounddevice` playback remains untested.
