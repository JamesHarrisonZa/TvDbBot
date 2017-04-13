import { IRestClient } from '../Rest/Client/IRestClient';
import { Query } from './Query';
const when = require('saywhen');

describe('Query', () => {

	const accessToken = 'someAccessToken';
	let restClient: IRestClient;
	let query: Query;

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

		describe('Given a series to search', () => {

			beforeEach(() => {

				restClient = jasmine.createSpyObj<IRestClient>('RestClient', ['Execute']);
				query = new Query(restClient, accessToken);
				when(restClient.Execute).isCalled.then(() => searchSeriesResponse);
			});

			it('should get the search results from the API', async () => {

				const seriesResults = await query.GetSeries(seriesToSearch);

				expect(seriesResults).not.toBe(null);
				expect(seriesResults.length).toBe(1);
				expect(seriesResults[0].Id).toBe(277165);
				expect(seriesResults[0].Name).toBe('Silicon Valley');
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

				restClient = jasmine.createSpyObj<IRestClient>('RestClient', ['Execute']);
				query = new Query(restClient, accessToken);
				when(restClient.Execute).isCalled.then(() => seriesIdEpisodesSummaryResponse);
			});

			it('should find the latest season', async () => {

				const latestSeason = await query.GetLatestSeason(277165);

				expect(latestSeason).toBe(4);
			});
		});
	});

	//Test that returns multiple results.
});