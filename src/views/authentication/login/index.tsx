import { Box, Grid2, Typography } from "@mui/material";
import login from "assets/images/login.png";
import Button from "components/button";
import Input from "components/input";
import { SUBMIT } from "constant/ButtonLabel";
import { userDetailsInitialValues } from "constant/InitialValues";
import { EMAIL, USER_NAME } from "constant/InputLabel";
import { ENTER_EMAIL, ENTER_USER_NAME } from "constant/Placeholder";
import { driverRoute } from "constant/RoutesEndPoint";
import { TITLE_SUB_TEXT, USER_DETAILS } from "constant/TitleText";
import { userDetailsValidation } from "constant/ValidationSchema";
import { Form, Formik } from "formik";
import { UserDetailsProps } from "interfaces/global";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { setCurrentUser } from "utils/SetCurrentUser";
import { ContainerBox, LoginImage, LoginImageBox } from "./index.style";

const Login = () => {
  const navigate = useNavigate();

  // Save user details and navigate to the driver route
  const handleSubmit = (
    values: UserDetailsProps,
    navigate: NavigateFunction
  ) => {
    setCurrentUser(values);
    navigate(driverRoute.DRIVER);
  };

  return (
    <ContainerBox>
      <Box
        borderRadius="15px"
        width={{ xs: "90%", sm: "60%", md: "80%", xl: "50%" }}
        padding={{ xs: "15px 0px 20px 0px", md: "30px" }}
        boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
      >
        <Formik
          initialValues={userDetailsInitialValues}
          validationSchema={userDetailsValidation}
          onSubmit={(values) => handleSubmit(values, navigate)}
        >
          {() => (
            <Form>
              <Grid2 container columnSpacing={4}>
                <Grid2
                  size={{ xs: 12, md: 6 }}
                  display="flex"
                  justifyContent="center"
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    width="80%"
                    height="100%"
                  >
                    <Typography
                      fontSize={{ xs: "20px", sm: "25px" }}
                      fontWeight={600}
                      color="var(--lightBlack)"
                    >
                      {USER_DETAILS}
                    </Typography>
                    <Typography
                      mb={2}
                      fontSize={{ xs: "14px", sm: "16px" }}
                      color="var(--lightBlack)"
                    >
                      {TITLE_SUB_TEXT}
                    </Typography>
                    <Input
                      name="username"
                      label={USER_NAME}
                      placeholder={ENTER_USER_NAME}
                      required
                    />
                    <Box my={2}>
                      <Input
                        name="email"
                        label={EMAIL}
                        placeholder={ENTER_EMAIL}
                        required
                      />
                    </Box>
                    <Button type="submit" label={SUBMIT} fullWidth />
                  </Box>
                </Grid2>
                <Grid2 size={6} height="100%">
                  <LoginImageBox>
                    <Box display="flex" justifyContent="center">
                      <LoginImage src={login} />
                    </Box>
                  </LoginImageBox>
                </Grid2>
              </Grid2>
            </Form>
          )}
        </Formik>
      </Box>
    </ContainerBox>
  );
};

export default Login;
