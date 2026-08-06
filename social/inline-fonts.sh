#!/usr/bin/env bash
#
# Inline the three brand faces into a social HTML file as base64 data URIs.
#
# Why: these files have to open over file:// with no server and no network.
# Chrome refuses cross-origin font loads from file://, so a sibling .woff2 will
# not reliably load; a data URI always does. It also means the wordmark cannot
# silently fall back to Arial in the middle of a screen recording.
#
# The faces are the ones next/font already fetched for the landing page, so the
# film and the page are set in identical metal. The latin subset is enough:
# nothing on screen leaves U+0000-00FF.
#
#   Schibsted Grotesk 400-900   display, and the wordmark at 700 / -0.035em
#   Geist 100-900               body and interface
#   Geist Mono 100-900          figures, per the ratified page theme
#   Roboto 400                  Gmail surfaces only. The page pins Gmail to
#                               Roboto because Gmail is set in Roboto; an
#                               inbox drawn in the page font stops reading as
#                               Gmail at exactly the size where it matters.
#
# Re-run this after editing an HTML file only if you reset its font block back
# to the /*FONTS*/ placeholder. Running it on an already-inlined file is a
# no-op and says so.
#
# Usage:  ./inline-fonts.sh [file.html ...]        (defaults to every .html here)

set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
media="$here/../web/.next/static/media"

# Latin subsets, resolved from the @font-face rules the dev server serves.
schibsted="$media/31a9145ccb84606d-s.p.3j3x29wbycqkn.woff2"
geist="$media/caa3a2e1cccd8315-s.p.0wgildi0cnwt9.woff2"
geistmono="$media/797e433ab948586e-s.p.0r6juujl39pe6.woff2"
roboto="$media/ce62453a442c7f35-s.p.0a0h245ktd4x0.woff2"

for f in "$schibsted" "$geist" "$geistmono" "$roboto"; do
  if [[ ! -f "$f" ]]; then
    echo "missing font: $f" >&2
    echo "The landing page's dev build supplies these. Start or build web/ once, then re-run." >&2
    exit 1
  fi
done

b64() { base64 < "$1" | tr -d '\n'; }

css="$(mktemp)"
trap 'rm -f "$css"' EXIT

{
  printf '/* Inlined by social/inline-fonts.sh. Same faces as the landing page. */\n'
  printf '@font-face{font-family:"Schibsted Grotesk";font-style:normal;font-weight:400 900;font-display:block;src:url(data:font/woff2;base64,%s) format("woff2")}\n' "$(b64 "$schibsted")"
  printf '@font-face{font-family:"Geist";font-style:normal;font-weight:100 900;font-display:block;src:url(data:font/woff2;base64,%s) format("woff2")}\n' "$(b64 "$geist")"
  printf '@font-face{font-family:"Geist Mono";font-style:normal;font-weight:100 900;font-display:block;src:url(data:font/woff2;base64,%s) format("woff2")}\n' "$(b64 "$geistmono")"
  printf '@font-face{font-family:"Roboto";font-style:normal;font-weight:400;font-display:block;src:url(data:font/woff2;base64,%s) format("woff2")}\n' "$(b64 "$roboto")"
} > "$css"

targets=("$@")
if [[ ${#targets[@]} -eq 0 ]]; then
  targets=("$here"/*.html)
fi

for html in "${targets[@]}"; do
  [[ -f "$html" ]] || continue
  if ! grep -q '/\*FONTS\*/' "$html"; then
    echo "skip  $(basename "$html")  (already inlined, or has no font block)"
    continue
  fi
  # Swap the placeholder for the generated CSS, keeping whatever else is on
  # that line. The placeholder sits between <style> and </style> on a single
  # line, so replacing the whole line would delete the tags and dump 130KB of
  # base64 into the document as visible text. Done in awk rather than sed so
  # the payload is never read as a replacement pattern.
  tmp="$(mktemp)"
  awk -v cssfile="$css" '
    index($0, "/*FONTS*/") {
      i = index($0, "/*FONTS*/")
      printf "%s\n", substr($0, 1, i - 1)
      while ((getline line < cssfile) > 0) print line
      close(cssfile)
      printf "%s\n", substr($0, i + 9)
      next
    }
    { print }
  ' "$html" > "$tmp"
  mv "$tmp" "$html"
  echo "ok    $(basename "$html")  ->  $(du -h "$html" | cut -f1)"
done
