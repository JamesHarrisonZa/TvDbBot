export class Greeting {

	public Phrases: string[];

	constructor() {
		this.Phrases = this.GetPhrases();
	}

	private GetPhrases(): string[] {

		return [
			'Hi',
			'Hello',
			'Hello There',
			'Well Hello There',
			'Greetings',
			'Shalom',
			'Word',
			'Sup.',
			'Hihi',
			'What is crack a lacking?',
			'Howyadoin?',
			'Dudester!',
			'Alrighty then!',
			'Hola',
			'Guten Targ',
			'Oh Hiii',
			'Oh hi there',
			'Howdy',
			'Bonjour',
			'Speak!',
			'Hey',
			'Hey There',
			'Moshi moshi',
			'Yo',
			'Domino\'s Pizza, pickup or delivery?',
			'What\'s up?',
			'What\'s up bitches?',
			'Good day to you!',
			'A Hoy Hoy!',
			'Good morrow!',
			'Ola!',
			'Greetings earthling'
		];
	}
}