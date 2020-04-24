import React, { Fragment } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { getHouseForPublic, startBookingForPublic, startBookingForPublicVariables } from '../types/api';
import { GET_HOUSE_FOR_PUBLIC, START_BOOKING_FOR_PUBLIC } from '../apollo/queries';
import client from '../apollo/apolloClient';
import { utills, useModal, JDmodal, JDbutton } from '@janda-com/front';
import { LANG } from '../App';
import Reservation from './Reservation';
import { Link } from 'react-router-dom';

const { queryDataFormater, onCompletedMessage } = utills;

interface IProps {
	publickey: string;
}

const ReservationWrap: React.FC<IProps> = ({ publickey }) => {
	// 스타트부킹(게스트)
	const { data, loading } = useQuery<getHouseForPublic>(GET_HOUSE_FOR_PUBLIC, {
		client,
		skip: publickey === undefined
	});
	const confirmModal = useModal();

	const houseData = queryDataFormater(data, 'GetHouseForPublic', 'house', undefined) || undefined;

	const [ startBookingForPublicMu, { loading: startBookingLoading } ] = useMutation<
		startBookingForPublic,
		startBookingForPublicVariables
	>(START_BOOKING_FOR_PUBLIC, {
		client,
		onCompleted: ({ StartBookingForPublic }) => {
			onCompletedMessage(StartBookingForPublic, LANG('COMPLETE'), LANG('FAIL'));
		}
	});

	const startBookingFn = (param: startBookingForPublicVariables) => {
		startBookingForPublicMu({
			variables: param
		});
	};

	if (loading) return <div />;
	if (!houseData) return <div>err</div>;

	return (
		<Fragment>
			<JDmodal
				foot={
					<Fragment>
						<Link to="/">
							<JDbutton label="확인" />
						</Link>
						<JDbutton label="취소" />
					</Fragment>
				}
				{...confirmModal}
				loading={startBookingLoading}
			>
				{
					<span>
						예약이 완료되었습니다.
						<br /> 예약 확인 페이지로 이동합니다.
					</span>
				}
			</JDmodal>
			<Reservation houseData={houseData} startBookingFn={startBookingFn} />
		</Fragment>
	);
};

export default ReservationWrap;
