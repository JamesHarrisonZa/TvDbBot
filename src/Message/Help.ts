export class Help {

	public readonly Phrases;

	constructor() {
		this.Phrases = this.GetPhrases();
	}

	private GetPhrases(): string[] {
		return [
			'Hi ! Its a pleasure to meet you! My creator and god hasnt given me a proper name yet. ' +
			'I have watched all the TV and Anime in the world and can let you know when the newest episodes of your favourite series are coming out. ' +
			'And hopefully soon, be able to send you a reminder when they do. ' +
			'Why dont you try ask me some questions! ' +
			'As an example why dont you try ask: When is the next Game of thrones?'
		];
	}
}