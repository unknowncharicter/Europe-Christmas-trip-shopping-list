# Europe Trip Shopping List

A one-page shopping list for Elliot and Clara's Europe Christmas trip.
Shops are in walking order through Macquarie Centre (Level 4 down to Level 2).

## Put it on Netlify

**Easiest (drag and drop)**
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page (it has the app plus its home screen icons).
3. Netlify gives you a link. Open it on your phone.

**From GitHub**
1. In Netlify: Add new site → Import an existing project → GitHub.
2. Pick this repo. Leave the build command empty. Publish directory: `/`.
3. Deploy.

## Tips
- The **Next** button at the top shows the shop you're up to. Tap it to jump there.
- Turn on **Keep screen on** so the phone doesn't lock while you shop.
- After the first visit on the Netlify link, the app works with no signal.
- On iPhone: open the link in Safari → Share → Add to Home Screen. It then opens full screen like an app, with its own icon.
- Ticks save on that phone only.
- To change the list, edit the `STOPS` list near the bottom of `index.html`.
- If you change the app or maps, change `VERSION` at the top of `sw.js` so phones get the new copy.
- Directions maps live in the `maps` folder. Each shop's `way` entry in `STOPS` points to the map(s) to the next shop.
