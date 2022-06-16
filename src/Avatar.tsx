import { useState } from "react";
import { Box, Skeleton, styled } from "@mui/material";

const Image = styled("img")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius
}));

const pictureSizes = {
  medium: "200px",
  small: "120px",
  "extra-small": "60px",
  "extreme-small": "35px",
  "full-width": "100%"
};

export function Avatar(props: AvatarProps) {
  console.log({ props });
  const [isLoading, setLoading] = useState(true);
  const width = pictureSizes[props.size ?? "medium"];
  const [flag] = useState<string>(
    `https://flagcdn.com/48x36/${props.countryCode}.png`
  );
  const swapErroredImg = (e: any) => {
    e.target.src = props.pictureStyle === "bright" ? flag : flag;
    setLoading(false);
  };

  return (
    <Box position="relative" sx={{ width: width, paddingBottom: width }}>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          sx={{ position: "absolute", width: width, height: "100%" }}
        />
      )}
      <Image
        src={
          props.src ? props.src : props.pictureStyle === "bright" ? flag : flag
        }
        width={width}
        height={width}
        onLoad={() => setLoading(false)}
        onError={swapErroredImg}
        sx={{ position: "absolute", objectFit: "contain" }}
      />
    </Box>
  );
}

export interface AvatarProps {
  src: string;
  size?: keyof typeof pictureSizes;
  pictureStyle: string;
  countryCode: string;
}
