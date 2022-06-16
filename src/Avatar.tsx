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
  const countryCode = props.countryCode;
  const countryFlag = `https://flagcdn.com/48x36/${countryCode}.png`;
  const personAvatarSilver = countryFlag;
  const personAvatarBright = countryFlag;

  const swapErroredImg = (e: any) => {
    e.target.src =
      props.pictureStyle === "bright" ? personAvatarBright : personAvatarSilver;
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
          props.src
            ? props.src
            : props.pictureStyle === "bright"
            ? personAvatarBright
            : personAvatarSilver
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
