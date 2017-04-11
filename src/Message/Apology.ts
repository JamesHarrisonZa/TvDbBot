export class Apology {

	public readonly Phrases;

	constructor() {
		this.Phrases = this.GetPhrases();
	}

	private GetPhrases(): string[] {
		return [
			'I\'m sorry I didn\'t understand',
			'I\'m sorry, my wires got crossed and something went wrong',
			'I\'m sorry, im still learning. Can we try another?'
		];
	}
}