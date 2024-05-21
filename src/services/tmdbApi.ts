/**
 * CREDIT: https://github.com/blakejoy/tmdb-ts/tree/main
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, TMDB_ACCESS_TOKEN } from "../constants";
import {
  TrendingResults,
  TopRatedMovies,
  TopRatedTvShows,
  MoviesPlayingNow,
  OnTheAir,
  UpcomingMovies,
  TvShowsAiringToday,
  Videos,
  TvShowDetails,
  MovieDetails,
  SimilarMovies,
  SimilarTvShows,
  Credits,
  Search,
  MultiSearchResult,
  MovieDiscoverResult,
  TvShowDiscoverResult,
  MovieList,
  MovieLists,
} from "tmdb-ts";
import {
  MediaParamsOptions,
  MovieParamsOptions,
  ParamsOptions,
  TokenRequest,
  TvSeasonParamsOptions,
  TvShowParamsOptions,
  UserMediaParamsOption,
  UserParamsOption,
} from "../utils/commonTypes";
import { AccountDetails } from "tmdb-ts/dist/types/account";
const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${TMDB_ACCESS_TOKEN}`);
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      // Trending Movies (Week)
      getTrendingMoviesWeek: builder.query<
        TrendingResults<"movie">,
        ParamsOptions
      >({
        query: (params = { page: 1 }) => {
          return { url: `trending/movie/week`, params: params };
        },
      }),

      // Trending TVs (Week)
      getTrendingTvsWeek: builder.query<TrendingResults<"tv">, ParamsOptions>({
        query: (params) => {
          return { url: `trending/tv/week`, params: params };
        },
      }),

      // Trending Movies (Day)
      getTrendingMoviesDay: builder.query<
        TrendingResults<"movie">,
        ParamsOptions
      >({
        query: (params) => {
          return { url: `trending/movie/day`, params: params };
        },
      }),
      // Trending TVs (Day)
      getTrendingTvsDay: builder.query<TrendingResults<"tv">, ParamsOptions>({
        query: (params) => {
          return { url: `trending/tv/day`, params: params };
        },
      }),
      // Top Rated Movies
      getTopRatedMovies: builder.query<TopRatedMovies, ParamsOptions>({
        query: (params?) => {
          return { url: `movie/top_rated`, params: params };
        },
      }),
      // Top Rated TVs
      getTopRatedTvs: builder.query<TopRatedTvShows, ParamsOptions>({
        query: (params) => {
          return { url: `tv/top_rated`, params: params };
        },
      }),
      // Now Playing Movies
      getNowPlayingMovies: builder.query<MoviesPlayingNow, ParamsOptions>({
        query: (params) => {
          return { url: `movie/now_playing`, params: params };
        },
      }),
      // Now on the air tv series
      getOnTheAirTvs: builder.query<OnTheAir, ParamsOptions>({
        query: (params) => {
          return { url: `tv/on_the_air`, params: params };
        },
      }),
      // upcoming Movies
      getUpcomingMovies: builder.query<UpcomingMovies, ParamsOptions>({
        query: (params) => {
          return { url: `movie/upcoming`, params: params };
        },
      }),
      // airing today tv series
      getAiringTodayTvs: builder.query<TvShowsAiringToday, ParamsOptions>({
        query: (params) => {
          return { url: `tv/airing_today`, params: params };
        },
      }),
      getTVShowDetails: builder.query<TvShowDetails, TvShowParamsOptions>({
        query: (params) => {
          const { media_type, id } = params;
          return { url: `${media_type}/${id}` };
        },
      }),
      getMovieDetails: builder.query<MovieDetails, MovieParamsOptions>({
        query: (params) => {
          const { media_type, id } = params;
          return { url: `${media_type}/${id}` };
        },
      }),
      getVideos: builder.query<Videos, MediaParamsOptions>({
        query: (params) => {
          const { media_type, id } = params;
          return { url: `${media_type}/${id}/videos` };
        },
      }),
      getTvSeasonVideos: builder.query<Videos, TvSeasonParamsOptions>({
        query: (params) => {
          const { media_type, id, season_number } = params;
          return { url: `${media_type}/${season_number}/${id}/videos` };
        },
      }),
      getMovieSimilar: builder.query<SimilarMovies, MovieParamsOptions>({
        query: (params) => {
          const { media_type, id } = params;
          return { url: `${media_type}/${id}/similar`, params: params };
        },
      }),
      getTvShowSimilar: builder.query<SimilarTvShows, TvShowParamsOptions>({
        query: (params) => {
          const { media_type, id } = params;
          return { url: `${media_type}/${id}/similar`, params: params };
        },
      }),
      getMovieCredits: builder.query<Credits, MovieParamsOptions>({
        query: (params) => {
          const { media_type, id } = params;
          return { url: `${media_type}/${id}/credits`, params: params };
        },
      }),
      getTvShowCredits: builder.query<Credits, TvShowParamsOptions>({
        query: (params) => {
          const { media_type, id } = params;
          return { url: `${media_type}/${id}/credits`, params: params };
        },
      }),
      // Search Endpoint
      searchMulti: builder.query<Search<MultiSearchResult>, String>({
        query: (query) => `search/multi?query=${query}`,
      }),
      // discover movie
      discoverMovies: builder.query<MovieDiscoverResult, ParamsOptions>({
        query: (params) => {
          return { url: `discover/movie`, params: params };
        },
      }),
      // discover tv shows
      discoverTvShows: builder.query<TvShowDiscoverResult, ParamsOptions>({
        query: (params) => {
          return { url: `discover/tv`, params: params };
        },
      }),
      // user authentication
      getRequestToken: builder.query<TokenRequest, void>({
        query: () => `authentication/token/new`,
      }),
      // user account
      getAccountDetails: builder.query<AccountDetails, UserParamsOption>({
        query: (params) => `account/${params.account_id}`,
      }),
      // Add to Favorite in user account
      setFavorite: builder.mutation<void, UserMediaParamsOption>({
        query(params) {
          return {
            url: `account/${params.account_id}/favorite`,
            method: "POST",
            body: {
              media_type: params.media_type,
              media_id: params.media_id,
            },
          };
        },
      }),
      // add to watchlist in user account
      setWatchlist: builder.mutation<void, UserMediaParamsOption>({
        query(params) {
          return {
            url: `account/${params.account_id}/watchlist`,
            method: "POST",
            body: {
              media_type: params.media_type,
              media_id: params.media_id,
            },
          };
        },
      }),
      // get favorite movie from user account
      getFavoriteMovie: builder.query<MovieLists, UserParamsOption>({
        query: (params) => {
          return {
            url: `account/${params.account_id}/favorite/movies`,
            params: params.params,
          };
        },
      }),
      // get favorite tv from user account
      getFavoriteTv: builder.query<TvShowDiscoverResult, UserParamsOption>({
        query: (params) => {
          return {
            url: `account/${params.account_id}/favorite/tv`,
            params: params.params,
          };
        },
      }),
      // get watchlist movies from user account
      getWatchlistMovies: builder.query<MovieList, UserParamsOption>({
        query: (params) => {
          return {
            url: `account/${params.account_id}/watchlist/movies`,
            params: params.params,
          };
        },
      }),
      // get movie list
      getWatchlistTv: builder.query<TvShowDiscoverResult, UserParamsOption>({
        query: (params) => {
          return {
            url: `account/${params.account_id}/watchlist/tv`,
            params: params.params,
          };
        },
      }),
    };
  },
});
export const {
  useGetAiringTodayTvsQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetOnTheAirTvsQuery,
  useGetTopRatedMoviesQuery,
  useGetTopRatedTvsQuery,
  useGetTrendingMoviesDayQuery,
  useGetTrendingMoviesWeekQuery,
  useGetTrendingTvsDayQuery,
  useGetTrendingTvsWeekQuery,
  useSearchMultiQuery,
  useGetVideosQuery,
  useGetMovieDetailsQuery,
  useGetTVShowDetailsQuery,
  useGetTvSeasonVideosQuery,
  useGetMovieSimilarQuery,
  useGetTvShowSimilarQuery,
  useGetMovieCreditsQuery,
  useGetTvShowCreditsQuery,
  useDiscoverMoviesQuery,
  useDiscoverTvShowsQuery,
  useGetRequestTokenQuery,
  useGetAccountDetailsQuery,
  useSetFavoriteMutation,
  useSetWatchlistMutation,
  useGetFavoriteMovieQuery,
  useGetFavoriteTvQuery,
  useGetWatchlistMoviesQuery,
  useGetWatchlistTvQuery,
} = tmdbApi;
export { tmdbApi };
