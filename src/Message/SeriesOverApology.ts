export class SeriesOverApology {

	public readonly Phrases;

	constructor() {
		this.Phrases = this.GetPhrases();
	}

	private GetPhrases(): string[] {
		return [
			'Oh dear. That series has ended :(',
			'That series is over :( I hope they make some more.'
		];
	}
}