import _ from "lodash";
import { PricingType, Gender, RoomGender } from "../types/enum";

//  (예약/방타입) 정보
export interface IRoomSelectInfo {
    roomTypeId: string;
    roomTypeName?: string;
    count: IGuestCount;
    pricingType: PricingType;
    roomNames?: string[];
}
export interface IGuestCount {
    male: number;
    female: number;
    roomCount: number;
}
export const DEFAULT_ROOMTYPE: any = {
    __typename: "RoomType",
    name: "",
    pricingType: PricingType.DOMITORY,
    peopleCount: 0,
    peopleCountMax: 0,
    index: -1,
    rooms: [],
    roomCount: 0,
    roomGender: RoomGender.SEPARATELY,
    description: null,
    defaultPrice: null,
    updatedAt: null,
    img: null,
    createdAt: undefined,
    _id: ""
};

export const getRoomSelectInfo = (
    guests: any[] | null,
    roomTypes: {
        _id: string;
        name: string;
        [key: string]: any;
    }[]
): IRoomSelectInfo[] => {
    if (!guests) return [];

    const roomTypesBuffer: string[] = [];
    const tempArr = guests.map((guest): IRoomSelectInfo | "duplicate" => {
        const guestRoomType =
            roomTypes?.find(roomType => roomType._id === guest.roomType._id) ||
            DEFAULT_ROOMTYPE;

        // 중복체크
        if (roomTypesBuffer.includes(guestRoomType._id)) return "duplicate";

        // 메모리에 접수
        roomTypesBuffer.push(guestRoomType._id);

        // 같은 방타입의 게스트들
        const sameRoomTypeGuests = guests.filter(
            guest => guest.roomType._id === guestRoomType._id
        );

        const tempRooms = _.uniq(
            guests
                .map(guest => guest.room)
                .filter(room => room)
                .map(room => room!.name)
        );

        return {
            roomTypeId: guest.roomType._id,
            roomTypeName: guestRoomType.name,
            roomNames: tempRooms,
            count: {
                female: sameRoomTypeGuests.filter(
                    guest => guest.gender === Gender.FEMALE
                ).length,
                male: sameRoomTypeGuests.filter(guest => guest.gender === Gender.MALE)
                    .length,
                roomCount: sameRoomTypeGuests.filter(guest => !guest.gender).length
            },
            pricingType: sameRoomTypeGuests.find(guest => guest.gender)
                ? PricingType.DOMITORY
                : PricingType.ROOM
        };
    });

    // 중복 제거
    // @ts-ignore
    const roomSelectInfo: IRoomSelectInfo[] = tempArr.filter(
        v => v !== "duplicate"
    );

    return roomSelectInfo;
};