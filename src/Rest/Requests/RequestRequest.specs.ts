import { LoginRequest } from './TvDb/LoginRequest';
import { SearchSeriesRequest } from './TvDb/SearchSeriesRequest';

describe('RequestRequest', () => {

	describe('LoginRequest', () => {

		const loginRequest = new LoginRequest();

		it('Should set UriOptions', () => {
			expect(loginRequest.UriOptions).toBeDefined();
		});

		it('Should be a POST request', () => {
			expect(loginRequest.UriOptions.method).toBe('POST');
		});

		it('Should have body content', () => {
			expect(loginRequest.UriOptions.body).toBeDefined();
		});
	});

	describe('SearchSeriesRequest', () => {

		const accessToken = '1234';
		const seriesName = 'Sopranos';

		const searchSeriesRequest = new SearchSeriesRequest(accessToken, seriesName);
		const searchSeriesUriOptions = searchSeriesRequest.UriOptions;

		it('Should set UriOptions', () => {
			expect(searchSeriesRequest.UriOptions).toBeDefined();
		});

		it('Should be a GET request', () => {
			expect(searchSeriesRequest.UriOptions.method).toBe('GET');
		});

		it('Should set search query parameter', () => {
			expect(searchSeriesRequest.UriOptions.uri).toContain('?name=Sopranos');
		});

		it('Should set Authorization header', () => {
			expect(searchSeriesRequest.UriOptions.headers.Authorization).toBe('Bearer 1234');
		});
	});
});