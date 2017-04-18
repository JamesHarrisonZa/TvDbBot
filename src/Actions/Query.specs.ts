import { Query } from './Query';
import { IRestClient } from '../Rest/Client/IRestClient';
import { SearchSeriesRequest } from '../Rest/Requests/TvDb/SearchSeriesRequest';
import { SeriesIdEpisodesSummaryRequest } from '../Rest/Requests/TvDb/SeriesIdEpisodesSummaryRequest';
import { SeriesIdEpisodesRequest } from '../Rest/Requests/TvDb/SeriesIdEpisodesRequest';
const when = require('saywhen');

describe('Query', () => {

	const accessToken = 'someAccessToken';
	const restClient = jasmine.createSpyObj<IRestClient>('RestClient', ['Execute']);
	const query = new Query(restClient, accessToken);

	describe('When is the next episode of Silicon Valley?', () => {

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
				when(restClient.Execute).isCalledWith(jasmine.any(SearchSeriesRequest)).then(() => searchSeriesResponse);
			});

			it('should get the search results from the API', async () => {

				const seriesResults = await query.GetSeries(seriesToSearch);

				expect(seriesResults).not.toBe(null);
				expect(seriesResults.length).toBe(1);
				expect(seriesResults[0].Id).toBe(277165);
				expect(seriesResults[0].Name).toBe('Silicon Valley');
			});

			it('should tell us the series is continuing', async () => {

				const seriesResults = await query.GetSeries(seriesToSearch);

				expect(seriesResults[0].Status).toBe(SeriesStatus.Continuing);
			});
		});

		describe('Given a series id', () => {

			const seriesId = 277165;
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
				when(restClient.Execute).isCalledWith(jasmine.any(SeriesIdEpisodesSummaryRequest)).then(() => seriesIdEpisodesSummaryResponse);
			});

			it('should find the latest season', async () => {

				const latestSeason = await query.GetLatestSeason(277165);

				expect(latestSeason).toBe(4);
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
				when(restClient.Execute).isCalledWith(jasmine.any(SeriesIdEpisodesRequest)).then(() => seriesIdEpisodesResponse);
			});

			it('should get the date of the next episode', async () => {

				const nextEpisodeDate = await query.GetNextEpisodeDate(seriesId, latestSeason);

				expect(new Date('2017-04-23').toDateString()).toBe(nextEpisodeDate.toDateString());
			});
		});

	});

	describe('When is the next episode of The Sopranos?', () => {

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
				when(restClient.Execute).isCalledWith(jasmine.any(SearchSeriesRequest)).then(() => searchSeriesResponse);
			});

			it('should tell us that the series has ended', async () => {

				const seriesResults = await query.GetSeries(seriesToSearch);

				expect(seriesResults[0].Status).toBe(SeriesStatus.Ended);
			});
		});
	});
});