import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Grid2, IconButton, Typography } from "@mui/material";
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
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
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
  WikipediaButton,
  WikipediaLink,
} from "./index.style";
import debounce from "debounce";
import ConditionalContent from "components/conditionalContent";

const Driver: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredDrivers, setFilteredDrivers] = useState<DriverData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState(false);
  const driversPerPage = 8;
  const dispatch = useDispatch<AppDispatch>();

  // Fetching driver and standings details from Redux store
  const { data, isLoading } = useSelector(
    (state: RootState) => state.driverList
  );
  const driversData = data?.MRData?.DriverTable?.Drivers ?? [];

  // Function to filter drivers based on search term
  const debouncedFilter = useCallback(
    debounce((searchValue) => {
      const filtered = driversData.filter((driver: DriverData) =>
        `${driver.givenName} ${driver.familyName} ${driver.nationality}`
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredDrivers(filtered);
      setPage(1);
    }, 500),
    [driversData]
  );

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFilter(value);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredDrivers.length / driversPerPage);
  const displayedDrivers = filteredDrivers.slice(
    (page - 1) * driversPerPage,
    page * driversPerPage
  );

  // Fetch driver list on component mount
  useEffect(() => {
    dispatch(fetchDriverList());
  }, [dispatch]);

  // Update filtered drivers initially or when driversData updates
  useEffect(() => {
    setFilteredDrivers(driversData);
  }, [driversData]);

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
    const {
      familyName,
      driverId,
      permanentNumber,
      code,
      givenName,
      nationality,
      url,
    } = driver;

    const driverDetails = [
      { label: FAMILY_NAME, value: familyName || "-" },
      { label: ID, value: driverId || "-" },
      { label: NUMBER, value: permanentNumber || "-" },
      { label: CODE, value: code || "-" },
    ];

    return (
      <Grid2 size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={driverId}>
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
                  {givenName}
                </Typography>
                <Box ml={1} display="flex" alignItems="center">
                  <ChipText label={nationality} />
                </Box>
              </Box>
              <StyledMenuIconButton
                color="inherit"
                aria-label="toggle drawer"
                edge="start"
                data-testid="view-icon"
                onClick={() => handleViewDetails(driver)}
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
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WikipediaButton />
              </IconButton>
              <Typography fontSize="14px" color="var(--lightGray)">
                <WikipediaLink
                  data-testid="wikipedia_link"
                  href={url}
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

  return (
    <Box p={{ xs: 0, xl: 3 }}>
      <Box mb={{ xs: 2, sm: 2 }} mx={1} mt={{ xs: 5, sm: 4 }}>
        <Typography
          mb={2}
          fontWeight={600}
          fontSize={{ xs: "18px", sm: "20px" }}
        >
          {DRIVERS}
        </Typography>

        <Search
          placeholder={SEARCH_BY_NAME}
          searchValue={searchTerm}
          handleSearchOnChange={handleSearchChange}
        />
      </Box>

      {/* Rendering filtered drivers or loading state */}
      <Box height="65vh" sx={{ overflowY: "scroll" }} px={1}>
        <Grid2 container spacing={3} mt={1} mb={1}>
          <ConditionalContent
            isLoading={isLoading}
            data={displayedDrivers}
            noDataMessage={NO_DRIVER_FOUND}
            renderItem={(driver) => renderDriverDetails(driver)}
          />
        </Grid2>
      </Box>

      {/* Pagination for displaying driver pages */}
      {displayedDrivers.length !== 0 && !isLoading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <StyledPagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      )}

      {/* Modal to display driver details */}
      <Modal open={open} handleClose={() => setOpen(false)} label={SUMMARY}>
        <DriverDetails />
      </Modal>
    </Box>
  );
};

export default Driver;
