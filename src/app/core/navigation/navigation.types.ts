import { FuseNavigationItem } from '@fuse/components/navigation';

export interface CustomNavigationItem extends FuseNavigationItem {
    permission?: string | string[];
    children?: CustomNavigationItem[];
    hidden?: (item: CustomNavigationItem) => boolean;
}

export interface Navigation
{
    compact: FuseNavigationItem[];
    default: FuseNavigationItem[];
    futuristic: FuseNavigationItem[];
    horizontal: FuseNavigationItem[];
}
