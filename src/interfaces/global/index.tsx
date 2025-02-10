import { configureStore } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export interface GetResponseParams {
  apiEndPoint: string;
  queryString?: string;
  navigate?: any;
  isToken?: boolean;
}

export interface SidebarProps {
  open: boolean;
}

export interface Constructor {
  name: string;
  nationality: string;
  constructorId: string;
  url: string;
}

export interface DetailRowProps {
  title: string;
  content: string | ReactNode;
}

export interface DriverStanding {
  position: string;
  points: string;
  wins: string;
  Constructors: Constructor[];
}

export interface AllTheProvidersProps {
  children: ReactNode;
  customStore?: ReturnType<typeof configureStore>;
}

export interface SidebarDrawerProps {
  isMenuOpen: boolean;
}

export interface DividerProps {
  isMenuOpen: boolean;
}

export interface UserDetailsProps {
  username: string;
  email: string;
}
