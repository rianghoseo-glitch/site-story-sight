Put your .mp4 files here (9:16 vertical, web-optimised H.264).

Then reference them in src/components/PortfolioSection.tsx:

  { reelId: "DTuEYQTkRcG", title: "A Timeless Vow", ..., videoSrc: "/reels/a-timeless-vow.mp4" }

Tiles with a videoSrc autoplay muted on the site with zero Instagram UI.
Tiles without one fall back to a cropped Instagram embed.
