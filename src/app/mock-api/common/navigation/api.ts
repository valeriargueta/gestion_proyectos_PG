import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { CustomNavigationItem } from 'app/core/navigation/navigation.types';
import { SessionService } from 'app/core/service/session.service';
import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation } from 'app/mock-api/common/navigation/data';
import { cloneDeep } from 'lodash-es';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NavigationMockApi
{
    private readonly _compactNavigation: FuseNavigationItem[] = compactNavigation;
    private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    private readonly _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService,  private _sessionService: SessionService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        this._fuseMockApiService.onGet('api/common/navigation').reply(() => {
            return from(this.getNavigationData());
        });
    }
    private async getNavigationData(): Promise<[number, { default: CustomNavigationItem[] }]> {
        await this._sessionService.getSessionPermissions();
        const userPermissions = this._sessionService.userPermissions();

        // Fill compact navigation children using the default navigation
        this._compactNavigation.forEach((compactNavItem) => {
            this._defaultNavigation.forEach((defaultNavItem) => {
                if (defaultNavItem.id === compactNavItem.id) {
                    compactNavItem.children = cloneDeep(defaultNavItem.children);
                }
            });
        });

            // Filter navigation items based on permissions
            const filteredDefaultNavigation = this.filterNavigation(this._defaultNavigation, userPermissions);


                // this._futuristicNavigation.forEach((futuristicNavItem) =>
                // {
                //     this._defaultNavigation.forEach((defaultNavItem) =>
                //     {
                //         if ( defaultNavItem.id === futuristicNavItem.id )
                //         {
                //             futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                //         }
                //     });
                // });

                // // Fill horizontal navigation children using the default navigation
                // this._horizontalNavigation.forEach((horizontalNavItem) =>
                // {
                //     this._defaultNavigation.forEach((defaultNavItem) =>
                //     {
                //         if ( defaultNavItem.id === horizontalNavItem.id )
                //         {
                //             horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                //         }
                //     });
                // });

                // Return the response
                return [
                    200,
                    {
                        // compact   : cloneDeep(this._compactNavigation),
                        default   : cloneDeep(filteredDefaultNavigation),
                        // futuristic: cloneDeep(this._futuristicNavigation),
                        // horizontal: cloneDeep(this._horizontalNavigation),
                    },
                ];
            }
        // validate permissions
        private filterNavigation(navigation: CustomNavigationItem[], userPermissions: string[]): CustomNavigationItem[] {
            return navigation
                .map(item => ({
                    ...item,
                    children: item.children ? this.filterNavigation(item.children, userPermissions) : undefined
                }))
                .filter(item => !item.permission || this.hasPermission(item.permission, userPermissions));
        }
        
        private hasPermission(permission: string | string[], userPermissions: string[]): boolean {
            if (Array.isArray(permission)) {
                return permission.some(p => userPermissions.includes(p));
            }
            return userPermissions.includes(permission);
        }
}
