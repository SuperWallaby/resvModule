/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: startBookingForPublic
// ====================================================

export interface startBookingForPublic_StartBookingForPublic_booking {
  __typename: "Booking";
  _id: string;
  bookingNum: string;
}

export interface startBookingForPublic_StartBookingForPublic {
  __typename: "StartBookingResponse";
  ok: boolean;
  error: string | null;
  /**
   * Booking 말고... 트랜잭션 ID를 넘겨주자
   */
  booking: startBookingForPublic_StartBookingForPublic_booking | null;
}

export interface startBookingForPublic {
  StartBookingForPublic: startBookingForPublic_StartBookingForPublic;
}

export interface startBookingForPublicVariables {
  bookerParams: StartBookingBookerInput;
  checkInOut: CheckInOutInput;
  guestDomitoryParams?: StartBookingDomitoryGuestInput[] | null;
  guestRoomParams?: StartBookingRoomGuestInput[] | null;
  paymentParams: StartBookingPaymentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getHouseForPublic
// ====================================================

export interface getHouseForPublic_GetHouseForPublic_house_location {
  __typename: "Location";
  address: string;
  addressDetail: string | null;
}

export interface getHouseForPublic_GetHouseForPublic_house_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getHouseForPublic_GetHouseForPublic_house_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getHouseForPublic_GetHouseForPublic_house_roomTypes_img_tags[] | null;
}

export interface getHouseForPublic_GetHouseForPublic_house_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: getHouseForPublic_GetHouseForPublic_house_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface getHouseForPublic_GetHouseForPublic_house_bookingPayInfo_bankAccountInfo {
  __typename: "BankAccountInfo";
  bankName: string;
  accountNum: string;
  accountHolder: string;
}

export interface getHouseForPublic_GetHouseForPublic_house_bookingPayInfo {
  __typename: "BookingPayInfo";
  bankAccountInfo: getHouseForPublic_GetHouseForPublic_house_bookingPayInfo_bankAccountInfo | null;
  payMethods: PayMethod[] | null;
}

export interface getHouseForPublic_GetHouseForPublic_house {
  __typename: "House";
  _id: string;
  phoneNumber: any | null;
  name: string;
  location: getHouseForPublic_GetHouseForPublic_house_location;
  roomTypes: getHouseForPublic_GetHouseForPublic_house_roomTypes[] | null;
  bookingPayInfo: getHouseForPublic_GetHouseForPublic_house_bookingPayInfo;
}

export interface getHouseForPublic_GetHouseForPublic {
  __typename: "GetHouseResponse";
  ok: boolean;
  error: string | null;
  house: getHouseForPublic_GetHouseForPublic_house | null;
}

export interface getHouseForPublic {
  GetHouseForPublic: getHouseForPublic_GetHouseForPublic;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRoomTypeInfo
// ====================================================

export interface getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomType_capacities_room {
  __typename: "Room";
  _id: string;
  name: string;
}

export interface getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomType_capacities {
  __typename: "RoomAvailable";
  room: getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomType_capacities_room;
  isAvailable: boolean;
}

export interface getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomType {
  __typename: "CapacityRoomType";
  checkIn: any;
  checkOut: any;
  capacities: getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomType_capacities[];
  count: number;
}

export interface getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomTypeDomitory_capacities_room {
  __typename: "Room";
  _id: string;
  name: string;
}

export interface getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomTypeDomitory_capacities {
  __typename: "CapacityRoomDomitory";
  room: getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomTypeDomitory_capacities_room;
  genders: Gender[];
  beds: number[];
  count: number;
}

export interface getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomTypeDomitory_availableCount {
  __typename: "AvailableGenderCount";
  male: number;
  female: number;
  total: number;
}

export interface getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomTypeDomitory {
  __typename: "CapacityRoomTypeDomitory";
  checkIn: any;
  checkOut: any;
  capacities: getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomTypeDomitory_capacities[];
  availableCount: getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomTypeDomitory_availableCount;
}

export type getRoomTypeInfo_GetRoomTypeById_roomType_capacity = getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomType | getRoomTypeInfo_GetRoomTypeById_roomType_capacity_CapacityRoomTypeDomitory;

export interface getRoomTypeInfo_GetRoomTypeById_roomType {
  __typename: "RoomType";
  _id: string;
  /**
   * 예전에 Facilities 랑 같은 아이임...
   */
  capacity: getRoomTypeInfo_GetRoomTypeById_roomType_capacity;
}

export interface getRoomTypeInfo_GetRoomTypeById {
  __typename: "GetRoomTypeByIdResponse";
  ok: boolean;
  error: string | null;
  roomType: getRoomTypeInfo_GetRoomTypeById_roomType | null;
}

export interface getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_roomType_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_roomType_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_roomType_img_tags[] | null;
}

export interface getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_roomType {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_roomType_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices {
  __typename: "DatePrice";
  date: any;
  price: number;
}

export interface getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices {
  __typename: "RoomTypeDatePrice";
  roomType: getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_roomType;
  datePrices: getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices_datePrices[] | null;
}

export interface getRoomTypeInfo_GetRoomTypeDatePrices {
  __typename: "GetRoomTypeDatePricesResponse";
  ok: boolean;
  error: string | null;
  roomTypeDatePrices: getRoomTypeInfo_GetRoomTypeDatePrices_roomTypeDatePrices[] | null;
}

export interface getRoomTypeInfo {
  GetRoomTypeById: getRoomTypeInfo_GetRoomTypeById;
  GetRoomTypeDatePrices: getRoomTypeInfo_GetRoomTypeDatePrices;
}

export interface getRoomTypeInfoVariables {
  roomTypeId: string;
  RoomTypeCapacityInput: RoomTypeCapacityInput;
  GetRoomTypeDatePricesInput: GetRoomTypeDatePricesInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FbankAccountInfo
// ====================================================

export interface FbankAccountInfo {
  __typename: "BankAccountInfo";
  bankName: string;
  accountNum: string;
  accountHolder: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Fimg
// ====================================================

export interface Fimg_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface Fimg {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: Fimg_tags[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FroomType
// ====================================================

export interface FroomType_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface FroomType_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: FroomType_img_tags[] | null;
}

export interface FroomType {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: FroomType_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FroomTypePriceResult
// ====================================================

export interface FroomTypePriceResult_roomTypeDatePrices_roomType_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface FroomTypePriceResult_roomTypeDatePrices_roomType_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: FroomTypePriceResult_roomTypeDatePrices_roomType_img_tags[] | null;
}

export interface FroomTypePriceResult_roomTypeDatePrices_roomType {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: FroomTypePriceResult_roomTypeDatePrices_roomType_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface FroomTypePriceResult_roomTypeDatePrices_datePrices {
  __typename: "DatePrice";
  date: any;
  price: number;
}

export interface FroomTypePriceResult_roomTypeDatePrices {
  __typename: "RoomTypeDatePrice";
  roomType: FroomTypePriceResult_roomTypeDatePrices_roomType;
  datePrices: FroomTypePriceResult_roomTypeDatePrices_datePrices[] | null;
}

export interface FroomTypePriceResult {
  __typename: "GetRoomTypeDatePricesResponse";
  ok: boolean;
  error: string | null;
  roomTypeDatePrices: FroomTypePriceResult_roomTypeDatePrices[] | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Froom
// ====================================================

export interface Froom {
  __typename: "Room";
  _id: string;
  name: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FcapacityRoom
// ====================================================

export interface FcapacityRoom_capacities_room {
  __typename: "Room";
  _id: string;
  name: string;
}

export interface FcapacityRoom_capacities {
  __typename: "RoomAvailable";
  room: FcapacityRoom_capacities_room;
  isAvailable: boolean;
}

export interface FcapacityRoom {
  __typename: "CapacityRoomType";
  checkIn: any;
  checkOut: any;
  capacities: FcapacityRoom_capacities[];
  count: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FcapacityDomitory
// ====================================================

export interface FcapacityDomitory_capacities_room {
  __typename: "Room";
  _id: string;
  name: string;
}

export interface FcapacityDomitory_capacities {
  __typename: "CapacityRoomDomitory";
  room: FcapacityDomitory_capacities_room;
  genders: Gender[];
  beds: number[];
  count: number;
}

export interface FcapacityDomitory_availableCount {
  __typename: "AvailableGenderCount";
  male: number;
  female: number;
  total: number;
}

export interface FcapacityDomitory {
  __typename: "CapacityRoomTypeDomitory";
  checkIn: any;
  checkOut: any;
  capacities: FcapacityDomitory_capacities[];
  availableCount: FcapacityDomitory_availableCount;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Funnels {
  AGODA = "AGODA",
  AIRBNB = "AIRBNB",
  BOOKING_COM = "BOOKING_COM",
  COOPANG = "COOPANG",
  ELSE_CHANNEL = "ELSE_CHANNEL",
  FREINDS = "FREINDS",
  HOMEPAGE = "HOMEPAGE",
  NAVER = "NAVER",
  PHONE_CALL = "PHONE_CALL",
  WALK_IN = "WALK_IN",
  YANOLJA = "YANOLJA",
  YEOGIEOTTAE = "YEOGIEOTTAE",
}

/**
 * 도미토리 방식으로 예약한 게스트만 적용됨
 */
export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}

export enum PayMethod {
  BANK_TRANSFER = "BANK_TRANSFER",
  BILL = "BILL",
  CARD = "CARD",
  CASH = "CASH",
  CHANNEL_PAY = "CHANNEL_PAY",
  VBANK = "VBANK",
}

export enum PaymentStatus {
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  NOT_YET = "NOT_YET",
}

export enum PricingType {
  DOMITORY = "DOMITORY",
  ROOM = "ROOM",
}

export enum RoomGender {
  ANY = "ANY",
  FEMALE = "FEMALE",
  MALE = "MALE",
  SEPARATELY = "SEPARATELY",
}

export interface CheckInOutInput {
  checkIn: any;
  checkOut: any;
}

export interface CreateBillKeyInput {
  cardNo: string;
  cardPw: string;
  expYear: string;
  expMonth: string;
  idNo: string;
}

export interface GetRoomTypeDatePricesInput {
  houseId?: string | null;
  checkIn: any;
  checkOut: any;
  roomTypeIds?: string[] | null;
}

export interface RoomTypeCapacityInitValueInput {
  count: number;
  gender: Gender;
}

export interface RoomTypeCapacityInput {
  checkInOut: CheckInOutInput;
  initValue?: RoomTypeCapacityInitValueInput | null;
}

/**
 * hosueId는 token에 의해서 불러와지는걸로
 */
export interface StartBookingBookerInput {
  name: any;
  phoneNumber: any;
  password: string;
  memo: string;
  email?: string | null;
  agreePrivacyPolicy: boolean;
  funnels?: Funnels | null;
  nationality?: string | null;
  breakfast?: boolean | null;
}

export interface StartBookingDomitoryGuestInput {
  roomTypeId: string;
  countFemale: number;
  countMale: number;
}

export interface StartBookingPaymentInput {
  price: number;
  payMethod: PayMethod;
  status?: PaymentStatus | null;
  cardPayInfo?: CreateBillKeyInput | null;
}

export interface StartBookingRoomGuestInput {
  roomTypeId: string;
  countRoom: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
