import React from "react";
import { IUseModal, JDmodal, JDtypho } from "@janda-com/front";

interface Iprops {
  modalHook: IUseModal;
}


const companyName = "JANDA"
const AgreePolicyModal: React.FC<Iprops> = ({ modalHook }) => {
  return (
    <JDmodal {...modalHook}>

      <div className="sub-contens">
        <div className="info_text">
          <div>
            <p>
              <span className="company-name">{companyName}</span>는 고객의 개인정보를 매우 중요하게 생각하며, ‘개인정보보호법’을 준수하고 있습니다.
              <span className="company-name">{companyName}</span>은 개인정보처리방침을 통하여 고객께서 제공하신 개인정보가 어떠한 용도와 방식으로 이용되고 있고,
              개인정보 보호를 위하여 어떤 조치가 취해지고 있는지 알려드립니다.
            </p>
            <p>
              <strong>1. 개인정보의 수집범위 및 이용</strong><br />
              <span className="company-name">{companyName}</span>의 예약과 관련하여 본 동의서에 기재된 본인의 정보는 &lt;개인정보보호법&gt; 및
              &lt;정보통신망 이용촉진 및 정보보호 관한 법률&gt;의 규정에 따라 수집, 이용, 제공, 취급위탁을 위하여 본인의 동의를 얻어야 하는 정보입니다.
              이에
              <span className="company-name">{companyName}</span> 실시간 예약시스템 사용자는 다음의 내용을 확인하며, 귀하의 개인정보 수집 이용, 제공 및 취급위탁에 동의 합니다.
            </p>
            <table className="tb_st__01">
              <colgroup>
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>수집항목</th>
                  <th>수집목적</th>
                  <th>보유기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>성명(영문), 성명(한글)</td>
                  <td>이용자 식별 및 본인여부 확인</td>
                  <td>이용후 1년</td>
                </tr>
                <tr>
                  <td>국가</td>
                  <td>고객공지 및 원활한 의사소통 경로확보</td>
                  <td>이용후 1년</td>
                </tr>
                <tr>
                  <td>연락처(모바일 또는 자택)</td>
                  <td>
                    예약하신 숙박을 위한 연락<br />
                    민원 등 이용자의 편의를 위한 고충처리
                  </td>
                  <td>이용후 1년</td>
                </tr>
              </tbody>
            </table>
            <p className="mt30">
              <strong>2. 개인정보 수집에 대한 동의</strong><br />
              <span className="company-name">{companyName}</span>은 예약관련 진행시 귀하의 개인정보 수집에 대한 동의를 받고 있습니다.
              본 개인정보 제공에 동의하지 않으시는 경우, 동의를 거부할 수 있으며, 이 경우 상품예약이 제한될 수 있습니다.
            </p>
            <p>
              <strong>
                3. 개인정보 파기절차 및 방법
              </strong><br />
              <span className="company-name">{companyName}</span>의 개인적인 파기절차 및 파기방법은 다음과 같습니다.<br />
              가) 파기절차<br />
              법령에 특별한 규정이 있는 경우를 제외한 경우 보유기간 이후 지체없이 파기합니다.<br />
              나) 파기방법<br />
              (1) 종이(서면)에 작성•출력된 개인정보 : 분쇄기로 분쇄하거나 소각<br />
              (2) 전자적 파일 형태로 저장된 개인정보 : 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제
            </p>
            <p>
              <strong>4. 수탁사 및 수탁사 업무 내용</strong><br />
              수탁업체 : 잔다 ( www.stayjanda.com / 부산시 남구 전포대로133 WEWORK BIFC 12층)<br />
              위탁 업무 : 통합예약관리 서비스를 기반으로 수집되는 모든 개인정보를 위탁관리
            </p>
            <p>
              <strong>5. 목적 외 사용 및 제3자에 대한 제공 및 공유</strong><br />
              <span className="company-name">{companyName}</span>은 귀하의 개인정보를 이용하여 ‘개인정보의 수집 목적 및 이용목적’에서 고지한 범위 내에서 사용하며 범위를 벗어난
              제 3기관 및 제 3자에게 귀하의 개인정보를 제공하지 않습니다.
            </p>
            <p>
              <strong>6. 게시물</strong><br />
              (1) <span className="company-name">{companyName}</span>은 고객님의 게시물을 소중하게 생각하며 변조, 훼손, 삭제되지 않도록 최선을 다하여 보호합니다. 그러나 다음의 경우는 그렇지 아니합니다.<br />
              <span className="ml15 mb10 dp_inb">
                - 스팸(spam)성 게시물<br />
                - 타인을 비방할 목적으로 허위사실을 유포하여 타인의 명예를 훼손하는 글<br />
                - 동의 없는 타인의 신상공개, 저작권•제3자의 저작권 등 권리를 침해하는 내용, 기타 게시판 주제와 다른 내용의 게시물<br />
              </span>
              (2) 바람직한 게시판 문화를 활성하기 위하여 동의 없는 타인의 신상 공개시 특정부분을 삭제하거나 기호 등으로 수정하여 게시할 수 있습니다.
              다른 주제의 게시판으로 이동 가능한 내용일 경우 해당 게시물에 이동 경로를 밝혀 오해가 없도록 하고 있습니다. 그 외의 경우 명시적 또는
              개별적인 경고 후 삭제 조치할 수 있습니다.<br />
              (3) 근본적으로 게시물에 관련된 제반 권리와 책임은 작성자 개인에게 있습니다.<br />
              또 게시물을 통해 자발적으로 공개된 정보는 보호받기 어려우므로 정보 공개 전에 심사 숙고하시기 바랍니다
            </p>
            <p>
              <strong>7. 개인정보관리책임자 및 개인정보관리담당자</strong><br />
              가) <span className="company-name">{companyName}</span>은 이용자의 의견을 소중하게 생각하며, 이용자의 문의사항에 대해 항상 성실히 답변을 드릴 수 있도록 노력하겠습니다.<br />
              나) 개인정보 관리책임자 :
              <span className="pi-incharge">###</span>            [ <span className="pi-phonenumber">###-####-####</span> ]<br />
              다) 개인정보와 관련하여 도움을 받을 수 있는 외부기관은 다음과 같습니다.
            </p>
            <p>
              <strong>8. 개인정보관련 신고 및 분쟁조정</strong><br />
              개인정보침해에 대한 신고•상담이 필요하신 경우에는 한국정보보호진흥원(KISA) 내 개인정보침해신고센터 등 다음의 기관으로 문의하시기 바랍니다.
              또한 귀하가 개인정보침해를 통하여 금전적•정신적 피해를 입으신 경우에는 개인정보분쟁조정위원회에 피해구제를 신청하실 수 있습니다.
            </p>
            <p>
              <strong>9. 이용자 및 법정대리인의 권리와 그 행사방법</strong><br />
              이용자가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다.
              또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.
              회사는 이용자 혹은 법정대리인의 요청에 의해 해지 또는 삭제된 개인정보는 "회사가 수집하는 개인정보의 보유 및 이용기간"에 명시된
              바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
            </p>
            <p>
              <strong>10. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항</strong><br />
              이용자 개개인에게 개인화되고 맞춤화된 서비스를 제공하기 위해서 회사는 이용자의 정보를 저장하고 수시로 불러오는
              '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 사용자의 브라우저에게 보내는 조그마한 데이터 꾸러미로
              이용자 컴퓨터의 하드디스크에 저장됩니다.
              <br />
              1) 쿠키의 사용 목적<br />
              회원과 비회원의 접속 빈도나 방문 시간 등의 분석, 이용자의 취향과 관심분야의 파악 및
              자취 추적, 각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공
              <br />
              2) 쿠키 설정 거부 방법<br />
              이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 이용하신 웹브라우저에서 옵션을 설정함으로써
              모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
            </p>
            <p>
              <strong>- 개인정보침해신고센터</strong><br />
              TEL : 국번없이 118<br />
              URL : http://privacy.kisa.or.kr<br /><br />
              <strong>- 대검찰청 사이버 수사과</strong><br />
              TEL : 국번없이 1301<br />
              URL : www.spo.go.kr<br /><br />
              <strong>- 경찰청 사이버 안전국</strong><br />
              TEL : 국번없이 182<br />
              URL : cyberbureau.police.go.kr
            </p>
          </div>
        </div>  </div>
    </JDmodal>
  );
};

export default AgreePolicyModal;
