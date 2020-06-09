/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: makeBookingForPublic
// ====================================================

export interface makeBookingForPublic_MakeBookingForPublic_booking {
  __typename: "Booking";
  _id: string;
  bookingNum: string;
}

export interface makeBookingForPublic_MakeBookingForPublic {
  __typename: "MakeBookingResponse";
  ok: boolean;
  error: string | null;
  /**
   * Booking 말고... 트랜잭션 ID를 넘겨주자
   */
  booking: makeBookingForPublic_MakeBookingForPublic_booking | null;
}

export interface makeBookingForPublic {
  /**
   * madeByHost: false
   */
  MakeBookingForPublic: makeBookingForPublic_MakeBookingForPublic;
}

export interface makeBookingForPublicVariables {
  bookerParams: MakeBookingBookerInput;
  checkInOut: CheckInOutInput;
  guestDomitoryParams?: MakeBookingDomitoryGuestInput[] | null;
  guestRoomParams?: MakeBookingRoomGuestInput[] | null;
  paymentParams: MakeBookingPaymentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getHouseForPublic
// ====================================================

export interface getHouseForPublic_GetHouseForPublic_house_houseConfig_bookingConfig_collectingInfoFromGuest {
  __typename: "CollectingInfoFromGuest";
  email: boolean | null;
  country: boolean | null;
}

export interface getHouseForPublic_GetHouseForPublic_house_houseConfig_bookingConfig {
  __typename: "BookingConfig";
  /**
   * 최대 연박 가능일수: 1~180
   */
  maxStayDate: number;
  collectingInfoFromGuest: getHouseForPublic_GetHouseForPublic_house_houseConfig_bookingConfig_collectingInfoFromGuest | null;
  /**
   * 무조건 하루만 예약하게
   */
  bookOnlySingleDay: boolean | null;
}

export interface getHouseForPublic_GetHouseForPublic_house_houseConfig_options {
  __typename: "Tag";
  /**
   * '::'을 구분자로 사용하여 subKey를 입력할 수 있다. (subKey의 subKey도 가능) - ex) category::atmosphere
   */
  key: string;
  /**
   * 여기는 무조건 String만 들어감
   */
  value: string;
}

export interface getHouseForPublic_GetHouseForPublic_house_houseConfig {
  __typename: "HouseConfig";
  bookingConfig: getHouseForPublic_GetHouseForPublic_house_houseConfig_bookingConfig;
  options: getHouseForPublic_GetHouseForPublic_house_houseConfig_options[];
}

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
  houseConfig: getHouseForPublic_GetHouseForPublic_house_houseConfig;
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
// GraphQL query operation: getBookingForPublic
// ====================================================

export interface getBookingForPublic_GetBookingForPublic_booking_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface getBookingForPublic_GetBookingForPublic_booking_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: getBookingForPublic_GetBookingForPublic_booking_roomTypes_img_tags[] | null;
}

export interface getBookingForPublic_GetBookingForPublic_booking_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: getBookingForPublic_GetBookingForPublic_booking_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface getBookingForPublic_GetBookingForPublic_booking_checkInInfo {
  __typename: "CheckInInfo";
  isIn: boolean;
  checkInDateTime: any | null;
}

export interface getBookingForPublic_GetBookingForPublic_booking_payment_cardInfo {
  __typename: "PaymentInfo";
  authDate: any;
  billKey: string;
  cardName: string;
  cardNo: string;
  cardCl: number;
  card: Card | null;
  cardCode: number;
  cardNoHashed: string | null;
  isLive: boolean;
}

export interface getBookingForPublic_GetBookingForPublic_booking_payment {
  __typename: "Payment";
  /**
   * 단발성 결제인지, 정기결제인지 확인 => ONE_TIME, SUBSCRIPTION
   */
  type: PaymentType;
  payMethod: PayMethod;
  totalPrice: number;
  goodsVat: number | null;
  supplyAmt: number | null;
  status: PaymentStatus;
  paymentResultParam: any | null;
  refundedPrice: number | null;
  tid: string | null;
  cardInfo: getBookingForPublic_GetBookingForPublic_booking_payment_cardInfo | null;
}

export interface getBookingForPublic_GetBookingForPublic_booking_guests_roomType {
  __typename: "RoomType";
  _id: string;
}

export interface getBookingForPublic_GetBookingForPublic_booking_guests {
  __typename: "GuestDomitory" | "GuestRoom";
  _id: string;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
  /**
   * roomType 은 처음 예약하고나서 절대로 변경되지 않음.
   */
  roomType: getBookingForPublic_GetBookingForPublic_booking_guests_roomType;
}

export interface getBookingForPublic_GetBookingForPublic_booking {
  __typename: "Booking";
  _id: string;
  roomTypes: getBookingForPublic_GetBookingForPublic_booking_roomTypes[] | null;
  paidByNice: boolean | null;
  isNew: boolean;
  name: any;
  bookingNum: string;
  password: string | null;
  breakfast: boolean | null;
  phoneNumber: any;
  email: any | null;
  checkInInfo: getBookingForPublic_GetBookingForPublic_booking_checkInInfo;
  memo: string | null;
  agreePrivacyPolicy: boolean;
  checkIn: any;
  checkOut: any;
  payment: getBookingForPublic_GetBookingForPublic_booking_payment;
  funnels: Funnels | null;
  status: BookingStatus;
  createdAt: any;
  updatedAt: any | null;
  isConfirm: boolean;
  guests: getBookingForPublic_GetBookingForPublic_booking_guests[] | null;
}

export interface getBookingForPublic_GetBookingForPublic {
  __typename: "GetBookingResponse";
  ok: boolean;
  error: string | null;
  booking: getBookingForPublic_GetBookingForPublic_booking | null;
}

export interface getBookingForPublic {
  GetBookingForPublic: getBookingForPublic_GetBookingForPublic;
}

export interface getBookingForPublicVariables {
  param: GetBookingForPublicInput;
  skip: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchBooking
// ====================================================

export interface searchBooking_SearchBooking_data_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface searchBooking_SearchBooking_data_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: searchBooking_SearchBooking_data_roomTypes_img_tags[] | null;
}

export interface searchBooking_SearchBooking_data_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: searchBooking_SearchBooking_data_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface searchBooking_SearchBooking_data_checkInInfo {
  __typename: "CheckInInfo";
  isIn: boolean;
  checkInDateTime: any | null;
}

export interface searchBooking_SearchBooking_data_payment_cardInfo {
  __typename: "PaymentInfo";
  authDate: any;
  billKey: string;
  cardName: string;
  cardNo: string;
  cardCl: number;
  card: Card | null;
  cardCode: number;
  cardNoHashed: string | null;
  isLive: boolean;
}

export interface searchBooking_SearchBooking_data_payment {
  __typename: "Payment";
  /**
   * 단발성 결제인지, 정기결제인지 확인 => ONE_TIME, SUBSCRIPTION
   */
  type: PaymentType;
  payMethod: PayMethod;
  totalPrice: number;
  goodsVat: number | null;
  supplyAmt: number | null;
  status: PaymentStatus;
  paymentResultParam: any | null;
  refundedPrice: number | null;
  tid: string | null;
  cardInfo: searchBooking_SearchBooking_data_payment_cardInfo | null;
}

export interface searchBooking_SearchBooking_data_guests_roomType {
  __typename: "RoomType";
  _id: string;
  name: string;
  index: number;
  description: string | null;
}

export interface searchBooking_SearchBooking_data_guests {
  __typename: "GuestDomitory" | "GuestRoom";
  _id: string;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
  /**
   * roomType 은 처음 예약하고나서 절대로 변경되지 않음.
   */
  roomType: searchBooking_SearchBooking_data_guests_roomType;
}

export interface searchBooking_SearchBooking_data {
  __typename: "Booking";
  _id: string;
  roomTypes: searchBooking_SearchBooking_data_roomTypes[] | null;
  paidByNice: boolean | null;
  isNew: boolean;
  name: any;
  bookingNum: string;
  password: string | null;
  breakfast: boolean | null;
  phoneNumber: any;
  email: any | null;
  checkInInfo: searchBooking_SearchBooking_data_checkInInfo;
  memo: string | null;
  agreePrivacyPolicy: boolean;
  checkIn: any;
  checkOut: any;
  payment: searchBooking_SearchBooking_data_payment;
  funnels: Funnels | null;
  status: BookingStatus;
  createdAt: any;
  updatedAt: any | null;
  isConfirm: boolean;
  guests: searchBooking_SearchBooking_data_guests[] | null;
}

export interface searchBooking_SearchBooking {
  __typename: "SearchBookingResponse";
  ok: boolean;
  error: string | null;
  data: searchBooking_SearchBooking_data | null;
}

export interface searchBooking {
  SearchBooking: searchBooking_SearchBooking;
}

export interface searchBookingVariables {
  bookingNum: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Fguest
// ====================================================

export interface Fguest {
  __typename: "GuestDomitory" | "GuestRoom";
  _id: string;
  pricingType: PricingType;
  checkIn: any;
  checkOut: any;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FcardInfo
// ====================================================

export interface FcardInfo {
  __typename: "PaymentInfo";
  authDate: any;
  billKey: string;
  cardName: string;
  cardNo: string;
  cardCl: number;
  card: Card | null;
  cardCode: number;
  cardNoHashed: string | null;
  isLive: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Fpayment
// ====================================================

export interface Fpayment {
  __typename: "Payment";
  /**
   * 단발성 결제인지, 정기결제인지 확인 => ONE_TIME, SUBSCRIPTION
   */
  type: PaymentType;
  payMethod: PayMethod;
  totalPrice: number;
  goodsVat: number | null;
  supplyAmt: number | null;
  status: PaymentStatus;
  paymentResultParam: any | null;
  refundedPrice: number | null;
  tid: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FhouseConfig
// ====================================================

export interface FhouseConfig_assigTimeline_itemBlockOp {
  __typename: "ItemBlockOp";
  itemBlockOpEnable: boolean;
  useColor: boolean;
}

export interface FhouseConfig_assigTimeline {
  __typename: "AssigTimeline";
  roomTypeTabEnable: boolean;
  itemBlockOp: FhouseConfig_assigTimeline_itemBlockOp | null;
}

export interface FhouseConfig_pollingPeriod {
  __typename: "PollingPeriod";
  enable: boolean;
  period: number;
}

export interface FhouseConfig_options {
  __typename: "Tag";
  /**
   * '::'을 구분자로 사용하여 subKey를 입력할 수 있다. (subKey의 subKey도 가능) - ex) category::atmosphere
   */
  key: string;
  /**
   * 여기는 무조건 String만 들어감
   */
  value: string;
}

export interface FhouseConfig_bookingConfig_newBookingMark {
  __typename: "NewBookingMark";
  enable: boolean | null;
  newGuestTime: number;
}

export interface FhouseConfig_bookingConfig_collectingInfoFromGuest {
  __typename: "CollectingInfoFromGuest";
  email: boolean | null;
  country: boolean | null;
}

export interface FhouseConfig_bookingConfig {
  __typename: "BookingConfig";
  /**
   * 무조건 하루만 예약하게
   */
  bookOnlySingleDay: boolean | null;
  newBookingMark: FhouseConfig_bookingConfig_newBookingMark | null;
  collectingInfoFromGuest: FhouseConfig_bookingConfig_collectingInfoFromGuest | null;
}

export interface FhouseConfig_baseConfig {
  __typename: "BaseConfig";
  pricingTypes: PricingType[];
}

export interface FhouseConfig {
  __typename: "HouseConfig";
  assigTimeline: FhouseConfig_assigTimeline;
  pollingPeriod: FhouseConfig_pollingPeriod;
  options: FhouseConfig_options[];
  bookingConfig: FhouseConfig_bookingConfig;
  baseConfig: FhouseConfig_baseConfig;
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

// ====================================================
// GraphQL fragment: Fbooking
// ====================================================

export interface Fbooking_roomTypes_img_tags {
  __typename: "JdTag";
  Key: string;
  Value: string;
}

export interface Fbooking_roomTypes_img {
  __typename: "JdFile";
  url: any;
  filename: string;
  mimeType: string;
  tags: Fbooking_roomTypes_img_tags[] | null;
}

export interface Fbooking_roomTypes {
  __typename: "RoomType";
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  index: number;
  roomCount: number;
  roomGender: RoomGender;
  img: Fbooking_roomTypes_img | null;
  description: string | null;
  /**
   * 일괄적으로 적용되는 기본 방 가격... DailyPrice, SeasonPrice가 없는 경우 이 가격을 적용함.
   */
  defaultPrice: number | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface Fbooking_checkInInfo {
  __typename: "CheckInInfo";
  isIn: boolean;
  checkInDateTime: any | null;
}

export interface Fbooking_payment_cardInfo {
  __typename: "PaymentInfo";
  authDate: any;
  billKey: string;
  cardName: string;
  cardNo: string;
  cardCl: number;
  card: Card | null;
  cardCode: number;
  cardNoHashed: string | null;
  isLive: boolean;
}

export interface Fbooking_payment {
  __typename: "Payment";
  /**
   * 단발성 결제인지, 정기결제인지 확인 => ONE_TIME, SUBSCRIPTION
   */
  type: PaymentType;
  payMethod: PayMethod;
  totalPrice: number;
  goodsVat: number | null;
  supplyAmt: number | null;
  status: PaymentStatus;
  paymentResultParam: any | null;
  refundedPrice: number | null;
  tid: string | null;
  cardInfo: Fbooking_payment_cardInfo | null;
}

export interface Fbooking {
  __typename: "Booking";
  _id: string;
  roomTypes: Fbooking_roomTypes[] | null;
  paidByNice: boolean | null;
  isNew: boolean;
  name: any;
  bookingNum: string;
  password: string | null;
  breakfast: boolean | null;
  phoneNumber: any;
  email: any | null;
  checkInInfo: Fbooking_checkInInfo;
  memo: string | null;
  agreePrivacyPolicy: boolean;
  checkIn: any;
  checkOut: any;
  payment: Fbooking_payment;
  funnels: Funnels | null;
  status: BookingStatus;
  createdAt: any;
  updatedAt: any | null;
  isConfirm: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum BookingStatus {
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
}

export enum Card {
  AMX = "AMX",
  BC_CARD = "BC_CARD",
  CHOHUNG = "CHOHUNG",
  CHUKHYUP = "CHUKHYUP",
  CITY = "CITY",
  DINERS_CARD = "DINERS_CARD",
  GWANGJU = "GWANGJU",
  HANMI = "HANMI",
  HYUNDAI = "HYUNDAI",
  JCB = "JCB",
  JEJU_BANK = "JEJU_BANK",
  JEOCHUK = "JEOCHUK",
  JEONBOOK = "JEONBOOK",
  KAKAO_BANK = "KAKAO_BANK",
  KB_CARD = "KB_CARD",
  KDB = "KDB",
  KEB_HANA = "KEB_HANA",
  KOREA_POST = "KOREA_POST",
  K_BANK = "K_BANK",
  LOTTE_CARD = "LOTTE_CARD",
  MASTER_CARD = "MASTER_CARD",
  MG_CARD = "MG_CARD",
  NONGHYUP = "NONGHYUP",
  OK_CASH_BAG = "OK_CASH_BAG",
  SAMSUNG = "SAMSUNG",
  SAVINGS_BANK = "SAVINGS_BANK",
  SHINHAN = "SHINHAN",
  SHINSEGAE = "SHINSEGAE",
  SUHYUP = "SUHYUP",
  UNIONPAY = "UNIONPAY",
  VISA = "VISA",
  WOORI = "WOORI",
}

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

export enum PaymentType {
  ONE_TIME = "ONE_TIME",
  SUBSCRIPTION = "SUBSCRIPTION",
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

export interface GetBookingForPublicInput {
  bookingNum?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  password?: string | null;
}

export interface GetRoomTypeDatePricesInput {
  houseId?: string | null;
  checkIn: any;
  checkOut: any;
  roomTypeIds?: string[] | null;
}

/**
 * hosueId는 token에 의해서 불러와지는걸로
 */
export interface MakeBookingBookerInput {
  name: any;
  phoneNumber?: any | null;
  password: string;
  memo: string;
  email?: string | null;
  agreePrivacyPolicy: boolean;
  funnels?: Funnels | null;
  nationality?: string | null;
  breakfast?: boolean | null;
}

export interface MakeBookingDomitoryGuestInput {
  roomTypeId: string;
  countFemale: number;
  countMale: number;
}

export interface MakeBookingPaymentInput {
  price: number;
  payMethod: PayMethod;
  status?: PaymentStatus | null;
  cardPayInfo?: CreateBillKeyInput | null;
}

export interface MakeBookingRoomGuestInput {
  roomTypeId: string;
  countRoom: number;
}

export interface RoomTypeCapacityInitValueInput {
  count: number;
  gender: Gender;
}

export interface RoomTypeCapacityInput {
  checkInOut: CheckInOutInput;
  initValue?: RoomTypeCapacityInitValueInput | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
