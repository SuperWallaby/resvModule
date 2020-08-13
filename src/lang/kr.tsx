export default {
	PaymentStatus: {
		CANCELED: '결제취소',
		NOT_YET: '미결제',
		COMPLETED: '결제완료'
	},
	COMPLETE: '예약이 완료 되었습니다.',
	FAIL: '예약이 실패 하였습니다.',
	PayMethod: {
		BILL: '잔다페이',
		VBANK: '가상계좌',
		CASH: '현금결제',
		CARD: '카드결제',
		CHANNEL_PAY: '채널결제',
		BANK_TRANSFER: '무통장 입금'
	},
	createdAt: '생성일자',
	paymentStatus: '결제상태',
	sleep_unit: '박',
	day_unit: '일',
	choice: '선택하기',
	cancel: '취소하기',
	date_select: '날짜선택',
	product_select: '상품선택',
	check_select: '선택확인/예약',
	do_reservation: '예약하기',
	bookerInfo: '예약자정보',
	date: '날짜',
	people: '인원',
	room_count: '방수',
	female: '여성',
	male: '남성',
	count: '개',
	select_product: '선택상품',
	option: '옵션',
	un_selected: '상품을 선택해 주세요',
	addition_tax: '부가세',
	date_un_selected: '날짜를 선택해주세요',
	total_price: '총금액',
	no_room_select: '선택한 상품이 없습니다.',
	there_is_no_select_person: '인원을 선택해주세요.',
	name: '이름',
	phoneNumber: '연락처',
	password: '비밀번호',
	memo: '메모',
	hand_phone: '휴대폰',
	else: '기타',
	only_number: '숫자만 입력 가능합니다.',
	payMethod: '결제수단',
	cardNumber: '카드번호',
	expiration: '유효기한',
	id_num: '주민등록번호',
	product: '상품',
	front2: '비밀번호 앞 2자리 **XX',
	front6_id: '주민등록번호 앞 (6자리)',
	year: '년',
	month: '월',
	bank_trans: '무통장입금',
	card: '카드결제',
	must: '(필수)',
	use_policy: '이용약관',
	personal_use_agree: '개인정보 수집 및 이용 동의',
	do_resv: '예약하기',
	pay_form: '결제정보',
	go_back: '뒤로가기',
	bankName: '은행명',
	accountHolder: '예금주',
	accountNum: '통장번호',
	bookingNumber: '예약번호',
	total_get: (male: number, female: number, roomCount: number) => {
		let result = '';

		if (male) {
			result += male + '남 ';
		}
		if (female) {
			result += female + '여 ';
		}
		if (roomCount) {
			result += roomCount + '개 ';
		}

		return result;
	},
	reservation_lookup: '예약조회',
	goto_booking_page: '예약페이지로',
	reference_fail: '조회실패',
	reference_success: '조회성공',
	resv_complete_modal_view_title: '예약이 완료되었습니다.',
	confirm: '확인',
	close: '닫기',
	move_to_confirm_page: '확인을 누르시면 예약 확인 페이지로 이동합니다.',
	out_range_msg: (N: number) => `최대 연박일은 ${N}일 입니다.`,
	complete_msg: '완료 메세지',
	we_collect_your_personal_information_to_provide_the_service: '서비스 제공을 위해 귀하의 개인정보를 수집합니다.',
	privacy_item: '개인정보 항목',
	purpose_of_collection: '수집 목적',
	retention_period: '보유 기간',
	contact: '연락처',
	smooth_reservation_management: '원활한 예약 관리',
	six_months_after_stay: `예약후 6개월`,
	the_minimum_personal_information_required_to_provide_the_service_is_required_to_use_the_service:
		'서비스 제공을 위해 필요한 최소한의 개인정보이므로 동의를 해주셔야 서비스를 이용하실수 있습니다',
	if_you_violate_the_accommodation_policy_your_personal_information_will_be_saved_with_the_violation:
		'이용 규정을 위반할 시 위반내용과 함께 개인정보가 저장됩니다.'
};
