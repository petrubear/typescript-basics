import {UserCredentialsDBAccess} from '../src/authorization/UserCredentialsDBAccess';

class DbTests {
    public dbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
}

new DbTests().dbAccess.putUserCredential({
    username: 'user1',
    password: 'password',
    accessRights: [1, 2, 3],
});
