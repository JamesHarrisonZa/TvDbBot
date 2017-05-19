import { Greeting } from './Greeting';
import { Apology } from './Apology';
import { Help } from './Help';
import { NoResultsApology } from './NoResultsApology';
import { SeriesOverApology } from './SeriesOverApology';

describe('Greeting', () => {

	const greeting = new Greeting();

	it('Should have collection of phrases', () => {

		expect(greeting.Phrases).not.toBe(null);
		expect(greeting.Phrases.length > 0).toBe(true);
	});
});

describe('Apology', () => {

	const apology = new Apology();

	it('Should have collection of phrases', () => {

		expect(apology.Phrases).not.toBe(null);
		expect(apology.Phrases.length > 0).toBe(true);
	});
});

describe('Help', () => {

	const help = new Help();

	it('Should have collection of phrases', () => {

		expect(help.Phrases).not.toBe(null);
		expect(help.Phrases.length > 0).toBe(true);
	});
});

describe('NoResultsApology', () => {

	const noResultsApology = new NoResultsApology();

	it('Should have collection of phrases', () => {

		expect(noResultsApology.Phrases).not.toBe(null);
		expect(noResultsApology.Phrases.length > 0).toBe(true);
	});
});

describe('SeriesOverApology', () => {

	const seriesOverApology = new SeriesOverApology();

	it('Should have collection of phrases', () => {

		expect(seriesOverApology.Phrases).not.toBe(null);
		expect(seriesOverApology.Phrases.length > 0).toBe(true);
	});
});