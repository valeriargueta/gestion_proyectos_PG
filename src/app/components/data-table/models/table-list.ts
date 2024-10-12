import { ActionsMenu, MenuActionsType } from "./types-menu";

export type TableTypeList = {
    EnableExport?: boolean,
    EnableSearch?: boolean,
    showSearchUser?: boolean,
    showSearchQr?: boolean,
    Columns: ColumnTemplate[],
    CssClass?: string
};

export type ColumnTemplate = {
    Index: number;
    Code: string;
    Title: string;
    Menu?: MenuActionsType;
    Value?: any;
    CssClass?: string;
};

export const Tables: TableList = {
    Roles: {
        Columns: [
            {
                Index: 1,
                Code: 'name',
                Title: 'ROLES.TABLE.COLUMNS.NAME'
            },
            {
                Index: 2,
                Code: 'users',
                Title: 'ROLES.TABLE.COLUMNS.USERS'
            },
            {
                Index: 3,
                Code: 'status',
                Title: 'ROLES.TABLE.COLUMNS.STATUS'
            },
            {
                Index: 4,
                Code: 'actions',
                Title: 'ROLES.TABLE.COLUMNS.ACTIONS',
                Menu: ActionsMenu['RoleActions']
            }
        ]
    },
    Users: {
        EnableSearch: true,
        showSearchUser: true,
        Columns: [
            {
                Index: 1,
                Code: 'name',
                Title: 'USERS.TABLE.COLUMNS.NAME'
            },
            {
                Index: 2,
                Code: 'role',
                Title: 'USERS.TABLE.COLUMNS.ROLE'
            },
            {
                Index: 3,
                Code: 'status',
                Title: 'USERS.TABLE.COLUMNS.STATUS'
            },
            {
                Index: 4,
                Code: 'actions',
                Title: 'USERS.TABLE.COLUMNS.ACTIONS',
                Menu: ActionsMenu['UserActions']
            }
        ]
    },
    Establishments: {
        Columns: [
            {
                Index: 1,
                Code: 'id',
                Title: 'ESTABLISHMENTS.TABLE.COLUMNS.ID'
            },
            {
                Index: 2,
                Code: 'name',
                Title: 'ESTABLISHMENTS.TABLE.COLUMNS.NAME'
            },
            {
                Index: 3,
                Code: 'status',
                Title: 'ESTABLISHMENTS.TABLE.COLUMNS.STATUS'
            },
            {
                Index: 4,
                Code: 'actions',
                Title: 'ESTABLISHMENTS.TABLE.COLUMNS.ACTIONS',
                Menu: ActionsMenu['EstablismentActions']
            }
        ]
    },

    TransactionsTable: {
        EnableExport: true,
        Columns: [
            {
                Index: 1,
                Code: 'id',
                Title: 'TRANSACTIONS.TABLE.COLUMNS.ID'
            },
            {
                Index: 2,
                Code: 'cardType',
                Title: 'TRANSACTIONS.TABLE.COLUMNS.CARD_TYPE'
            },
            {
                Index: 3,
                Code: 'cardLastFour',
                Title: 'TRANSACTIONS.TABLE.COLUMNS.CARD_LAST_FOUR',
            },
            {
                Index: 4,
                Code: 'authCode',
                Title: 'TRANSACTIONS.TABLE.COLUMNS.AUTH_CODE',
            },
            {
                Index: 5,
                Code: 'cardIssuer',
                Title: 'TRANSACTIONS.TABLE.COLUMNS.CARD_ISSUER'
            },
            {
                Index: 6,
                Code: 'responseCode',
                Title: 'TRANSACTIONS.TABLE.COLUMNS.RESPONSE_CODE',
            },
            {
                Index: 7,
                Code: 'responseMessage',
                Title: 'TRANSACTIONS.TABLE.COLUMNS.RESPONSE_MESSAGE',
                CssClass: 'text-start'
            },
            {
                Index: 8,
                Code: 'amount',
                Title: 'TRANSACTIONS.TABLE.COLUMNS.AMOUNT',
               
            },
            {
                Index: 9,
                Code: 'createdAt',
                Title: 'TRANSACTIONS.TABLE.COLUMNS.CREATED_AT'
            },
            {
                Index: 10,
                Code: 'processor',
                Title: 'TRANSACTIONS.TABLE.COLUMNS.PROCESSOR',
                CssClass: 'text-start'
            },
            {
                Index: 11,
                Code: 'actions',
                Title: 'TRANSACTIONS.TABLE.COLUMNS.ACTIONS',
                Menu: ActionsMenu["TransactionsActions"]
            }
        ]
    },

    QrTable: {
        showSearchQr: true,
        EnableExport: false,
        EnableSearch: true,
        Columns: [
            {
                Index: 1,
                Code: 'id',
                Title: 'ESTABLISHMENTS.QR.TABLE.COLUMNS.ID'
            },
            {
                Index: 2,
                Code: 'externalReference',
                Title: 'ESTABLISHMENTS.QR.TABLE.COLUMNS.EXTERNAL_REFERENCE'
            },
            {
                Index: 3,
                Code: 'description',
                Title: 'ESTABLISHMENTS.QR.TABLE.COLUMNS.DESCRIPTION'
            },
            {
                Index: 4,
                Code: 'createdAt',
                Title: 'TRANSACTIONS.TABLE.COLUMNS.CREATED_AT'
            },
            {
                Index: 5,
                Code: 'qr',
                Title: 'ESTABLISHMENTS.QR.TABLE.COLUMNS.URL',
            },
        ]
    },
}

type TableList = {
    [key: string]: TableTypeList;
};