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

		var displayWeekDay = this._days[compareDate.getDay()];
		var displayDayOfTheMonth = compareDate.getDate();
		var displayMonth = this._months[compareDate.getMonth()];

		if (days === 0) {
			return 'Today';
		} else if(days === 1) {
			return 'Tomorrow';
		} else if (days > 1 && weeks < 1) {
			return `This coming ${displayWeekDay}`;
		} else if (weeks >= 1 && weeks < 2) {
			return `Next week ${displayWeekDay}`;
		} else if (weeks >= 2 && years === 0) {
			const roundedWeeks = Math.floor(weeks);
			return `In ${roundedWeeks} weeks, ${displayWeekDay} ${displayDayOfTheMonth} ${displayMonth}`;
		} else if (years === 1) {
			return `Next year, ${displayWeekDay} ${displayDayOfTheMonth} ${displayMonth}`;
		} else if (years > 1) {
			return `In ${years} years, ${displayWeekDay} ${displayDayOfTheMonth} ${displayMonth} ${compareDate.getFullYear()}`;
		} else {
			return compareDate.toDateString();
		}
	}
}