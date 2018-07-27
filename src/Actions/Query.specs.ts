import { Query } from './Query';
import { SeriesStatus } from './SeriesStatus';
import { IRestClient } from '../Rest/Client/IRestClient';
import { SeriesIdEpisodesSummaryRequest } from '../Rest/Requests/TvDb/SeriesIdEpisodesSummaryRequest';
import { SeriesIdEpisodesRequest } from '../Rest/Requests/TvDb/SeriesIdEpisodesRequest';
const when = require('saywhen');

describe('Query', () => {

	const accessToken = 'someAccessToken';

	describe('When is the next episode of Silicon Valley?', () => {

		const restClient = jasmine.createSpyObj<IRestClient>('RestClient', ['execute']);

		const seriesToSearch = 'Silicon Valley';
		const searchSeriesResponse = {
			data: [
				{
					aliases: [],
					banner: 'graphical/277165-g9.jpg',
					firstAired: '2014-04-06',
					id: 277165,
					network: 'HBO',
					overview: 'In the high-tech gold rush of modern Silicon Valley, the people most qualified to succeed are the least capable of handling success. A comedy partially inspired by Mike Judge\'s own experiences as a Silicon Valley engineer in the late 1980s.',
					seriesName: 'Silicon Valley',
					status: 'Continuing'
				}
			]
		};

		describe('Given a current series to search', () => {

			beforeEach(() => {
				when(restClient.execute).isCalled.then(() => searchSeriesResponse);
			});

			it('should get the search results from the API', async () => {

				const query = new Query(restClient, accessToken);
				const actual = await query.getSeries(seriesToSearch);
				expect(actual).toBeDefined();
			});

			it('should get the series id', async () => {

				const query = new Query(restClient, accessToken);
				const seriesResults = await query.getSeries(seriesToSearch);
				const actual = seriesResults[0].Id;
				const expected = 277165;
				expect(actual).toEqual(expected);
			});

			it('should get the series name', async () => {

				const query = new Query(restClient, accessToken);
				const seriesResults = await query.getSeries(seriesToSearch);
				const actual = seriesResults[0].Name;
				const expected = 'Silicon Valley';
				expect(actual).toEqual(expected);
			});

			it('should tell us the series is continuing', async () => {

				const sut = new Query(restClient, accessToken);
				const seriesResults = await sut.getSeries(seriesToSearch);

				expect(seriesResults[0].Status).toBe(SeriesStatus.continuing);
			});
		});

		describe('Given a series id', () => {

			const seriesIdEpisodesSummaryResponse = {
				data:
				{
					airedSeasons: ['1', '3', '4', '2'],
					airedEpisodes: 34,
					dvdSeasons: ['1', '2', '3'],
					dvdEpisodes: '28'
				}
			};

			beforeEach(() => {
				when(restClient.execute).isCalledWith(jasmine.any(SeriesIdEpisodesSummaryRequest)).then(() => seriesIdEpisodesSummaryResponse);
			});

			it('should find the latest season', async () => {

				const sut = new Query(restClient, accessToken);
				const actual = await sut.getLatestSeason(277165);
				const expected = 4;
				expect(actual).toEqual(expected);
			});
		});

		describe('Given the latest season number', () => {

			const seriesId = 277165;
			const latestSeason = 4;
			const seriesIdEpisodesResponse = {
				links: { first: 1, last: 1, next: null, prev: null },
				data: [
					{
						airedSeason: 4,
						firstAired: '2017-04-23'
					}
				]
			};

			beforeEach(() => {
				when(restClient.execute).isCalledWith(jasmine.any(SeriesIdEpisodesRequest)).then(() => seriesIdEpisodesResponse);
			});

			it('should get the date of the next episode', async () => {

				const sut = new Query(restClient, accessToken);
				const nextEpisodeDate = await sut.getNextEpisodeDate(seriesId, latestSeason, new Date('2017-04-23'));
				const actual = nextEpisodeDate.toDateString();
				const expected = new Date('2017-04-23').toDateString();
				expect(actual).toEqual(expected);
			});
		});

	});

	describe('When is the next episode of The Sopranos?', () => {

		const restClient = jasmine.createSpyObj<IRestClient>('RestClient', ['execute']);
		const seriesToSearch = 'The Sopranos';
		const searchSeriesResponse = {
			data: [
				{
					aliases: [],
					banner: 'graphical/75299-g6.jpg',
					firstAired: '1999-01-10',
					id: 75299,
					network: 'HBO',
					overview: 'Modern day morality tale about New Jersey mob boss Tony Soprano, as he deals with personal and professional issues in his home and business life.',
					seriesName: 'The Sopranos',
					status: 'Ended'
				}
			]
		};

		describe('Given an old series to search', () => {

			beforeEach(() => {
				when(restClient.execute).isCalled.then(() => searchSeriesResponse);
			});

			it('should tell us that the series has ended', async () => {

				const sut = new Query(restClient, accessToken);
				const seriesResults = await sut.getSeries(seriesToSearch);
				const actual = seriesResults[0].Status;
				const expected = SeriesStatus.ended;
				expect(actual).toEqual(expected);
			});
		});
	});
});