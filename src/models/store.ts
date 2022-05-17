import { INameAndID } from './data';

export interface IOrderFilters {
  city: string | null;
  rate: string | null;
  status: string | null;
}

export interface ICarFilters {
  category: string | null;
}

export interface ICarAllFilters {
  category: INameAndID[] | [];
}

export interface IOrderAllFilters {
  rate: INameAndID[] | [];
  status: INameAndID[] | [];
  city: INameAndID[] | [];
}

export type TOrderTempFilterList = Partial<IOrderFilters>;
export type TCarTempFilterList = Partial<ICarFilters>;
