import {Account} from '../server/model/Models';

export enum AccessRight {
    CREATE,
    READ,
    UPDATE,
    DELETE,
}

export interface UserCredentials extends Account {
    accessRights: AccessRight[];
}
