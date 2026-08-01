# Section 2 formal asset — Goldman Sachs rejection email

Date added: July 31, 2026  
Status: Formal exact implementation asset  
Surface: Landing-page Section 2 consequence visual  
Controlling build specification: `../../ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`

## Asset

`goldman-sachs-rejection-email-exact-v1.html`

## Authority

This asset is not directional.

It is the exact desktop visual and content target for the Section 2 rejection-email component. Lovable must reproduce its substantive composition, Gmail chrome, spacing, sender, recipient, timestamp, subject, body, signature, and visible controls without redesigning it into a generic email card.

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

- Treat this HTML as the formal source.
- Do not replace it with the earlier nonportable Claude export.
- Do not change Goldman Sachs to Evercore.
- Do not rewrite the email.
- Do not add additional messages.
- Do not simplify it into a single floating email card.
- Do not embed Blotter UI inside the Gmail visual.
- Do not add warning stamps, rejection graphics, or animation.

Lovable may translate the HTML into React and project CSS only if the rendered desktop result remains visually equivalent under side-by-side review.

## Claim-safety note

This is an illustrative designed scenario. It is not documentary evidence of an authentic Goldman Sachs email. Internal documentation and implementation discussion must not describe it as a genuine received email.

## Related files

- Build specification: `../../ws5-build-specs/02-SECTION-2-SCALE-AND-CONSEQUENCE.md`
- WS5 governor: `../../WS5-SPEC.md`
- Visual-reference inventory: `../README.md`
