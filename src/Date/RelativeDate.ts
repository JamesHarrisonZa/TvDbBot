export class RelativeDate {

	public readonly date: string;
	private readonly _days: string[];
	private readonly _months: string[];

	constructor(currentDate: Date, compareDate: Date) {

		this._days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		this._months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		this.date = this.getRelativeDate(currentDate, compareDate);
	}

	private getRelativeDate(currentDate: Date, compareDate: Date): string {

		const seconds = Math.round((compareDate.getTime() - currentDate.getTime()) / 1000);
		const minutes = seconds / 60;
		const hours =  minutes / 60;
		const days = hours / 24;
		const weeks = days / 7;
		const years = compareDate.getFullYear() - currentDate.getFullYear();

		const displayWeekDay = this._days[compareDate.getDay()];
		const displayDayOfTheMonth = compareDate.getDate();
		const displayMonth = this._months[compareDate.getMonth()];

		if (this.isToday(days)) {
			return 'Today';
		} else if(this.isTomorrow(days)) {
			return 'Tomorrow';
		} else if (this.isThisWeek(days, weeks)) {
			return `This coming ${displayWeekDay}`;
		} else if (this.isNextWeek(weeks)) {
			return `Next week ${displayWeekDay}`;
		} else if (this.isThisYear(weeks, years)) {
			const roundedWeeks = Math.floor(weeks);
			return `In ${roundedWeeks} weeks, ${displayWeekDay} ${displayDayOfTheMonth} ${displayMonth}`;
		} else if (this.isNextYear(years)) {
			return `Next year, ${displayWeekDay} ${displayDayOfTheMonth} ${displayMonth}`;
		} else if (this.isYearsAway(years)) {
			return `In ${years} years, ${displayWeekDay} ${displayDayOfTheMonth} ${displayMonth} ${compareDate.getFullYear()}`;
		} else {
			return compareDate.toDateString();
		}
	}

	private isToday(days: number): boolean {
		return days === 0;
	}

	private isTomorrow(days: number): boolean {
		return days === 1;
	}

	private isThisWeek(days: number, weeks: number): boolean {
		return days > 1 && weeks < 1;
	}

	private isNextWeek(weeks: number): boolean {
		return weeks >= 1 && weeks < 2;
	}

	private isThisYear(weeks: number, years: number): boolean {
		return weeks >= 2 && years === 0;
	}

	private isNextYear(years: number): boolean {
		return years === 1;
	}

	private isYearsAway(years: number): boolean {
		return years > 1;
	}
}