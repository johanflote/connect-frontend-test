export interface HeaderResult<T extends string> {
    success: boolean;
    value: T | undefined;
}
