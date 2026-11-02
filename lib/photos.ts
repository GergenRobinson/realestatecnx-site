// Free stock photos from Pexels (free for commercial use, no attribution required).
// Served through Vercel image optimization; swap any of these for your own photos later.
const px = (id: number) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2000`;

export const photos = {
  phoenix: { src: px(32371656), alt: "Phoenix skyline and desert hills at sunset" },
  phoenixCity: { src: px(36181792), alt: "Downtown Phoenix towers at sunset" },
  seattle: { src: px(1796730), alt: "Seattle skyline with the Space Needle and Mount Rainier" },
  seattleNight: { src: px(29123790), alt: "Seattle skyline at twilight" },
  agentSign: { src: px(7578866), alt: "Smiling real estate agent with a for-sale sign" },
  agentTour: { src: px(8815820), alt: "Agent leading buyers on a home tour" },
  agentSold: { src: px(8469936), alt: "Agent holding a home for sale sign" },
};
