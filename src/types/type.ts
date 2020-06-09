import { getHouseForPublic_GetHouseForPublic_house_houseConfig_options } from "./api";
export interface IHouseOptions extends getHouseForPublic_GetHouseForPublic_house_houseConfig_options { }
export type Tstep = "select" | "input" | "check";

export type TOptionsObj = {
    ResvCautionMsg?: string
    ResvCompeleteMsg?: string
    PayPrecaution?: string
    CheckMsg?: string
}