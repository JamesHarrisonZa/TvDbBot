export class RelativeDate {

	public readonly Date: string;
	private readonly _days: string[];
	private readonly _months: string[];

	constructor(currentDate: Date, compareDate: Date) {

		this._days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		this._months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		this.Date = this.GetRelativeDate(currentDate, compareDate);
	}

	private GetRelativeDate(currentDate: Date, compareDate: Date): string {

		const seconds = Math.round((compareDate.getTime() - currentDate.getTime()) / 1000);
		const minutes = seconds / 60;
		const hours =  minutes / 60;
		const days = hours / 24;
		const weeks = days / 7;
		const years = compareDate.getFullYear() - currentDate.getFullYear();

		const displayWeekDay = this._days[compareDate.getDay()];
		const displayDayOfTheMonth = compareDate.getDate();
		const displayMonth = this._months[compareDate.getMonth()];

		if (this.IsToday(days)) {
			return 'Today';
		} else if(this.IsTomorrow(days)) {
			return 'Tomorrow';
		} else if (this.IsThisWeek(days, weeks)) {
			return `This coming ${displayWeekDay}`;
		} else if (this.IsNextWeek(weeks)) {
			return `Next week ${displayWeekDay}`;
		} else if (this.IsThisYear(weeks, years)) {
			const roundedWeeks = Math.floor(weeks);
			return `In ${roundedWeeks} weeks, ${displayWeekDay} ${displayDayOfTheMonth} ${displayMonth}`;
		} else if (this.IsNextYear(years)) {
			return `Next year, ${displayWeekDay} ${displayDayOfTheMonth} ${displayMonth}`;
		} else if (this.IsYearsAway(years)) {
			return `In ${years} years, ${displayWeekDay} ${displayDayOfTheMonth} ${displayMonth} ${compareDate.getFullYear()}`;
		} else {
			return compareDate.toDateString();
		}
	}

	private IsToday(days: number): boolean {
		return days === 0;
	}

	private IsTomorrow(days: number): boolean {
		return days === 1;
	}

	private IsThisWeek(days: number, weeks: number): boolean {
		return days > 1 && weeks < 1;
	}

	private IsNextWeek(weeks: number): boolean {
		return weeks >= 1 && weeks < 2;
	}

	private IsThisYear(weeks: number, years: number): boolean {
		return weeks >= 2 && years === 0;
	}

	private IsNextYear(years: number): boolean {
		return years === 1;
	}

	private IsYearsAway(years: number): boolean {
		return years > 1;
	}
}