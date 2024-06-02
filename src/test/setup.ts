import '@testing-library/jest-dom';
import { server } from './mocks/node';



beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())