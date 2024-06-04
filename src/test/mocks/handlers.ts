import { http, HttpResponse } from 'msw'
import { BASE_URL } from '../../constants'
import { movieLists, tvShowList, peopleList, movieDetails, peopleDetails, creditList } from './dummyMockData'
import { TvShowDetails } from '../../pages'
export const handlers = [
  http.get(`${BASE_URL}/trending/movie/week`, () => {
    return HttpResponse.json(movieLists)
  }),
  http.get(`${BASE_URL}/trending/movie/day`, () => {
    return HttpResponse.json(movieLists)
  }),
  http.get(`${BASE_URL}/trending/tv/week`, () => {
    return HttpResponse.json(tvShowList)
  }),
  http.get(`${BASE_URL}/trending/tv/day`, () => {
    return HttpResponse.json(tvShowList)
  }),
  http.get(`${BASE_URL}/trending/person/week`, () => {
    return HttpResponse.json(peopleList)
  }),
  http.get(`${BASE_URL}/trending/person/day`, () => {
    return HttpResponse.json(peopleList)
  }), 
  http.get(`${BASE_URL}/movie/popular`, () => {
    return HttpResponse.json(movieLists)
  }),
  http.get(`${BASE_URL}/movie/top_rated`, () => {
    return HttpResponse.json(movieLists)
  }),
  http.get(`${BASE_URL}/movie/upcoming`, () => {
    return HttpResponse.json(movieLists)
  }),
  http.get(`${BASE_URL}/movie/:id/similar`, () => {
    return HttpResponse.json(movieLists)
  }),
  http.get(`${BASE_URL}/movie/now_playing`, () => {
    return HttpResponse.json(movieLists)
  }),
  http.get(`${BASE_URL}/movie/:id`, ({request}) => {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    return HttpResponse.json({...movieDetails,id })
  }),
  http.get(`${BASE_URL}/tv/popular`, () => {
    return HttpResponse.json(tvShowList)
  }),
  http.get(`${BASE_URL}/tv/on_the_air`, () => {
    return HttpResponse.json(tvShowList)
  }),
  http.get(`${BASE_URL}/tv/:id/similar`, () => {
    return HttpResponse.json(tvShowList)
  }),
  http.get(`${BASE_URL}/tv/top_rated`, () => {
    return HttpResponse.json(tvShowList)
  }),
  http.get(`${BASE_URL}/tv/airing_today`, () => {
    return HttpResponse.json(tvShowList)
  }),
  http.get(`${BASE_URL}/tv/:id`, ({request}) => {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    return HttpResponse.json({...TvShowDetails,id })
  }),
  http.get(`${BASE_URL}/person/:id`, () => {
    return HttpResponse.json(peopleDetails)
  }),
  http.get(`${BASE_URL}/movie/:id/credits`, () => {
    return HttpResponse.json(creditList)
  }),
  http.get(`${BASE_URL}/tv/:id/credits`, () => {
    return HttpResponse.json(creditList)
  }),
]
