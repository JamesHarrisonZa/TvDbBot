import { LoginRequest } from './TvDb/LoginRequest';
import { SearchSeriesRequest } from './TvDb/SearchSeriesRequest';

describe('Request', () => {

	describe('LoginRequest', () => {

		it('Should set UriOptions', () => {
			const sut = new LoginRequest();
			const actual = sut.uriOptions;
			expect(actual).toBeDefined();
		});

		it('Should be a POST request', () => {
			const sut = new LoginRequest();
			const actual = sut.uriOptions.method;
			const expected = 'POST';
			expect(actual).toEqual(expected);
		});

		it('Should have body content', () => {
			const sut = new LoginRequest();
			const actual = sut.uriOptions.body;
			expect(actual).toBeDefined();
		});
	});

	describe('SearchSeriesRequest', () => {

		const accessToken = '1234';
		const seriesName = 'Sopranos';

		it('Should set UriOptions', () => {
			const sut = new SearchSeriesRequest(accessToken, seriesName);
			const actual = sut.uriOptions;
			expect(actual).toBeDefined();
		});

		it('Should be a GET request', () => {
			const sut = new SearchSeriesRequest(accessToken, seriesName);
			const actual = sut.uriOptions.method;
			const expected = 'GET';
			expect(actual).toEqual(expected);
		});

		it('Should set search query parameter', () => {
			const sut = new SearchSeriesRequest(accessToken, seriesName);
			const actual = sut.uriOptions.uri;
			const expected = 'https://api.thetvdb.com/search/series?name=Sopranos';
			expect(actual).toEqual(expected);
		});

		it('Should set Authorization header', () => {
			const sut = new SearchSeriesRequest(accessToken, seriesName);
			const actual = sut.uriOptions.headers.Authorization;
			const expected = 'Bearer 1234';
			expect(actual).toEqual(expected);
		});
	});
});