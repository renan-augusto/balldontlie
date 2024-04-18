export interface ResultWapper<T> {
    data: T[];
    meta: {
        prev_cursor?: number,
        next_cursor?: number,
        per_page: number,
    };
}

export interface IResultWapperGeneral<T> {
    data: T[];
}

export interface ICommonType {
    label: string;
    value: string | number | ICommonType;
}