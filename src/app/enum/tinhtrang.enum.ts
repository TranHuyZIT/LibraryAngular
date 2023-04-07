enum TinhTrangEnum {
    VERY_GOOD = 'Mới',
    GOOD = 'Tốt',
    BAD = 'Tệ',
    UNUSEABLE = 'Không sử dụng được',
}
export default TinhTrangEnum;
export function convertGenderValueToKey(value: any) {
    return Object.keys(TinhTrangEnum)[
        Object.values(TinhTrangEnum).indexOf(value)
    ];
}
export type bookItem = {
    trangThai: boolean;
    soLanMuon: number;
    tinhTrang: keyof TinhTrangEnum;
};
