import { Box } from "@mui/material";
import React from "react";
import MainLoading from "components/mainLoading";
import { LoadingProps } from "interfaces/custom";

const Loading: React.FC<LoadingProps> = ({
  display = "flex",
  alignItems = "center",
  justifyContent = "center",
  height = "calc(100vh - 230px)",
  width = "100%",
  inline = true,
  isSmallLoading = false,
  style = {},
  ...rest
}) => (
  <Box
    display={display}
    alignItems={alignItems}
    justifyContent={justifyContent}
    height={height}
    width={width}
    {...rest}
  >
    <MainLoading inline={inline} isSmallLoading={isSmallLoading} />
  </Box>
);

export default Loading;
