import gql from "graphql-tag";

export const F_BANK_ACOUNT_INFO = gql`
  fragment FbankAccountInfo on BankAccountInfo {
      bankName
      accountNum
      accountHolder
  }
`;


export const F_IMG = gql`
  fragment Fimg on JdFile {
    url
    filename
    mimeType
    tags {
      Key
      Value
    }
  }
`;

// 방타입에 관한 프레임
export const F_ROOMTYPE = gql`
  fragment FroomType on RoomType {
    _id
    name
    pricingType
    peopleCount
    peopleCountMax
    index
    roomCount
    roomGender
    img {
      ...Fimg
    }
    description
    defaultPrice
    createdAt
    updatedAt
    roomGender
  }
  ${F_IMG}
`;

export const F_ROOM_TYPE_DATE_PRICE_RESULT = gql`
  fragment FroomTypePriceResult on GetRoomTypeDatePricesResponse {
    ok
    error
    roomTypeDatePrices {
      roomType {
        ...FroomType
      }
      datePrices {
        date
        price
      }
    }
  }
  ${F_ROOMTYPE}
`;


//  방에대한 정보 프레임
export const F_ROOM = gql`
  fragment Froom on Room {
    _id
    name
  }
`;

export const F_CAPACITY_ROOM = gql`
  fragment FcapacityRoom on CapacityRoomType {
    checkIn
    checkOut
    capacities {
      room {
        ...Froom
      }
      isAvailable
    }
    count
  }
  ${F_ROOM}
`;

export const F_CAPACITY_DOMITORY = gql`
  fragment FcapacityDomitory on CapacityRoomTypeDomitory {
    checkIn
    checkOut
    capacities {
      room {
        ...Froom
      }
      genders
      beds
      count
    }
    availableCount {
      male
      female
      total
    }
  }
  ${F_ROOM}
`;





// 예약 ::예약생성 (게스트용)
export const START_BOOKING_FOR_PUBLIC = gql`
  mutation startBookingForPublic(
    $bookerParams: StartBookingBookerInput!
    $checkInOut: CheckInOutInput!
    $guestDomitoryParams: [StartBookingDomitoryGuestInput!]
    $guestRoomParams: [StartBookingRoomGuestInput!]
    $paymentParams: StartBookingPaymentInput!
  ) {
    StartBookingForPublic(
      bookerParams: $bookerParams
      checkInOut: $checkInOut
      guestDomitoryParams: $guestDomitoryParams
      guestRoomParams: $guestRoomParams
      paymentParams: $paymentParams
    ) {
      ok
      error
      booking {
        _id
        bookingNum
      }
    }
  }
`;

export const GET_HOUSE_FOR_PUBLIC = gql`
  query getHouseForPublic {
    GetHouseForPublic {
      ok
      error
      house {
        _id,
        phoneNumber,
        name,
        location {
          address
          addressDetail
        }
        roomTypes {
          ...FroomType
        }
        bookingPayInfo {
          bankAccountInfo {
            ...FbankAccountInfo
          }
          payMethods
        }
      }
    }
  }
  ${F_ROOMTYPE}
  ${F_BANK_ACOUNT_INFO}
`;

export const GET_ROOM_TYPE_INFO = gql`
  query getRoomTypeInfo($roomTypeId: ID!,$RoomTypeCapacityInput:RoomTypeCapacityInput!, $GetRoomTypeDatePricesInput:GetRoomTypeDatePricesInput!) {
    GetRoomTypeById(roomTypeId: $roomTypeId) {
      ok
      error
      roomType {
        _id
        capacity(param: $RoomTypeCapacityInput) {
          ... on CapacityRoomType {
            ...FcapacityRoom 
          }
          ... on CapacityRoomTypeDomitory {
            ...FcapacityDomitory
          }
        }
      }
    }
    GetRoomTypeDatePrices(
      param: $GetRoomTypeDatePricesInput
    ) {
      ...FroomTypePriceResult
    }
  }
  ${F_CAPACITY_DOMITORY}
  ${F_ROOM_TYPE_DATE_PRICE_RESULT}
  ${F_CAPACITY_ROOM}
`

