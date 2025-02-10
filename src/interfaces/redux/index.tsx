export interface DriverData {
  driverId: string;
  givenName: string;
  familyName: string;
  nationality: string;
  permanentNumber: string;
  code: string;
  dateOfBirth: string;
  url: string;
}
export interface DriverTable {
  Drivers: DriverData[];
}

export interface MRData {
  DriverTable: DriverTable;
}

export interface DriverListResponse {
  MRData: MRData;
}
export interface DriverState {
  isLoading: boolean;
  data: DriverListResponse | null;
  isError: boolean;
}

export interface DriverStanding {
  Driver: {
    driverId: string;
  };
}

export interface DriverDetailsState {
  driverDetails: DriverData | null;
  standings: DriverStanding | null;
  loading: boolean;
  error: string;
}
