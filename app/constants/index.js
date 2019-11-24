
const USER_FRIENDLY_DB_ERROR = Object.freeze({
    "23505": 'This eid already exist'
});

/**
 * @type {{A: string, R: string, D: string, U: string}}
 */
const OPERATIONS = {
    U: 'token_for_update',
    R: 'token_for_read',
    D: 'token_for_delete',
    A: 'token_for_all'
};

/**
 * @type {{READ: number, DELETE: number, UPDATE: number, WITHOUT_PROTECTION: number}}
 */
const PROTECTION_LVL = {
    WITHOUT_PROTECTION: 10, // without protection
    DELETE: 20,             // protection for delete operations
    UPDATE: 30,             // protection for delete & update operations
    READ: 40                // protection for delete & update & read operations
};

/**
 * What can be done without token
 */
const PROTECTION_LVL_ACCESSIBILITY = {
    [PROTECTION_LVL.WITHOUT_PROTECTION]:    [OPERATIONS.R, OPERATIONS.U, OPERATIONS.D],
    [PROTECTION_LVL.DELETE]:                [OPERATIONS.R, OPERATIONS.U],
    [PROTECTION_LVL.UPDATE]:                [OPERATIONS.R],
    [PROTECTION_LVL.READ]:                  null
};

const PROTECTION_FOR_OPERATIONS = {
    [OPERATIONS.R]: PROTECTION_LVL.READ,
    [OPERATIONS.U]: PROTECTION_LVL.UPDATE,
    [OPERATIONS.D]: PROTECTION_LVL.DELETE,
    [OPERATIONS.A]: PROTECTION_LVL.READ
};

module.exports = {
    USER_FRIENDLY_DB_ERROR,
    OPERATIONS,
    PROTECTION_LVL_ACCESSIBILITY,
    PROTECTION_LVL,
    PROTECTION_FOR_OPERATIONS
};