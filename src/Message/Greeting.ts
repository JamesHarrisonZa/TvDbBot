export class Greeting {

	public readonly Phrases: string[];

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
			'Konichiwa',
			'Sup.',
			'Hihi',
			'What is crack a lacking?',
			'Howyadoin?',
			'Dudester!',
			'Alrighty then!',
			'Hola',
			'Guten targ',
			'Oh hi :)',
			'Oh hi there',
			'Howdy',
			'Bonjour',
			'Speak!',
			'Hey',
			'Hey There',
			'Moshi moshi',
			'Yo',
			'What\'s up?',
			'Good day to you!',
			'A Hoy Hoy!',
			'Good morrow!',
			'Ola!',
			'Greetings earthling',
			'Greetings mortal',
			'Howsit hanging?',
			'You dare disturb my slumber',
			'Ignore the man behind the curtain',
		];
	}
}