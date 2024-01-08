export interface ResultWapper<T> {
    data: T[];
    meta: {
        total_pages: number,
        current_page: number,
        next_page?: number,
        per_page: number,
        total_count: number
    };
}

export interface ICommonType {
    label: string;
    value: string | ICommonType;
}

export interface IMenuItem {
    label: string;
    link: string;
}
