import { Routes } from '@angular/router';
import { DataService } from 'app/core/data/data.service';
import { inject } from '@angular/core';
import { UsersComponent } from './users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SecureIpPermissions } from 'app/core/enums/permission.enum';
import { verifyPermissionGuard } from 'app/core/guards/auth.guard';

export default [
    {
        path     : '',
        component: UsersComponent,
        data: {
            permission: [SecureIpPermissions.Users, SecureIpPermissions.ListUser],
          },
          canActivate: [verifyPermissionGuard]
    },
    {
        path     : 'add',
        component: NewUserComponent,
        data: {
            permission: [SecureIpPermissions.Users, SecureIpPermissions.CreateUser]
        },
        canActivate: [verifyPermissionGuard]
    },
    {
        path     : 'edit',
        component: EditUserComponent,
        data: {
            permission: [SecureIpPermissions.Users, SecureIpPermissions.UpdateUser]
        },
        canActivate: [verifyPermissionGuard]
    }
] as Routes;
