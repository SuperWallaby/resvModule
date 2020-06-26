import React, { Fragment, useState } from 'react';
import { JDtypho, JDalign, JDbutton, IJDalignProp } from '@janda-com/front';
import { IResvContext, IRoomSelectInfo } from '../../pages/declare';
import { getHouseForPublic_GetHouseForPublic_house_roomTypes } from '../../types/api';
import { LANG } from '../../App';
import { IRoomTypeContext, Gender } from './RoomTypeWrap';
import { getAvailableCountFromQuery } from './helper';
import { queryDataFormater } from '@janda-com/front';

interface CounterProp {
	count: number;
	handleCount: (flag: boolean, target: any) => any;
	target?: any;
	label: string;
	maxCount: number;
}

export const Counter: React.FC<CounterProp> = ({ handleCount, target, count, label, maxCount }) => {
	return (
		<JDalign
			className="counter"
			flex={{
				vCenter: true
			}}
		>
			<JDtypho weight={600} mr="large">
				{label}
			</JDtypho>
			<JDalign className="counter__inner">
				<JDbutton
					disabled={count === 0}
					thema="grey1"
					mode="flat"
					className="counter__btn"
					onClick={() => {
						handleCount(false, target);
					}}
				>
					-
				</JDbutton>
				<JDbutton thema="grey1" mode="flat" className="counter__count">
					{count}
				</JDbutton>
				<JDbutton
					disabled={maxCount <= count}
					thema="grey1"
					mode="flat"
					className="counter__btn"
					onClick={() => {
						handleCount(true, target);
					}}
				>
					+
				</JDbutton>
			</JDalign>
		</JDalign>
	);
};

interface IProps {
	resvContext: IResvContext;
	roomType: getHouseForPublic_GetHouseForPublic_house_roomTypes;
	fullDatePrice: number;
	targetSelectInfo: IRoomSelectInfo;
	isDomitory: boolean;
	roomTypeContext: IRoomTypeContext;
	availableCount: {
		maleCount: number;
		femaleCount: number;
		roomCount: number;
	};
	alignProp?: IJDalignProp;
}

const CountSelecter: React.FC<IProps> = ({
	resvContext,
	targetSelectInfo,
	fullDatePrice,
	isDomitory,
	roomTypeContext,
	availableCount,
	alignProp
}) => {
	const [ loading, setLoading ] = useState(false);
	const { refetchCapacity, capacityData, sharedQueryVariable } = roomTypeContext;
	const {
		femaleCount: availableCountFemale,
		maleCount: availableCountMale,
		roomCount: availableCountRoom
	} = availableCount;
	const { roomSelectInfo, setRoomSelectInfo } = resvContext;
	const [ maxCount, setMaxCount ] = useState({
		maxFemale: availableCountFemale,
		maxMale: availableCountMale
	});

	const handleCount = async (positive: boolean, target: 'male' | 'female' | 'room') => {
		if (loading) return;
		setLoading(true);
		let sum = positive ? 1 : -1;
		if (!targetSelectInfo) throw Error('This must not happend by UI :: RoomType');

		const isFemaleCall = target === 'female';
		const { roomCount, female, male } = targetSelectInfo.count;

		if (target === 'room') targetSelectInfo.count.roomCount += sum;

		if (target !== 'room') {
			sharedQueryVariable.RoomTypeCapacityInput.initValue = {
				count: isFemaleCall ? female + sum : male + sum,
				gender: isFemaleCall ? Gender.FEMALE : Gender.MALE
			};
			const { data } = await refetchCapacity({
				...sharedQueryVariable
			});

			const queryData = queryDataFormater(data, 'GetRoomTypeById', 'roomType', undefined) || undefined;

			if (!queryData) return;

			if (target === 'female') targetSelectInfo.count.female += sum;
			if (target === 'male') targetSelectInfo.count.male += sum;

			const capcityData = getAvailableCountFromQuery(queryData);
			const { femaleCount, maleCount } = capcityData;

			if (isFemaleCall && targetSelectInfo.count.male > maleCount) {
				targetSelectInfo.count.male = 0;
			}

			if (!isFemaleCall && targetSelectInfo.count.female > femaleCount) {
				targetSelectInfo.count.female = 0;
			}

			if (targetSelectInfo.count.female < 0) {
				targetSelectInfo.count.female = 0;
			}

			if (targetSelectInfo.count.male < 0) {
				targetSelectInfo.count.male = 0;
			}

			setMaxCount({
				maxFemale: isFemaleCall ? maxCount.maxFemale : femaleCount,
				maxMale: isFemaleCall ? maleCount : maxCount.maxMale
			});
		}

		targetSelectInfo.price =
			fullDatePrice * (targetSelectInfo.count.male + targetSelectInfo.count.female + targetSelectInfo.count.roomCount);

		setRoomSelectInfo([ ...roomSelectInfo ]);

		setLoading(false);
	};

	const { count } = targetSelectInfo;
	const { male, female, roomCount } = count;

	return (
		<JDalign
			flex={{
				around: true,
				grow: true
			}}
			className="countSelecter"
			{...alignProp}
		>
			{isDomitory ? (
				<Fragment>
					<Counter
						maxCount={maxCount.maxMale}
						label={LANG('people')}
						handleCount={handleCount}
						target={'male'}
						count={male}
					/>
					{/* <Counter
            maxCount={maxCount.maxFemale}
            label={LANG("female")}
            handleCount={handleCount}
            target={"female"}
            count={female}
          /> */}
				</Fragment>
			) : (
				<Counter
					maxCount={availableCountRoom}
					label={LANG('room_count')}
					handleCount={handleCount}
					target={'room'}
					count={roomCount}
				/>
			)}
		</JDalign>
	);
};

export default CountSelecter;
