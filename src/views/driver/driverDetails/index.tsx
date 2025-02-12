import { Box, Grid2, Typography } from "@mui/material";
import MainLoading from "components/mainLoading";
import { EMAIL } from "constant/InputLabel";
import {
  CODE_TEXT,
  CONSTRUCTORS_DETAILS,
  CONSTRUCTOR_ID,
  DOB,
  DRIVER_DETAILS,
  DRIVER_ID,
  FAMILY_NAME,
  GIVEN_NAME,
  MORE_INFO,
  NAME,
  NATIONALITY,
  POINTS,
  USER_DETAILS,
} from "constant/TitleText";
import { Constructor, DriverStanding } from "interfaces/global";
import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "utils/GetCurrentUser";
import { RootState } from "redux/store";
import { TitleText } from "./index.style";
import TitleAndContent from "components/titleAndContent";
import { WikipediaButton } from "../index.style";

// Defining user details using current user information
const userDetails = [
  { title: NAME, content: getCurrentUser()?.username },
  { title: EMAIL, content: getCurrentUser()?.email },
];

const DriverDetails: FC = () => {
  // Fetching driver and standings details and loading from the Redux store
  const driverDetails = useSelector(
    (state: RootState) => state?.driverDetails?.driverDetails
  );
  const standingsDetails: DriverStanding | null = useSelector(
    (state: RootState) =>
      state?.driverDetails?.standings as DriverStanding | null
  );
  const loading = useSelector((state: RootState) => state.driverList.isLoading);

  // Function to render each detail row based on an array of details
  const renderDetails = (details: { title: string; content: ReactNode }[]) =>
    details.map((item, index) => (
      <Grid2 size={{ xs: 6, sm: 4, lg: 3 }} key={index}>
        <TitleAndContent title={item.title} content={item.content} />
      </Grid2>
    ));

  return (
    <Box>
      {loading ? (
        <MainLoading />
      ) : (
        <>
          <Typography
            fontSize="20px"
            fontWeight={700}
            color="var(--orange)"
            margin={{ xs: "0px 10px 10px 10px", md: "0px 16px 16px 16px" }}
          >
            {DRIVER_DETAILS}
          </Typography>

          {/* Displaying Driver Details */}
          <Grid2
            container
            mx={{ xs: 1, sm: 2 }}
            spacing={4}
            padding="16px"
            borderRadius="8px"
            boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
          >
            {renderDetails([
              { title: GIVEN_NAME, content: driverDetails?.givenName || "-" },
              {
                title: FAMILY_NAME,
                content: driverDetails?.familyName || "-",
              },
              { title: DOB, content: driverDetails?.dateOfBirth || "-" },
              {
                title: NATIONALITY,
                content: driverDetails?.nationality || "-",
              },
              { title: CODE_TEXT, content: driverDetails?.code || "-" },
              { title: DRIVER_ID, content: driverDetails?.driverId || "-" },
              { title: POINTS, content: standingsDetails?.points || "-" },
            ])}
          </Grid2>

          <TitleText>{CONSTRUCTORS_DETAILS}</TitleText>

          {/* Displaying constructor details */}
          {standingsDetails?.Constructors?.map(
            (constructor: Constructor, index: number) => (
              <Box
                key={index}
                borderRadius="8px"
                boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
                padding="16px"
                mb={index !== standingsDetails.Constructors.length - 1 ? 1 : 0}
                mx={{ xs: 1, sm: 2 }}
              >
                <Grid2 container spacing={4}>
                  {renderDetails([
                    { title: NAME, content: constructor.name },
                    { title: NATIONALITY, content: constructor.nationality },
                    {
                      title: CONSTRUCTOR_ID,
                      content: constructor.constructorId,
                    },
                    {
                      title: MORE_INFO,
                      content: (
                        <a
                          href={constructor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <WikipediaButton />
                        </a>
                      ),
                    },
                  ])}
                </Grid2>
              </Box>
            )
          )}

          <TitleText>{USER_DETAILS}</TitleText>

          {/* Displaying user details */}
          <Grid2
            mb={1}
            mx={{ xs: 1, sm: 2 }}
            container
            spacing={4}
            padding="16px"
            borderRadius="8px"
            boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
          >
            {renderDetails(userDetails)}
          </Grid2>
        </>
      )}
    </Box>
  );
};

export default DriverDetails;
