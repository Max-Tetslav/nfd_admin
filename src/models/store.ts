export interface IOrderFilters {
  city: string | null;
  rate: string | null;
  status: string | null;
}

export interface ICarFilters {
  category: string | null;
}

export type TOrderTempFilterList = Partial<IOrderFilters>;
export type TCarTempFilterList = Partial<ICarFilters>;
