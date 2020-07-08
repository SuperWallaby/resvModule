import 'core-js';
import { Tracker } from 'react-ga';
export declare type TRoute = 'book' | 'search';
export interface RESV_INIT_OPTION {
    lang?: 'kr' | 'en';
    route?: TRoute;
    ga_track?: Tracker[];
}
