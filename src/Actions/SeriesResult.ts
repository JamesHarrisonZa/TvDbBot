export class SeriesResult {
	public Id: number;
	public Name: string;
	public Status: SeriesStatus;

	constructor(id: number, name: string, status: string) {
		this.Id = id;
		this.Name = name;

		if (status === 'Ended') {
			this.Status = SeriesStatus.Ended;
		}
		if (status === 'Continuing') {
			this.Status = SeriesStatus.Continuing;
		}
	}
}