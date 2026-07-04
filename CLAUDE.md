# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Landing site for **MyWork** — a London-based services business for international students and graduates in the UK. Three service pillars: assignment/dissertation/presentation *support* (feedback, editing, proofreading), a done-for-you job application service (tailored CV + cover letter per role, submitted on the client's behalf), and a small software studio.

Static site, no framework, no build step, no dependencies: `index.html` + `styles.css` + `main.js` is the entire deployable artifact.

## Hard constraint: academic integrity copy

The single non-negotiable rule for this codebase. The site must **never** advertise writing assignments, dissertations, or other academic work *for* students to submit. Advertising contract-cheating services to students in England is a criminal offence (Skills and Post-16 Education Act 2022), and payment processors ban it. The owner has previously asked for "we'll do your assignment" framing and accepted the legal reframe — do not reintroduce it in any wording.

Practical implications:
- Service 01 is framed as "serious help, right up to the line": planning, line-level feedback, editing, proofreading, presentation polish. It may name assignments/dissertations/PPTs as the things being *supported*, never as things *produced*.
- The FAQ answer "Will you write my assignment or dissertation for me?" (answer: no) and the footer integrity statement are deliberate guardrails — keep them.
- No fake trust signals: no invented ratings, student counts, or testimonials. The testimonials section ships `hidden` with placeholder quotes until real ones exist (instructions in the HTML comment above it).

## Running

```bash
python3 -m http.server 8741   # then open http://localhost:8741
```

No lint/test tooling. Verify changes by loading the page in a browser at desktop and ~390px widths.

## Design system — "the marked-up draft"

The visual identity is a tutor's red pen on a dissertation. It was deliberately rebuilt away from the generic AI look (cream background + elegant serif + terracotta); don't drift back toward it.

- **Tokens** (all in `:root` in `styles.css`): `--paper #fafaf8`, `--ink #131720`, `--pen #c6392c` (marking-pen red), `--marker #ffe566` (highlighter yellow), `--rule #e4e4df`.
- **Type roles** (Google Fonts): Tinos = display (Times New Roman twin — the dissertation font, used huge; this is intentional, not a fallback), Archivo = body, Caveat = handwritten pen annotations, IBM Plex Mono = labels/eyebrows/numbering.
- **Signature element**: proofreader's marks. The hero headline contains a caret + handwritten "actually" insertion (`.corrected`/`.ins`/`.caret`) animated on load. Spend boldness here only; keep everything else quiet.
- **Discipline rules**: yellow appears only as text highlight (`<mark>`) and the WhatsApp chip; red only for pen marks, annotations, and small accents — buttons stay ink. Section kickers are thesis-style numbered headings (`01 · What we do` … `06 · Get in touch`) in mono; renumber if sections are added/removed.
- Dark sections (`.process`, `.contact`) use ink background with `--paper-on-ink`/`--soft-on-ink`/`--rule-dark` counterparts.

## Code patterns

- **Progressive enhancement**: `main.js` adds the `js` class to `<html>`; all scroll-reveal and annotation animation CSS is gated behind `html.js …` selectors so content is never hidden without JavaScript. Keep any new animation behind the same gate, and add a `prefers-reduced-motion` fallback (existing blocks show the pattern).
- **Scroll reveals**: add `class="reveal"` to a block and IntersectionObserver handles it. Highlighter `<mark>` sweeps are triggered by the parent `.reveal` gaining `.is-visible`.
- The contact form has no backend — it builds a `mailto:` in `main.js` (`CONTACT_ADDRESS`). Swap the submit handler for Formspree/own endpoint when one exists.
- The site is a single page; nav/footer links are `#anchors`. `scroll-margin-top` on sections accounts for the sticky header.

## Placeholders the owner still needs to replace

- Contact email `hello@mywork.org.uk` (contact section + `main.js`) — domain is live, but the mailbox/forwarding must be set up at the registrar for it to receive mail
- WhatsApp number `+44 7000 000000` / `wa.me/447000000000` (contact section + floating `.whatsapp-pill`)
- Testimonial quotes (hidden section)
