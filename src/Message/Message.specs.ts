import { Greeting } from './Greeting';
import { Apology } from './Apology';
import { Help } from './Help';
import { NoResultsApology } from './NoResultsApology';
import { SeriesOverApology } from './SeriesOverApology';

describe('Greeting', () => {

	it('Should have collection of phrases', () => {
		const sut = new Greeting();
		expect(sut.phrases).toBeDefined();
		expect(sut.phrases.length).toBeGreaterThan(0);
	});
});

describe('Apology', () => {


	it('Should have collection of phrases', () => {

		const sut = new Apology();
		expect(sut.phrases).toBeDefined();
		expect(sut.phrases.length).toBeGreaterThan(0);
	});
});

describe('Help', () => {

	it('Should have collection of phrases', () => {

		const sut = new Help();
		expect(sut.phrases).toBeDefined();
		expect(sut.phrases.length).toBeGreaterThan(0);
	});
});

describe('NoResultsApology', () => {

	it('Should have collection of phrases', () => {

		const sut = new NoResultsApology();
		expect(sut.phrases).toBeDefined();
		expect(sut.phrases.length).toBeGreaterThan(0);
	});
});

describe('SeriesOverApology', () => {

	it('Should have collection of phrases', () => {

		const sut = new SeriesOverApology();
		expect(sut.phrases).toBeDefined();
		expect(sut.phrases.length).toBeGreaterThan(0);
	});
});