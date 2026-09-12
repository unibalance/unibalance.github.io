# Unibalance deployment

Static HTML/CSS/JavaScript, compatible with free GitHub Pages on a public repository. Firebase remains a separate service subject to its free-tier limits; domain renewal is separate.

## Firebase privacy: action required

The privacy rules in `database.rules.json` were published to the Firebase project on 12 September 2026. An unauthenticated shallow read now returns permission denied (HTTP 401).

Open Firebase Console project `unibalance-india-enquiries` → Build → Realtime Database → Rules. Replace the entire rules document with `database.rules.json` and Publish. Existing parent grants override child restrictions, so replace the whole rules document.

These rules deny browser reads, updates and deletes. They allow only new validated interest entries. Existing records remain intact. Authorized project administrators can still view/export responses in Firebase Console. The public endpoint is expected; privacy comes from security rules. These rules do not prevent spam submissions.

Alternatively, using an authenticated Firebase CLI: `firebase deploy --only database --project unibalance-india-enquiries`.

Verify an unauthenticated GET to `https://unibalance-india-enquiries.firebaseio.com/messages.json?shallow=true` returns permission denied (401/403), as does an individual-record GET. Test one submission with your own details and confirm its server timestamp in Firebase Console.

## GitHub Pages

Set repository Settings → Pages → Source to GitHub Actions. The workflow publishes only index.html, current CSS/JS, images and CNAME on a push to the repository’s existing default branch, `master`. The local checkout is named `main`; reconcile the branch names when preparing the eventual push. Set custom domain to unibalance.in and configure DNS for GitHub Pages. Existing hosting was Netlify: check domain/DNS before switching. No build dependencies or paid web server are required.

Private response exports were moved to `../unibalance-private/interest-export/`. Gitignore excludes exports and the workflow allows only public assets. Never commit service-account credentials or response exports.

## Preview and form

Run `python3 -m http.server 4173 --bind 127.0.0.1`. The form sends to the real database; use mocked requests for automated tests. REST POST creates a new `/messages` push ID with name, email, optional phone (legacy `subject`), city, message, consent, source and a Firebase server timestamp. No existing records are read and no personal information is logged in the browser.

References: https://firebase.google.com/docs/database/security and https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
