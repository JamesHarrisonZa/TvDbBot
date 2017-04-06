import { Authorization as Authorization } from './Authorization';

describe('Authorization', () => {

	var authorization = new Authorization();

	it('Should have a Token', () => {

		expect(authorization.Token).not.toBe(null);
	});
});