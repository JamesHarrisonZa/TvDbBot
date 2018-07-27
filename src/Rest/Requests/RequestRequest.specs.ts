import { LoginRequest } from './TvDb/LoginRequest';
import { SearchSeriesRequest } from './TvDb/SearchSeriesRequest';

describe('Request', () => {

	describe('LoginRequest', () => {

		const loginRequest = new LoginRequest();

		it('Should set UriOptions', () => {
			expect(loginRequest.uriOptions).toBeDefined();
		});

		it('Should be a POST request', () => {
			expect(loginRequest.uriOptions.method).toBe('POST');
		});

		it('Should have body content', () => {
			expect(loginRequest.uriOptions.body).toBeDefined();
		});
	});

	describe('SearchSeriesRequest', () => {

		const accessToken = '1234';
		const seriesName = 'Sopranos';

		const searchSeriesRequest = new SearchSeriesRequest(accessToken, seriesName);

		it('Should set UriOptions', () => {
			expect(searchSeriesRequest.uriOptions).toBeDefined();
		});

		it('Should be a GET request', () => {
			expect(searchSeriesRequest.uriOptions.method).toBe('GET');
		});

		it('Should set search query parameter', () => {
			expect(searchSeriesRequest.uriOptions.uri).toContain('?name=Sopranos');
		});

		it('Should set Authorization header', () => {
			expect(searchSeriesRequest.uriOptions.headers.Authorization).toBe('Bearer 1234');
		});

		it('Should set searchSeriesUriOptions', () => {
			expect(searchSeriesRequest.uriOptions).toBeDefined();
		});
	});
});