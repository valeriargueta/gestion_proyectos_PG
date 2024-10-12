/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
import { SecureIpPermissions } from 'app/core/enums/permission.enum';
import { CustomNavigationItem } from 'app/core/navigation/navigation.types';

export const defaultNavigation: CustomNavigationItem[] = [
    {
        id   : 'home',
        title: 'NAVIGATION.HOME',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/home',
        permission: SecureIpPermissions.Console
    },    
    {
        id   : 'administration',
        title: 'NAVIGATION.ADMIN.TITLE',
        type : 'group',
        permission: [SecureIpPermissions.Roles, SecureIpPermissions.Users],
        children: [
            {
                id   : 'roles',
                title: 'NAVIGATION.ADMIN.ITEMS.ROLES',
                type : 'basic',
                icon : 'heroicons_outline:squares-2x2',
                link : '/roles',
                permission : [SecureIpPermissions.ListRole]
            },
            {
                id   : 'users',
                title: 'NAVIGATION.ADMIN.ITEMS.USERS',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/users',
                permission : [SecureIpPermissions.ListUser]
            }]
    },    
    {
        id   : 'projects',
        title: 'NAVIGATION.PROJECTS.TITLE',
        type : 'group',
        link : '/projects',
       // permission : [SecureIpPermissions.Merchants],
        children: [
            {
                id   : 'projects',
                title: 'NAVIGATION.PROJECTS.ITEMS.LIST',
                type : 'basic',
                icon : 'heroicons_outline:cog',
                link : '/projects/list',
               // permission : [SecureIpPermissions.ListMerchat]
            }]
    },
    {
        id   : 'reports',
        title: 'NAVIGATION.REPORTS.TITLE',
        type : 'group',
        link : '/reports',
        //permission : [SecureIpPermissions.Merchants],
        children: [
            {
                id   : 'reports',
                title: 'NAVIGATION.REPORTS.ITEMS.LIST',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-document-check',
                link : '/reports/list',
               // permission : [SecureIpPermissions.ListMerchat]
            }]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
