import { http, HttpResponse } from 'msw'
import { BASE_URL } from '../../constants'
import { tmdbApi } from '../../store'
import { trendingMovies } from './dummyMockData'
export const handlers = [
  http.get(`${BASE_URL}/${tmdbApi.endpoints.getTrendingMoviesWeek}`, () => {
    return HttpResponse.json(trendingMovies)
  }),
]
