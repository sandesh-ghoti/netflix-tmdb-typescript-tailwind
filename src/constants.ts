export const TMDB_API_KEY = process.env.TMDB_API_KEY;
export const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";
export const YT_THUMBNAIL_URL = "https://i.ytimg.com/vi/";
//https://i.ytimg.com/vi/SzINZZ6iqxY/hqdefault.jpg
export const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
export const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN;
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
export const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;
export const FIREBASE_MESSAGING_SENDER_ID =
  process.env.FIREBASE_MESSAGING_SENDER_ID;
export const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID;
export const FIREBASE_MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID;
export const IMG_CONFIG = {
  base_url: "http://image.tmdb.org/t/p/",
  secure_base_url: "https://image.tmdb.org/t/p/",
  backdrop_sizes: ["w300", "w780", "w1280", "original"],
  logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
  profile_sizes: ["w45", "w185", "h632", "original"],
  still_sizes: ["w92", "w185", "w300", "original"],
};
export const SUPPORTED_LANGUAGES = [
  { identifier: "en-Us", name: "English" },
  { identifier: "hn", name: "Hindi" },
  { identifier: "es", name: "Spanish" },
];
