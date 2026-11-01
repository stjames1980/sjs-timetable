# SJS Time Table – setup guide

St. James H.S. School · built from the Smart Timetable Generator 2026-27 (v6)

This works the same way as the **SJS Attendance** app: a free link on GitHub Pages that every phone can install. The crest shows as the phone icon.

---

## 1. Put the app online (GitHub Pages, about 5 minutes)

1. Sign in to GitHub as **stjames1980** (the same account as SJS Attendance).
2. Tap **+ → New repository**. Name it **`sjs-timetable`**, choose **Public**, then **Create repository**.
3. Tap **uploading an existing file**. Drag in **all the files from this folder**:
   `index.html, manifest.json, sw.js, config.js, icon-192.png, icon-512.png, apple-touch-icon.png, logo.png, favicon.png`
   (`firestore.rules` and this guide are optional.) Press **Commit changes**.
4. Go to **Settings → Pages**. Under *Branch*, choose **main** and **/ (root)**, then **Save**.
5. After 1–2 minutes the app is live at:
   **https://stjames1980.github.io/sjs-timetable/**

## 2. Install on a phone (shows the SJS crest icon)

* **Android (Chrome):** open the link → **⋮ → Install app** (or *Add to Home screen*). You can also use **More → Install on this phone** inside the app.
* **iPhone (Safari):** open the link → **Share → Add to Home Screen**.

> The icon only shows when the app is installed from the GitHub link. A Claude preview link always shows Claude's own icon.

## 3. Admin-only editing

**Without online sync** (works straight away): go to **More → Admin sign in** and create a PIN on the Admin's phone. Changes stay **on that phone only**.

**With online sync** (recommended – every phone gets the Admin's changes live):

1. Open <https://console.firebase.google.com> and **Add project** → name it `sjs-timetable`. Analytics can be turned off.
2. **Build → Firestore Database → Create database** (production mode, region asia-south1).
3. **Build → Authentication → Get started → Email/Password → Enable**. Then **Users → Add user**: this is the **Admin** email and password. Add only the routine in-charge (and the Principal if wanted).
4. **Firestore → Rules**: paste the contents of `firestore.rules`, replace `PUT-ADMIN-EMAIL-HERE@gmail.com` with the Admin email(s), then **Publish**.
   *Everyone can read the time table; only those emails can change it.*
5. **Project settings (⚙) → Your apps → Web (</>)** → register the app → copy the `firebaseConfig` block.
6. Pick one way to give it to the phones:
   * **Best:** edit `config.js` on GitHub and paste it, like this:
     `window.SJS_FIREBASE = { apiKey: "...", authDomain: "...", projectId: "...", appId: "..." };`
     Every phone then syncs automatically, with no setup.
   * **Or:** in the app, go to **More → Online sync & backup**, paste it, and use **Share app link (with sync)** on WhatsApp.
7. On the Admin phone, go to **More → Admin sign in** with the email and password from step 3.

> You *can* reuse the SJS Attendance Firebase project. But if its rules let every signed-in teacher write everything (`match /{document=**}`), teachers could also edit the time table. A separate project is safer.

## 4. What the Admin can do (More tab → after sign in)

| Task | Where |
|---|---|
| Change a period's subject / teacher (clash check) | Edit mode **on** → **Class** tab → tap a period |
| Room No. and Class teacher | **More → Classes**, or Class tab → *Edit room & class teacher* |
| Teacher full names, add a new teacher | **More → Teachers** |
| Subject full names | **More → Subjects** |
| Summer / Winter timing, edit times | **More → Season & period timings** |
| Undo / reset routine changes | **More → Routine changes** |
| Backup / restore | **More → Online sync & backup** |

## 5. Period adjustment (teacher absent)

1. Go to the **Adjust** tab and pick the date (it starts on today).
2. Tap **+ Absent teacher**, choose the reason, and tap the teacher(s).
3. Each period of theirs appears. Pick a substitute from the list, which shows **only free teachers**, least busy first. Or tap **⚡ Auto assign**.
4. Tap **Save & publish**. Every phone then shows *ADJUSTED / SUBSTITUTE* on that day's routine.
5. Tap **Share on WhatsApp** and choose the staff group. The message uses the school format:

```
*Substitution Routine: 2nd November, 2026, Monday*

(Sir Benjamin Lalruatfela's periods) – Sick leave
2nd- X-C - Mdm Vanthasori Molsom
...
```

The **Adjustment register** at the bottom keeps the past days. The **Free teachers** switch shows who is free in any period.

## 6. Updating the app later

Upload the new files to the same GitHub repository. In `sw.js`, change `VERSION` (for example to `sjs-tt-v2`) so phones pick up the new version.
