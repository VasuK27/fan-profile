import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Grid2, IconButton, Typography } from "@mui/material";
import MainLoading from "components/mainLoading";
import Modal from "components/modal";
import Search from "components/search";
import { SEARCH_BY_NAME } from "constant/Placeholder";
import {
  CODE,
  DRIVERS,
  FAMILY_NAME,
  ID,
  NO_DRIVER_FOUND,
  NUMBER,
  SUMMARY,
  WIKIPEDIA_PROFILE,
} from "constant/TitleText";
import { DriverData } from "interfaces/redux";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { fetchDriverList } from "../../redux/slice/driver";
import {
  fetchDriverStandings,
  setDriverDetails,
} from "../../redux/slice/driverDetails";
import DriverDetails from "./driverDetails";
import {
  ChipText,
  StyledMenuIconButton,
  StyledPagination,
  TextAndLoading,
  WikipediaButton,
  WikipediaLink,
} from "./index.style";

const Driver: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const driversPerPage = 8;
  const dispatch = useDispatch<AppDispatch>();

  // Fetching driver and standings details and loading from the Redux store
  const { data, isLoading } = useSelector(
    (state: RootState) => state.driverList
  );
  const state = useSelector((state: RootState) => state);
  const driversData = data?.MRData?.DriverTable?.Drivers ?? [];

  // Filtering drivers based on the search term
  const filteredDrivers = driversData.filter((driver: DriverData) =>
    `${driver.givenName} ${driver.familyName} ${driver.nationality}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredDrivers.length / driversPerPage);
  const displayedDrivers = filteredDrivers.slice(
    (page - 1) * driversPerPage,
    page * driversPerPage
  );

  // Fetching driver list on component mount
  useEffect(() => {
    dispatch(fetchDriverList());
  }, [dispatch]);

  // Function to handle opening the details modal for a selected driver
  const handleViewDetails = useCallback(
    (driver: DriverData) => {
      dispatch(setDriverDetails(driver));
      dispatch(fetchDriverStandings(driver.driverId));
      setOpen(true);
    },
    [dispatch]
  );

  // Rendering driver details inside a card
  const renderDriverDetails = (driver: DriverData) => {
    const driverDetails = [
      { label: FAMILY_NAME, value: driver?.familyName || "-" },
      { label: ID, value: driver?.driverId || "-" },
      { label: NUMBER, value: driver?.permanentNumber || "-" },
      { label: CODE, value: driver?.code || "-" },
    ];

    return (
      <Grid2 size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={driver.driverId}>
        <Box boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)" borderRadius="20px">
          <Box padding="15px 16px 6px 16px">
            {/* Displaying driver's name and nationality */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  fontSize="18px"
                  color="var(--lightBlack)"
                >
                  {driver.givenName}
                </Typography>
                <Box ml={1} display="flex" alignItems="center">
                  <ChipText label={driver.nationality} />
                </Box>
              </Box>
              <StyledMenuIconButton
                color="inherit"
                aria-label="toggle drawer"
                onClick={() => handleViewDetails(driver)}
                edge="start"
              >
                <VisibilityOutlinedIcon fontSize="small" />
              </StyledMenuIconButton>
            </Box>
            {/* Displaying other driver details */}
            <Box mt={2}>
              {driverDetails.map((detail, index) => (
                <Grid2 container key={index} alignItems="center">
                  <Grid2 size={5}>
                    <Typography
                      fontSize="14px"
                      color="var(--lightGray)"
                      fontWeight={500}
                    >
                      {detail.label}
                    </Typography>
                  </Grid2>
                  <Grid2 size={3} mt={1}>
                    <Typography
                      ml={1}
                      fontSize="16px"
                      fontWeight={500}
                      color="var(--lightBlack)"
                    >
                      :&nbsp;&nbsp;{detail.value}
                    </Typography>
                  </Grid2>
                </Grid2>
              ))}
            </Box>

            {/* Wikipedia button linking to the driver's profile */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderTop="1px solid var(--borderGray)"
              mt={3}
            >
              <IconButton
                component="a"
                href={driver.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WikipediaButton />
              </IconButton>
              <Typography fontSize="14px" color="var(--lightGray)">
                <WikipediaLink
                  data-testId="WikipediaLink"
                  href={driver.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {WIKIPEDIA_PROFILE}
                </WikipediaLink>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid2>
    );
  };

  // Conditionally rendering content based on loading state or available data
  const renderContent = () => {
    if (isLoading) {
      return (
        <TextAndLoading>
          <MainLoading />
        </TextAndLoading>
      );
    }
    if (displayedDrivers.length === 0 && !isLoading) {
      return <TextAndLoading>{NO_DRIVER_FOUND}</TextAndLoading>;
    }
    return displayedDrivers.map(renderDriverDetails);
  };

  return (
    <Box p={3}>
      <Typography mb={2} fontWeight={600} fontSize="20px">
        {DRIVERS}
      </Typography>

      <Search
        placeholder={SEARCH_BY_NAME}
        searchValue={searchTerm}
        handleSearchOnChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Rendering filtered drivers or loading state */}
      <Grid2 container spacing={3} mt={3}>
        {renderContent()}
      </Grid2>

      {/* Pagination for displaying driver pages */}
      {totalPages > 1 && !isLoading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <StyledPagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      )}

      {/* Modal to display driver details */}
      <Modal
        open={open}
        handleClose={() => setOpen(false)}
        label={SUMMARY}
        buttonText="Close"
      >
        <DriverDetails />
      </Modal>
    </Box>
  );
};

export default Driver;
