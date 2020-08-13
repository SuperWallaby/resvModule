import { LANG } from "../App";
import { isEmpty, arraySum, toast } from "@janda-com/front";
import { IRoomSelectInfo } from "../pages/declare";

export const validation = (
  roomSelectInfo: IRoomSelectInfo[],
  from: any,
  to: any
): boolean => {
  if (!to || !from) {
    toast.warn(LANG("date_un_selected"));
    return false;
  }
  if (isEmpty(roomSelectInfo)) {
    toast.warn(LANG("no_room_select"));
    return false;
  }

  let countCan = true;

  roomSelectInfo.forEach((rsi: any) => {
    const countSum = rsi.count.female + rsi.count.male + rsi.count.roomCount;
    if (!countSum) countCan = false;
  });

  if (!countCan) {
    toast.warn(LANG("there_is_no_select_person"));
    return false;
  }
  return true;
};
