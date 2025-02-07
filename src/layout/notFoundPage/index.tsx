import Button from "components/button";
import { useNavigate } from "react-router-dom";
import { BACK_TO_LOGIN, NOT_FOUND, NOT_FOUND_TEXT } from "constant/TitleText";
import { Typography } from "@mui/material";
import { ErrorText, StyledBox } from "layout/unauthorized/index.style";
import { getCurrentUser } from "utils/GetCurrentUser";
import { driverRoute, loginRoute } from "constant/RoutesEndPoint";
import { BACK } from "constant/ButtonLabel";

const NotFoundPage = () => {
  const token = getCurrentUser()?.token;
  const navigate = useNavigate();

  const handleClick = () => {
    if (token) {
      navigate(driverRoute.DRIVER);
    } else {
      navigate(loginRoute.LOGIN_ROUTE);
    }
  };
  return (
    <StyledBox>
      <ErrorText variant="h1">{NOT_FOUND}</ErrorText>
      <Typography variant="h6" margin="2rem 0">
        {NOT_FOUND_TEXT}
      </Typography>
      <Button label={token ? BACK : BACK_TO_LOGIN} onClick={handleClick} />
    </StyledBox>
  );
};

export default NotFoundPage;
