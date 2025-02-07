import Button from "components/button";
import { ErrorText, StyledBox } from "./index.style";
import { Typography } from "@mui/material";
import {
  BACK_TO_LOGIN,
  UNAUTHORIZED,
  UNAUTHORIZED_TEXT,
} from "constant/TitleText";
import { useNavigate } from "react-router-dom";
import { loginRoute } from "constant/RoutesEndPoint";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <StyledBox>
      <ErrorText variant="h1">{UNAUTHORIZED}</ErrorText>
      <Typography variant="h6" margin="2rem 0">
        {UNAUTHORIZED_TEXT}
      </Typography>
      <Button
        label={BACK_TO_LOGIN}
        onClick={() => navigate(loginRoute.LOGIN_ROUTE)}
      />
    </StyledBox>
  );
};

export default Unauthorized;
