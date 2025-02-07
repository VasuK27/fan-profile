export interface DriverState {
  isLoading: boolean;
  data: any | null;
  isError: boolean;
}

export interface DriverStanding {
  Driver: {
    driverId: string;
  };
}

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

export interface DriverDetailsState {
  driverDetails: DriverData | null;
  standings: DriverStanding | null;
  loading: boolean;
  error: string;
}
