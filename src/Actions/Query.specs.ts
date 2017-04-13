import { IRestClient } from '../Rest/Client/IRestClient';
import { Query } from './Query';
const when = require('saywhen');

describe('Query', () => {

	const accessToken = 'someAccessToken';
	let restClient: IRestClient;
	let query: Query;

	const jsonResponse =
	{
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

	beforeEach(() => {

		restClient = jasmine.createSpyObj<IRestClient>('RestClient', ['Execute']);
		query = new Query(restClient, accessToken);
		when(restClient.Execute).isCalled.then(() => Promise.resolve(jsonResponse));
	});

	describe('about Silicon Valley', () => {

		const seriesName = 'Silicon Valley';

		it('should get results from the API', () => {
			const seriesResults = query.GetSeries(seriesName);
			expect(seriesResults).not.toBe(null);
		});
	});

	//Test that returns multiple results.
});