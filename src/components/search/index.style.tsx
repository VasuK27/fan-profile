import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

export const SearchIconStyled = styled(SearchIcon)(() => ({
  color: "var(--lightGray)",
  height: "24px",
  width: "24px",
}));

export const SearchIconWrapper = styled("div")(() => ({
  padding: "0px 16px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const SearchStyledInputBase = styled(InputBase)(() => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: "8px 8px 8px 0px",
    paddingLeft: `calc(1em + 4px)`,
    width: "300px",
  },
}));

export const Search = styled("div")(() => ({
  position: "relative",
  borderRadius: "10px",
  border: `1px solid var(--borderGray)`,
  marginRight: 2,
  marginLeft: 0,
  maxWidth: "375px",
  ".MuiInputBase-root .MuiInputBase-input": {
    paddingLeft: "45px",
    color: "var(--black)",
    "::placeholder": {
      color: "var(--lightGray)",
      opacity: 1,
    },
  },
}));
