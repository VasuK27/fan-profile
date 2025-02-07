import { ButtonProps } from "@mui/material";
import { ChangeEvent, CSSProperties } from "react";

export interface ErrorMessageProps {
  name: string;
}

export interface ReusableInputProps {
  label?: string;
  helperText?: string;
  name?: string;
  placeholder: string;
  type: string;
}

export interface CustomButtonProps extends ButtonProps {
  variant?: "contained" | "outlined";
  label?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
}

export interface LoadingProps {
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  width?: string;
  inline?: boolean;
  isSmallLoading?: boolean;
  style?: CSSProperties;
}

export interface MainLoadingProps {
  inline?: boolean;
  isSmallLoading?: boolean;
  className?: string;
}

export interface SearchProps {
  searchValue?: string;
  handleSearchOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  headerSearch?: boolean;
  placeholder?: string;
}

export interface ReusableModalProps {
  open: boolean;
  handleClose: () => void;
  label?: string;
  children: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  isGrayBlock?: boolean;
  icon?: boolean;
}

export interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}
