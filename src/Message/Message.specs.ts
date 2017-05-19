import { Greeting } from './Greeting';
import { Apology } from './Apology';
import { NoResultsApology } from './NoResultsApology';
import { SeriesOverApology } from './SeriesOverApology';

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


describe('NoResultsApology', () => {

	var apology = new NoResultsApology();

	it('Should have collection of phrases', () => {

		expect(apology.Phrases).not.toBe(null);
		expect(apology.Phrases.length > 0).toBe(true);
	});
});


describe('SeriesOverApology', () => {

	var apology = new SeriesOverApology();

	it('Should have collection of phrases', () => {

		expect(apology.Phrases).not.toBe(null);
		expect(apology.Phrases.length > 0).toBe(true);
	});
});