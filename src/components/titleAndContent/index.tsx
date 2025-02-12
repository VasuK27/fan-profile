import { Box, Typography } from "@mui/material";
import { TitleAndContentProps } from "interfaces/custom";
import { FC } from "react";
import { ContentText } from "./index.style";

const TitleAndContent: FC<TitleAndContentProps> = ({ title, content }) => (
  <Box>
    <Typography fontSize="14px" fontWeight={500} color="var(--lightGray)">
      {title}
    </Typography>
    <ContentText>{content}</ContentText>
  </Box>
);
export default TitleAndContent;
