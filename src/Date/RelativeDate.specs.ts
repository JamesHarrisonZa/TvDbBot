import { RelativeDate } from './RelativeDate';

const when = require('saywhen');

describe('RelativeDate', () => {

	describe('Given a current date of Sunday 1st Jan 2017', () => {

		const currentDate = new Date('2017-01-01');

		describe('Given a compare date of the same day', () => {

			const compareDate = new Date('2017-01-01');

			it('should return a relative date of: "Today"', () => {

				const relativeDate = new RelativeDate(currentDate, compareDate).date;

				expect(relativeDate).toBe('Today');
			});
		});

		describe('Given a compare date of the next day', () => {

			const compareDate = new Date('2017-01-02');

			it('should return a relative date of: "Tomorrow"', () => {

				const relativeDate = new RelativeDate(currentDate, compareDate).date;

				expect(relativeDate).toBe('Tomorrow');
			});
		});

		describe('Given a compare date of two days away', () => {

			const compareDate = new Date('2017-01-03');

			it('should return a relative date of: "This coming Tuesday"', () => {

				const relativeDate = new RelativeDate(currentDate, compareDate).date;

				expect(relativeDate).toBe('This coming Tuesday');
			});
		});

		describe('Given a compare date of Sunday 8th Jan 2017', () => {

			const compareDate = new Date('2017-01-08');

			it('should return a relative date of: "Next week Sunday"', () => {

				const relativeDate = new RelativeDate(currentDate, compareDate).date;

				expect(relativeDate).toBe('Next week Sunday');
			});
		});

		describe('Given a compare date of Friday 13th Jan 2017', () => {

			const compareDate = new Date('2017-01-13');

			it('should return a relative date of: "Next week Friday"', () => {

				const relativeDate = new RelativeDate(currentDate, compareDate).date;

				expect(relativeDate).toBe('Next week Friday');
			});
		});

		describe('Given a compare date of Sunday 15th Jan 2017', () => {

			const compareDate = new Date('2017-01-15');

			it('should return a relative date of: "In 2 weeks, Sunday 15 January"', () => {

				const relativeDate = new RelativeDate(currentDate, compareDate).date;

				expect(relativeDate).toBe('In 2 weeks, Sunday 15 January');
			});
		});

		describe('Given a compare date of Monday 1st Jan 2018', () => {

			const compareDate = new Date('2018-01-01');

			it('should return a relative date of: "Next year, Monday 1 January"', () => {

				const relativeDate = new RelativeDate(currentDate, compareDate).date;

				expect(relativeDate).toBe('Next year, Monday 1 January');
			});
		});

		describe('Given a compare date of Wednesday 1st Jan 2020', () => {

			const compareDate = new Date('2020-01-01');

			it('should return a relative date of: "In 3 years, Wednesday 1 January 2020"', () => {

				const relativeDate = new RelativeDate(currentDate, compareDate).date;

				expect(relativeDate).toBe('In 3 years, Wednesday 1 January 2020');
			});
		});

	});
});