import { LoginRequest as LoginRequest} from './LoginRequest';

describe('RequestRequest', () => {

	describe('LoginRequest', () => {

		var loginRequest = new LoginRequest();

		it('Should have UriOptions', () => {
			expect(loginRequest.UriOptions).toBeDefined();
		});
	});
});