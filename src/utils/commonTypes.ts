import {
  LanguageOption,
  RegionOption,
  TimezoneOption,
  PageOption,
  ChangeOption,
} from "tmdb-ts";
export interface MediaParamsOptions {
  id: number | string;
  media_type: "movie" | "tv" | "person";
  params?: ParamsOptions;
}
export interface ParamsOptions
  extends LanguageOption,
    RegionOption,
    TimezoneOption,
    PageOption,
    ChangeOption {}
export interface TvShowParamsOptions {
  id: number;
  media_type: "tv";
  params?: ParamsOptions;
}
export interface TvSeasonParamsOptions
  extends TvShowParamsOptions,
    LanguageOption {
  season_number: number;
}
export interface TvEpisodeParamsOptions
  extends TvShowParamsOptions,
    TvSeasonParamsOptions {
  episode_number: number;
}
export interface PersonParamsOptions {
  id: number;
  media_type: "person";
  params?: ParamsOptions;
}
export interface MovieParamsOptions {
  id: number;
  media_type: "movie";
  params?: ParamsOptions;
}
export interface TokenRequest {
  success: boolean;
  expires_at: string;
  request_token: string;
}
export interface ValidateLoginResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface SessionResponse {
  success: boolean;
  session_id: string;
}
export interface SuccessResponse {
  status_code: number;
  status_message: string;
}
export interface ErrorResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}
export interface UserParamsOption {
  session_id: string;
  account_id: number;
  params?: ParamsOptions;
}
export interface UserMediaParamsOption extends UserParamsOption {
  media_type: "movie" | "tv" | "person";
  media_id: number;
}
