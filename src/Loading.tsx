import { Box, Stack, CircularProgress } from '@mui/material';
const teddy =
  'https://www.pngfind.com/pngs/m/510-5105229_cute-brown-teddy-bear-hd-png-download.png';

export function MapLoading(props: MapLoadingProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'grey.400',
        margin: '1px',
        width: '100%',
        height: '420px',
        // zIndex: 0,
        borderRadius: '5px',
        boxShadow: '0px 0px 0px 1px rgb(203 203 203)',
      }}
    >
      <Stack alignItems="center" spacing={4} sx={{ paddingTop: '115px', paddingLeft: '20px' }}>
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            gridTemplateAreas: 'inner-div',
          }}
        >
          <div
            style={{
              alignItems: 'center',
              margin: '0px',
              padding: '0px',
              borderRadius: '100px',
              gridArea: 'inner-div',
            }}
          >
            <CircularProgress
              size={160}
              thickness={0.2}
              sx={{
                margin: '0px',
                padding: '0px',
                borderRadius: '100px',
                backgroundColor: 'grey.400',
                // opacity: 1
              }}
            />
          </div>

          <div
            style={{
              gridArea: 'inner-div',
              paddingBottom: '35px',
              opacity: 0.9,
            }}
          >
            <img src={teddy} alt="teddy" />
          </div>
          <div
            style={{
              gridArea: 'inner-div',
              paddingTop: '70px',
              opacity: 0.9,
              fontSize: '10px',
              // fontWeight: "bold",
              // color: "red"
            }}
          >
            {'  '}
            {props.loadingMsg}...
          </div>
        </div>
      </Stack>
    </Box>
  );
}

export interface MapLoadingProps {
  loadingMsg?: String;
}
