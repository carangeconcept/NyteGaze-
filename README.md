# NYTEGAZE App

The official NYTEGAZE fan app: shows, music, band pages, merch, giveaways and video.
It's a web app, so fans don't need an app store. They scan the QR code, open the app and save it to their home screen.

**Live app:** https://carangeconcept.github.io/NyteGaze-/

## Get it on your phone
- **iPhone:** open the link in Safari, tap **Share**, then **Add to Home Screen**.
- **Android:** open the link in Chrome and tap **Install** when it pops up (or ⋮ menu → **Install app**).

## QR codes (in the `qr` folder)
- `nytegaze-app-qr.png`: the QR code on its own, for flyers, merch tags and stickers.
- `nytegaze-get-the-app-card.png`: a printable 4×6 "Get the app" card for the merch table.

## How to update the app
All the band info lives in one block near the top of the `<script>` in `index.html`, marked **EDIT YOUR BAND INFO HERE**:

| What | Where in that block |
|---|---|
| Band bio, booking email | `bio`, `bookingEmail` |
| Band social links | `socials` |
| Member names, bios, facts, socials, photo | `members` (add `photo:"img/name.jpg"`) |
| Shows | `shows`: dates are `YYYY-MM-DD`. Put flyers in `img/flyers/` and set `flyer:"img/flyers/name.jpg"` |
| Past-show photos & videos | `media:[ ...links... ]` on that show. Paste Google Drive, YouTube, Instagram or TikTok links. Add `#video` to the end of a Drive video link. `driveFolder:` adds the whole folder. |
| Songs | `tracks` (add `src:"music/song.mp3"`). `bg:true` makes a song the soft background music, `loop:true` repeats it. |
| Videos | `videos` (add `src:"video/clip.mp4"`) |
| Merch | `merch` |
| Giveaway | `giveaway` (title, description, end date) |

On GitHub you can edit `index.html` right in the browser (pencil icon) and upload images, songs and videos with **Add file → Upload files**.
Changes go live about a minute after you save. Fans see them the next time they open the app.

If you change any image or icon, also change `VERSION` in `sw.js` (for example `nytegaze-v2`) so phones pick up the new files.

## Google Drive folders (synced nightly)
Drop files into the NYTEGAZE folder in Google Drive and the nightly sync adds them to the app:
- `Members/Naya`, `Members/Dana`, `Members/Augie`, `Members/Josh`, `Members/Drummer`: photos of that person.
- `Shows/YYYY-MM-DD Venue`: photos and videos from that show.
- `Flyers`: new show flyers. The date, time, venue and lineup are read from the flyer.

## Showing photos from Google Drive
Share each file or folder as **Anyone with the link → Viewer**, or it won't appear in the app.
Shows move from Upcoming to Past on their own once the date passes.

## Still to do
- Giveaway entries, fan wall posts and mailing-list signups are only saved on each fan's phone for now.
  They need a small backend (for example Firebase or Supabase) before a real giveaway runs.
- Real songs, videos, photos, flyers and member info.

## Files
- `index.html`: the whole app
- `manifest.webmanifest`: app name, colors and icons for "Add to Home Screen"
- `sw.js`: lets the app open offline and load fast
- `img/`: logo and app icons
- `qr/`: QR codes for printing
