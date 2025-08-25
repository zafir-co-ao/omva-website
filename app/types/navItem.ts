export interface NavItem {
    to?: string;
    label: string;
    subItems?: {
        to: string;
        label: string;
    }[];
}
