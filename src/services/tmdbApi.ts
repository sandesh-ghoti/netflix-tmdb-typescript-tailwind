/**
 * CREDIT: https://github.com/blakejoy/tmdb-ts/tree/main
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, TMDB_API_KEY } from "../constants";
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
  PopularMovies,
  PopularTvShows,
  PopularPersons,
} from "tmdb-ts";
import {
  MediaParamsOptions,
  MovieParamsOptions,
  ParamsOptions,
  SessionResponse,
  SuccessResponse,
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
  }),
  tagTypes: ["Account"],
  endpoints(builder) {
    return {
      // Trending Movies (Week)
      getTrendingMoviesWeek: builder.query<
        TrendingResults<"movie">,
        ParamsOptions
      >({
        query: (params = { page: 1 }) => {
          return {
            url: `trending/movie/week`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),

      // Trending TVs (Week)
      getTrendingTvsWeek: builder.query<TrendingResults<"tv">, ParamsOptions>({
        query: (params) => {
          return {
            url: `trending/tv/week`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),

      // Trending Movies (Day)
      getTrendingMoviesDay: builder.query<
        TrendingResults<"movie">,
        ParamsOptions
      >({
        query: (params) => {
          return {
            url: `trending/movie/day`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // Trending TVs (Day)
      getTrendingTvsDay: builder.query<TrendingResults<"tv">, ParamsOptions>({
        query: (params) => {
          return {
            url: `trending/tv/day`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // Top Rated Movies
      getTopRatedMovies: builder.query<TopRatedMovies, ParamsOptions>({
        query: (params?) => {
          return {
            url: `movie/top_rated`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // Top Rated TVs
      getTopRatedTvs: builder.query<TopRatedTvShows, ParamsOptions>({
        query: (params) => {
          return {
            url: `tv/top_rated`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // Now Playing Movies
      getNowPlayingMovies: builder.query<MoviesPlayingNow, ParamsOptions>({
        query: (params) => {
          return {
            url: `movie/now_playing`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // Now on the air tv series
      getOnTheAirTvs: builder.query<OnTheAir, ParamsOptions>({
        query: (params) => {
          return {
            url: `tv/on_the_air`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // upcoming Movies
      getUpcomingMovies: builder.query<UpcomingMovies, ParamsOptions>({
        query: (params) => {
          return {
            url: `movie/upcoming`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // airing today tv series
      getAiringTodayTvs: builder.query<TvShowsAiringToday, ParamsOptions>({
        query: (params) => {
          return {
            url: `tv/airing_today`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // get popular movies
      getPopularMovies: builder.query<PopularMovies, ParamsOptions>({
        query: (params) => {
          return {
            url: `movie/popular`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // get popular tv shows
      getPopularTvs: builder.query<PopularTvShows, ParamsOptions>({
        query: (params) => {
          return {
            url: `tv/popular`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // get popular people
      getPopularPeople: builder.query<PopularPersons, ParamsOptions>({
        query: (params) => {
          return {
            url: `person/popular`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // Get tvshow Details
      getTVShowDetails: builder.query<TvShowDetails, { id: string }>({
        query: (params) => {
          const { id } = params;
          return { url: `tv/${id}` };
        },
      }),
      // Get Movie Details
      getMovieDetails: builder.query<MovieDetails, { id: string }>({
        query: (params) => {
          const { id } = params;
          return { url: `movie/${id}`, params: { api_key: TMDB_API_KEY } };
        },
      }),
      // Get Videos
      getVideos: builder.query<Videos, MediaParamsOptions>({
        query: (params) => {
          const { media_type, id } = params;
          return {
            url: `${media_type}/${id}/videos`,
            params: { api_key: TMDB_API_KEY },
          };
        },
      }),
      getTvSeasonVideos: builder.query<Videos, TvSeasonParamsOptions>({
        query: (params) => {
          const { media_type, id, season_number } = params;
          return {
            url: `${media_type}/${season_number}/${id}/videos`,
            params: { api_key: TMDB_API_KEY },
          };
        },
      }),
      getMovieSimilar: builder.query<SimilarMovies, MovieParamsOptions>({
        query: (params) => {
          const { media_type, id } = params;
          return {
            url: `${media_type}/${id}/similar`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      getTvShowSimilar: builder.query<SimilarTvShows, TvShowParamsOptions>({
        query: (params) => {
          const { media_type, id } = params;
          return {
            url: `${media_type}/${id}/similar`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      getMovieCredits: builder.query<Credits, { id: string }>({
        query: (params) => {
          const { id } = params;
          return {
            url: `movie/${id}/credits`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      getTvShowCredits: builder.query<Credits, { id: string }>({
        query: (params) => {
          const { id } = params;
          return {
            url: `tv/${id}/credits`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // Search Endpoint
      searchMulti: builder.query<Search<MultiSearchResult>, String>({
        query: (query) => `search/multi?query=${query}`,
      }),
      // discover movie
      discoverMovies: builder.query<MovieDiscoverResult, ParamsOptions>({
        query: (params) => {
          return {
            url: `discover/movie`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // discover tv shows
      discoverTvShows: builder.query<TvShowDiscoverResult, ParamsOptions>({
        query: (params) => {
          return {
            url: `discover/tv`,
            params: { api_key: TMDB_API_KEY, ...params },
          };
        },
      }),
      // user authentication
      getRequestToken: builder.query<TokenRequest, void>({
        query: () => {
          return {
            url: `authentication/token/new`,
            params: { api_key: TMDB_API_KEY },
          };
        },
      }),
      // get session token
      setSessionToken: builder.mutation<
        SessionResponse,
        { request_token: string }
      >({
        query: (body) => {
          return {
            url: `authentication/session/new`,
            method: "POST",
            params: { api_key: TMDB_API_KEY },
            body,
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      // user account
      getAccountDetails: builder.query<
        AccountDetails,
        Omit<UserParamsOption, "account_id">
      >({
        query: (params) => {
          return {
            url: `account`,
            params: {
              api_key: TMDB_API_KEY,
              session_id: params.session_id,
              ...params.params,
            },
          };
        },
        providesTags: (result) =>
          result ? [{ type: "Account", id: result.id }] : [{ type: "Account" }],
      }),
      // Add to Favorite in user account
      setFavorite: builder.mutation<SuccessResponse, UserMediaParamsOption>({
        query(params) {
          return {
            url: `account/${params.account_id}/favorite`,
            method: "POST",
            params: {
              api_key: TMDB_API_KEY,
              session_id: params.session_id,
              ...params.params,
            },
            body: {
              media_type: params.media_type,
              media_id: params.media_id,
            },
          };
        },
      }),
      // add to watchlist in user account
      setWatchlist: builder.mutation<SuccessResponse, UserMediaParamsOption>({
        query(params) {
          return {
            url: `account/${params.account_id}/watchlist`,
            params: {
              api_key: TMDB_API_KEY,
              session_id: params.session_id,
              ...params.params,
            },
            method: "POST",
            body: {
              media_type: params.media_type,
              media_id: params.media_id,
            },
          };
        },
      }),
      // add to watchlist in user account
      setRating: builder.mutation<
        SuccessResponse,
        { value: number } & UserMediaParamsOption
      >({
        query(params) {
          return {
            url: `${params.media_type}/${params.media_id}/rating`,
            params: { api_key: TMDB_API_KEY, session_id: params.session_id },
            method: "POST",
            body: {
              value: params.value,
            },
          };
        },
      }),
      // get favorite movie from user account
      getFavoriteMovie: builder.query<MovieLists, UserParamsOption>({
        query: (params) => {
          return {
            url: `account/${params.account_id}/favorite/movies`,
            params: {
              api_key: TMDB_API_KEY,
              session_id: params.session_id,
              ...params.params,
            },
          };
        },
      }),
      // get favorite tv from user account
      getFavoriteTv: builder.query<TvShowDiscoverResult, UserParamsOption>({
        query: (params) => {
          return {
            url: `account/${params.account_id}/favorite/tv`,
            params: {
              api_key: TMDB_API_KEY,
              session_id: params.session_id,
              ...params.params,
            },
          };
        },
      }),
      // get watchlist movies from user account
      getWatchlistMovies: builder.query<MovieList, UserParamsOption>({
        query: (params) => {
          return {
            url: `account/${params.account_id}/watchlist/movies`,
            params: {
              api_key: TMDB_API_KEY,
              session_id: params.session_id,
              ...params.params,
            },
          };
        },
      }),
      // get movie list
      getWatchlistTv: builder.query<TvShowDiscoverResult, UserParamsOption>({
        query: (params) => {
          return {
            url: `account/${params.account_id}/watchlist/tv`,
            params: {
              api_key: TMDB_API_KEY,
              session_id: params.session_id,
              ...params.params,
            },
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
  useGetPopularMoviesQuery,
  useGetPopularTvsQuery,
  useGetPopularPeopleQuery,
  useSetSessionTokenMutation,
} = tmdbApi;
export { tmdbApi };
