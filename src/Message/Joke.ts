export class Joke {

	public readonly Phrases: string[];

	constructor() {
		this.Phrases = this.GetPhrases();
	}

	private GetPhrases(): string[] {

		return [
			'If having coffee in the morning doesnt wake you up, try deleting a production database instead.',
			'A SQL query goes into a bar, walks up to two tables and asks, "Can I join you?"',
			'How many programmers does it take to change a light bulb?, none, that\'s a hardware problem.',
			'Whats the object-oriented way to become wealthy? Inheritance.',
			'Why did the programmer quit his job? Because he didn\'t get arrays.',
			'Chuck Norris writes code that optimizes itself.',
			'Chuck Norris can take a screenshot of his blue screen.',
			'A programmer had a problem. He dicided to use Java. Now he has a problem factory',
			'I don\'t see women as objects. I consider each to be in a class of her own.',
			'Don\'t anthropomorphize computers. They hate that!',
			'Why do java programmers have to wear glasses? Because of the Eclipse.',
			'Your momma\'s so fat, that when she sat on a binary tree she turned it into a sorted linked-list in O(1).',
			'I � Unicode.',
			'Why did the concurrent chicken cross the road? the side other To to get',
			'There are no shortcuts in life, unless you right click and find one...',
			'Why did Microsoft name their new search engine BING? Because It\'s Not Google!',
			'Rome wasn\'t built in O(1)',
			'If whitespace were truly white it would have show up on black background.'
		];
		//If your mom was a collection class, her insert method would be public.
	}
}