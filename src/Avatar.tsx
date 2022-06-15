import { useState } from "react";
import { Box, Skeleton, styled } from "@mui/material";

const personAvatarSilver =
  "https://p1.hiclipart.com/preview/565/751/756/man-avatar-male-silhouette-user-profile-gentleman-suit-head-png-clipart.jpg";
const personAvatarBright =
  "https://p1.hiclipart.com/preview/565/751/756/man-avatar-male-silhouette-user-profile-gentleman-suit-head-png-clipart.jpg";

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
  const [isLoading, setLoading] = useState(true);
  const width = pictureSizes[props.size ?? "medium"];

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
}
