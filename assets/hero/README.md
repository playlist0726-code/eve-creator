# Hero brand animation assets

Drop the First Frame hero (character → "First Frame" morph) files here, using these exact
names so the site can wire them without changes:

- `first-frame-hero.webm`      — main loop, 16:9, transparent or off-white (#EEF0F4)
- `first-frame-hero.mp4`       — Safari/H.264 fallback, 16:9
- `first-frame-hero-1x1.webm`  — optional square version for mobile
- `first-frame-hero.jpg`       — poster still = the LAST frame (the "First Frame" wordmark),
                                  used for loading + prefers-reduced-motion

Keep each file small (ideally < 2 MB) so the home hero stays fast. Muted, autoplay, looped.
Make sure `assets/` is NOT gitignored so these commit and deploy to Vercel.
