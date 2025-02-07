import { Box } from "@mui/material";
import React from "react";
import { CircleBox, LoadingBox } from "./index.style";
import { MainLoadingProps } from "interfaces/custom";
import loading from "../../assets/gifs/loading.gif";

const MainLoading: React.FC<MainLoadingProps> = ({
  inline = true,
  isSmallLoading = false,
  className = "",
}) => {
  return (
    <Box
      sx={{ marginTop: !inline ? "20vh" : "0px" }}
      height="auto"
      width="100%"
    >
      <LoadingBox>
        {isSmallLoading ? (
          <CircleBox className={className} data-testid="small-loading" />
        ) : (
          <img src={loading} alt="loading" />
        )}
      </LoadingBox>
    </Box>
  );
};

export default MainLoading;
