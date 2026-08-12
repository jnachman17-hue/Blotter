/**
 * The public contact address.
 *
 * **This lives in `lib/` rather than beside the form, and that is a fix rather
 * than tidiness.** It was first exported from `app/contact/contact-form.tsx`,
 * which carries `"use client"`. Importing a plain constant from a client module
 * into a server component does not give you the value — Next.js replaces it
 * with a client-reference stub, and the footer rendered
 * `href="mailto:function(){throw Error(...)}"`. The link looked present and was
 * dead.
 *
 * Caught by reading the served DOM rather than by looking at the page, because
 * a broken `mailto` renders as perfectly ordinary underlined text.
 *
 * Any value shared across the server/client boundary belongs in a module with
 * no `"use client"` directive. This one is imported by the contact form, the
 * contact page and the site footer.
 */
export const CONTACT_EMAIL = "blotterib@gmail.com";
