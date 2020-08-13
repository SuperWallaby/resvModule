import React, { useState, useEffect, useLayoutEffect } from 'react';
import { JDbutton, JDtypho, JDalign, isEmpty, arraySum, autoComma, dateRangeFormat, toast, JDicon, useSelect, useModal, JDmodal } from '@janda-com/front';
import { LANG } from '../App';
import { IResvContext } from '../pages/declare';
import { PricingType } from '../types/enum';
import { validation } from './helper';
import moment from "moment";
import { CalculateViewerModal } from './DetailPriceView';
import { priceSurvey } from '../utils/priceSurvey';
import isMobile from "is-mobile";
import { stickyHeightChanger } from '../pages/helper';

interface IProps {
	resvContext: IResvContext;
}

const checkNeedAbsoluteFloat = () => navigator.platform == 'iPhone' ||  navigator.platform == 'Linux armv6l'

const SelectViewer: React.FC<IProps> = ({ resvContext }) => {
	const detailPriceModal = useModal();
	const [isOpen,setOpen] = useState(true);

	const { roomSelectInfo, from, to, totalPrice, handleStepChange, totalOptionPrice,payInfo, sideShoudStatic } = resvContext;

	const sharedBtnProp: any = {
		onClick: () => {
			handleStepChange();
		},
		mb: 'no',
		size: 'longLarge',
		thema: 'primary'
	};


	const sharedSelectViewrProp = {
		id: "SelectViewer",
		className: `selectViewer ${sideShoudStatic && "selectViewer--static"} ${isOpen || "selectViewer--close"}`,
	}

	const Header = () => isMobile() ?  <JDalign flex={{
		between:true,
		vCenter:true
	}} onClick={()=>{
		if(!isMobile()) return;
		setOpen(!isOpen);
	}} className="selectViewer__head">
		<JDtypho mb="no" weight={600}>
			{LANG("check_select")}
		</JDtypho>
		<JDicon icon={isOpen ? "arrowDown" : "arrowUp"}/>
  </JDalign> : null


	useLayoutEffect(()=>{
		if(sideShoudStatic) return;
		stickyHeightChanger();
	},[isOpen])


	if (!to || !from) {
		return (
			<div  {...sharedSelectViewrProp}>
				<Header/>
				<div className="selectViewer__body">
				<JDtypho className="selectViewer__title" mb="no" size="h6">
					{LANG('date_un_selected')}
				</JDtypho>
				<div className="selectViewer__bottom">
					<JDbutton label={LANG('do_reservation')} mb="no" size="longLarge" thema="primary" />
				</div>
				</div>
			</div>
		);
	}

	const unSelected = isEmpty(roomSelectInfo);
	if (unSelected) {
		return (
			<div {...sharedSelectViewrProp}>
				<Header/>
				<div className="selectViewer__body">
				<JDtypho className="selectViewer__title" mb="no" size="h6">
					{LANG('un_selected')}
				</JDtypho>
				<div className="selectViewer__bottom">
					<JDbutton  label={LANG('do_reservation')} mb="no" size="longLarge" thema="primary" />
				</div>
				</div>
			</div>
		);
	}

	const priceLog = priceSurvey(roomSelectInfo);

	return (
		<div {...sharedSelectViewrProp}>
			<Header/>
			<div className="selectViewer__body">
			<div className="selectViewer__header">
				{roomSelectInfo.map((RI) => {
					const { pricingType, count, price } = RI;
					const isDomitory = pricingType === PricingType.DOMITORY;
					const { female, male, roomCount } = count;
					return (
						<div className="selectViewer__headerCell" key={RI.roomTypeId + 'view'}>
							<JDtypho mb="small" size="h6" weight={600}>
								{RI.roomTypeName}
							</JDtypho>
							<JDtypho weight={300}>
								{LANG('date')} : {moment(from).format("YYYY-MM-DD")}
							</JDtypho>
							<JDtypho mb="no" weight={300}>
								{LANG(isDomitory ? 'people' : 'room_count')} :{' '}
								{isDomitory ? 
									female ? LANG('female') + female + ' ' 
									: "" 
								+ LANG('male')  + male 
								: roomCount + LANG('count')}
							</JDtypho>
						</div>
					);
				})}
			</div>
			<div className="selectViewer__calculater">
				<div className="selectViewer__calculaterBody">
					<JDalign
						mb="small"
						flex={{
							between: true
						}}
					>
						<JDtypho>{LANG('select_product')}</JDtypho>
						<JDtypho weight={600}>{autoComma(totalPrice)} KRW</JDtypho>
					</JDalign>

					<JDalign
						mb="small"
						flex={{
							between: true
						}}
					>
						<JDtypho>{LANG('option')}</JDtypho>
						<JDtypho weight={600}>{totalOptionPrice} KRW</JDtypho>
					</JDalign>

					<JDalign
						mb="small"
						flex={{
							between: true
						}}
					>
						<JDtypho>{LANG('addition_tax')}</JDtypho>
						<JDtypho weight={600}>0 KRW</JDtypho>
					</JDalign>
				</div>
				<div className="selectViewer__calculaterTotal">
					<JDalign
						mb="small"
						flex={{
							between: true
						}}
					>
						<JDtypho size="h6" mb="no">{LANG('total_price')}</JDtypho>
						<JDtypho size="h6" mb="no" weight={600}>
							<JDalign flex={{
								center: true
							}}>
							<JDtypho mr="small">
								{autoComma(totalPrice)} KRW
							</JDtypho>
							<JDicon onClick={detailPriceModal.openModal} tooltip="가격 상세보기" color="primary" icon="help"/>
							</JDalign>
						</JDtypho>
					</JDalign>
				</div>
				<JDbutton {...sharedBtnProp} label={LANG('do_reservation')} />
			</div>
			</div>
			<CalculateViewerModal modalProp={{
				head: {
					title: "가격 자세히보기"
				}
			}} products={priceLog} modalHook={detailPriceModal} />
		</div>
	);
};

export default SelectViewer;
