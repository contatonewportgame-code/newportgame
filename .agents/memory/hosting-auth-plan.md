---
name: Hosting and authentication plan
description: Newportgame's chosen order for public hosting and later Google login.
---

For Newportgame, host the public catalog on Vercel first and implement Google login afterward. Do not rely on Replit-managed Clerk for the Vercel deployment; use an independent Clerk instance or another identity provider, with credentials stored securely in Vercel.

**Why:** The user chose this sequence, and Replit documentation says Replit-managed Clerk depends on Replit infrastructure. The current workspace has no Clerk setup configured.

**How to apply:** Keep the initial Vercel deployment public and static. Reassess authentication and whether the separate Express service needs to be deployed when implementing Google sign-in.
