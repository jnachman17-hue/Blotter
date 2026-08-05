# Section 2 formal asset — Goldman Sachs rejection email

Date added: July 31, 2026  
Status: Formal exact implementation asset  
Surface: Landing-page Section 2 consequence visual  
Controlling build specification: `../../ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`

## Asset package

Authoritative exact source, supplied by Jon August 4, 2026:

`goldman-sachs-rejection-email-exact-v2.html`

- self-contained, no external resource references
- SHA-256: `c8b08e76730e4d8ccbb4f4a5ba163839ed1fe6f5b71bc4f055cae14a8feb3a6f`
- verified to contain the exact subject, sender, sender address, recipient,
  timestamp, body, signature, and footer actions required by the build specification
- contains no em or en dashes in visible copy

Superseded supplemental reconstruction, retained for reference only:

`goldman-sachs-rejection-email-exact-v1.html`

## Removed asset

`goldman-sachs-rejection-email-exact-v1.webp` was removed August 4, 2026.

It was intrinsically truncated and could not be decoded: `13,676` stored bytes against a
RIFF-declared total of `29,672`. It was documented as a hard implementation gate while being
unusable, which blocked Section 2. Git history retains the file.

## Authority

This package is not directional.

`goldman-sachs-rejection-email-exact-v2.html` is the exact desktop target at the native
`1180 × 560` viewport. The implementation must match it under side-by-side review.

The implementation translates this source into the project's React and CSS component system.
The rendered result must remain visually equivalent to the source in a close side-by-side
comparison. Do not redesign it into a generic email card.

The ratified build specification controls:

- how the asset is placed in Section 2;
- the two external annotations;
- its relationship to the four figures and supporting copy;
- responsive checkpoints;
- explicit exclusions;
- acceptance criteria.

## Exact desktop dimensions

- Width: `1180px`
- Height: `560px`

The asset may scale uniformly to fit the approved desktop container. Meaningful content must not be cropped during the first desktop checkpoint.

## Exact visible email

Subject:

`RE: First Round Interview Invitation · Deadline Passed`

Sender:

`Goldman Sachs Campus Recruiting <campusrecruiting@goldmansachs.com>`

Recipient:

`david.solomon@gmail.com`

Timestamp:

`Wed, Jan 20, 8:07 AM (5 hours ago)`

Body and signature are preserved exactly in the HTML and repeated in the controlling build specification.

## Asset handling

- Use the WebP as the visual truth.
- Use the HTML only as a supplemental structural and text reference.
- Do not change Goldman Sachs to Evercore.
- Do not rewrite the email.
- Do not add additional messages.
- Do not simplify it into a single floating email card.
- Do not embed Blotter UI inside the Gmail visual.
- Do not add warning stamps, rejection graphics, or animation.

## Claim-safety note

This is an illustrative designed scenario. It is not documentary evidence of an authentic Goldman Sachs email. Internal documentation and implementation discussion must not describe it as a genuine received email.

## Related files

- Build specification: `../../ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`
- WS5 governor: `../../WS5-SPEC.md`
- Visual-reference inventory: `../README.md`
