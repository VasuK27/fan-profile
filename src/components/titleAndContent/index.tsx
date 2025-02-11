import { Box, Typography } from "@mui/material";
import { TitleAndContentProps } from "interfaces/custom";
import { FC } from "react";

const TitleAndContent: FC<TitleAndContentProps> = ({ title, content }) => (
  <Box mb={2}>
    <Typography fontSize="14px" fontWeight={500} color="var(--lightGray)">
      {title}
    </Typography>
    <Typography fontSize="16px" color="var(--textGray)" fontWeight={600}>
      {content}
    </Typography>
  </Box>
);
export default TitleAndContent;
