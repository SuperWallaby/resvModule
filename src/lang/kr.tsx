export default {
  sleep_unit: "박",
  day_unit: "일",
  choice: "선택하기",
  cancel: "취소하기",
  date_select: "날짜선택",
  product_select: "상품선택",
  check_select: "선택확인",
  do_reservation: "예약하기",
  bookerInfo: "예약자정보",
  date: "날짜",
  people: "인원",
  room_count: "방수",
  female: "여성",
  male: "남성",
  count: "개",
  select_product: "선택상품",
  option: "옵션",
  un_selected: "방을 선택해 주세요",
  addition_tax: "부가세",
  date_un_selected: "날짜를 선택해주세요",
  total_price: "총금액",
  no_room_select: "선택한 방이 없습니다.",
  there_is_no_select_person: "인원을 선택해주세요.",
  name: "이름",
  phoneNumber: "연락처",
  password: "비밀번호",
  memo: "메모",
  hand_phone: "휴대폰",
  else: "기타",
  only_number: "숫자만 입력 가능합니다.",
  payMethod: "결제수단",
  cardNumber: "카드번호",
  expiration: "유효기한",
  id_num: "주민등록번호",
  product: "상품",
  front2: "비밀번호 앞 2자리 **XX",
  front6_id: "주민등록번호 앞 (6자리)",
  year: "년",
  month: "월",
  bank_trans: "무통장입금",
  card: "카드결제",
  must: "(필수)",
  use_policy: "이용약관",
  personal_use_agree: "개인정보 수집 및 이용 동의",
  do_resv: "예약하기",
  pay_form: "결제정보",
  go_back: "뒤로가기",
  bankName: "은행명",
  accountHolder: "예금주",
  accountNum: "통장번호",
  total_get: (male: number, female: number, roomCount: number) => {
    let result = "";

    if (male) {
      result += male + "남 ";
    }
    if (female) {
      result += female + "여 ";
    }
    if (roomCount) {
      result += roomCount + "개 ";
    }

    return result;
  },
};
