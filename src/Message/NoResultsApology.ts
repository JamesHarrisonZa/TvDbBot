export class NoResultsApology {

	public readonly Phrases;

	constructor() {
		this.Phrases = this.GetPhrases();
	}

	private GetPhrases(): string[] {
		return [
			'Could not find that series :(',
			'I couldn\'d find that series :(',
			'Unable to find that series :('
		];
	}
}