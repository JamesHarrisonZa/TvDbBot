import { Greeting as Greeting } from './Greeting';
import { Apology as Apology } from './Apology';

describe('Greeting', () => {

	var greeting = new Greeting();

	it('Should have collection of phrases', () => {

		expect(greeting.Phrases).not.toBe(null);
		expect(greeting.Phrases.length > 0).toBe(true);
	});
});

describe('Apology', () => {

	var apology = new Apology();

	it('Should have collection of phrases', () => {

		expect(apology.Phrases).not.toBe(null);
		expect(apology.Phrases.length > 0).toBe(true);
	});
});