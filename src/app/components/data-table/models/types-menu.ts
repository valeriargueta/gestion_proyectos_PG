import { Validators } from '@angular/forms';

export type MenuActionsType = {
    Code: string;
    Actions: ActionTemplate[];
};

export type ActionTemplate = {
    Index: number;
    Code: string;
    Title: string;
    Action: string;
    Icon?: string;
    CssClass?: string;
};

export const ActionsMenu: ActionMenuList = {
    RoleActions: {
        Code: 'RoleActions',
        Actions: [
        
            {
                Index: 1,
                Code: 'editRole',
                Title: 'ROLES.TABLE.ACTIONS_MENU.EDIT',
                Action: 'EDIT'
            },
               {
                Index: 2,
                Code: 'activateDeactivate',
                Title: 'ROLES.TABLE.ACTIONS_MENU.ACTIVATE',
                Action: 'ACTIVATE'
            },
        ]
    },
    UserActions: {
        Code: 'UserActions',
        Actions: [
            {
                Index: 1,
                Code: 'editUser',
                Title: 'USERS.TABLE.ACTIONS_MENU.EDIT',
                Action: 'EDIT'
            },
            {
                Index: 2,
                Code: 'activateDeactivate',
                Title: 'USERS.TABLE.ACTIONS_MENU.ACTIVATE',
                Action: 'ACTIVATE'
            },
        ]
    },
    EstablismentActions: {
        Code: 'EstablismentActions',
        Actions: [
            {
                Index: 1,
                Code: 'editEstablishment',
                Title: 'ESTABLISHMENTS.TABLE.ACTIONS_MENU.EDIT',
                Action: 'EDIT'
            },
            {
                Index: 2,
                Code: 'activateDeactivate',
                Title: 'ESTABLISHMENTS.TABLE.ACTIONS_MENU.ACTIVATE',
                Action: 'ACTIVATE'
            }
        ]
    },
    TransactionsActions: {
        Code: 'TransactionsActions',
        Actions: [
            {
                Index: 1,
                Code: 'void',
                Title: 'TRANSACTIONS.TABLE.ACTIONS_MENU.VOID',
                Action: 'VOID',
                Icon: 'block',
                CssClass: 'text-accent-900 m-1'
            },
            /*
            {
                Index: 2,
                Code: 'holod',
                Title: 'TRANSACTIONS.TABLE.ACTIONS_MENU.HOLD',
                Action: 'REVERT',
                Icon: 'back_hand',
                CssClass: 'text-accent-900'
            }*/
        ]
    },
}

type ActionMenuList = {
    [key: string]: MenuActionsType;
};