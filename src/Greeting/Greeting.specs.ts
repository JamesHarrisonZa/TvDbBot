import { Greeting as Greeting } from './Greeting';

describe('Greeting', () => {

	var greeting = new Greeting();

	it('Should have Phrases', () => {

		expect(greeting.Phrases).not.toBe(null);
		expect(greeting.Phrases.length > 0).toBe(true);
	});
});