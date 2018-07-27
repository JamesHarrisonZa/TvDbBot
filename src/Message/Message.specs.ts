import { Greeting } from './Greeting';
import { Apology } from './Apology';
import { Help } from './Help';
import { NoResultsApology } from './NoResultsApology';
import { SeriesOverApology } from './SeriesOverApology';

describe('Greeting', () => {

	const greeting = new Greeting();

	it('Should have collection of phrases', () => {

		expect(greeting.phrases).not.toBe(null);
		expect(greeting.phrases.length > 0).toBe(true);
	});
});

describe('Apology', () => {

	const apology = new Apology();

	it('Should have collection of phrases', () => {

		expect(apology.phrases).not.toBe(null);
		expect(apology.phrases.length > 0).toBe(true);
	});
});

describe('Help', () => {

	const help = new Help();

	it('Should have collection of phrases', () => {

		expect(help.phrases).not.toBe(null);
		expect(help.phrases.length > 0).toBe(true);
	});
});

describe('NoResultsApology', () => {

	const noResultsApology = new NoResultsApology();

	it('Should have collection of phrases', () => {

		expect(noResultsApology.phrases).not.toBe(null);
		expect(noResultsApology.phrases.length > 0).toBe(true);
	});
});

describe('SeriesOverApology', () => {

	const seriesOverApology = new SeriesOverApology();

	it('Should have collection of phrases', () => {

		expect(seriesOverApology.phrases).not.toBe(null);
		expect(seriesOverApology.phrases.length > 0).toBe(true);
	});
});