export interface ShowcaseVideo {
  title: string;
  youtubeId: string;
}

// Hosted on a personal YouTube channel, not a KAKA Group / Shams Ul Haya
// channel — always played through the on-site VideoModal (youtube-nocookie
// embed) rather than linked out, so visitors never land on that channel page.
export const SHOWCASE_VIDEOS: ShowcaseVideo[] = [
  { title: "Quick Look: Export in Action", youtubeId: "xFw_-XsES2c" },
  { title: "Full Video: Our Export Process", youtubeId: "BsA1I1vZ7To" },
];
