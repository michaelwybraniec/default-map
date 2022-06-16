import { ReactNode, useEffect, useState, useCallback, useMemo } from "react";

import { HeatMapLoading } from "./Loading";
import { Pointer } from "./Pointer";
import { Pointer2 } from "./Pointer2";

import { useEventHandlers } from "@react-leaflet/core";
import { IconButton, Tooltip, Container, Box } from "@mui/material";
import {
  ZoomInMap as ZoomInMapIcon,
  Circle as CircleIcon,
  AccountBox as AccountBoxIcon,
  Flag as FlagIcon
} from "@mui/icons-material";
import {
  FeatureGroup,
  MapContainer,
  TileLayer,
  LayersControl,
  ZoomControl,
  useMap,
  useMapEvent,
  Rectangle,
  Marker,
  Popup
} from "react-leaflet";
import { styled } from "@mui/material/styles";
import { ButtonProps } from "@mui/material/Button";

export function DefaultMap(props: HeatMapProps) {
  const [mapUrl, setMapUrl] = useState<string | undefined>();
  const [center] = useState<number[]>([45, 3]);
  const [zoom] = useState<number>(2);
  const [currnetZoom, setCurrentZoom] = useState<number>(0);
  const [pointerStyle, setPointerStyle] = useState<string>("circle");

  useEffect(() => {
    const loadMapUrl = async () => {
      setMapUrl("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    };
    let unmounted = false;
    setTimeout(() => {
      if (!unmounted) loadMapUrl().catch(console.error);
    }, 1);
    return () => {
      unmounted = true;
    };
  }, []);

  if (!mapUrl) return <HeatMapLoading />;

  const MinimapBounds = ({ parentMap, zoom }: any) => {
    const miniMap = useMap();
    const onClick = useCallback(
      (e) => parentMap.setView(e.latlng, parentMap.getZoom()),
      [parentMap]
    );
    useMapEvent("click", onClick);
    const [bounds, setBounds] = useState(parentMap.getBounds());
    const onChange = useCallback(() => {
      setBounds(parentMap.getBounds());
      miniMap.setView(parentMap.getCenter(), zoom);
    }, [miniMap, parentMap, zoom]);
    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [
      onChange
    ]);
    useEventHandlers({ instance: parentMap } as any, handlers);
    return <Rectangle bounds={bounds} />;
  };

  // const getStatsByPersonId = (personId: string) => {
  //   return props.layers.byAddress?.find((m: any) => m.id === personId);
  // };

  const CustomControl = ({ zoom }: any) => {
    const parentMap = useMap();
    const mapZoom = zoom || 0;

    const miniMap = useMemo(
      () => (
        <MapContainer
          style={{
            height: 72.59,
            width: 172.27,
            borderRadius: "5px",
            boxShadow: "0px 0px 0px 1px rgb(203 203 203)"
          }}
          center={parentMap.getCenter()}
          zoom={mapZoom}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          zoomControl={false}
        >
          <TileLayer url={mapUrl as string} />
          <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
        </MapContainer>
      ),
      [mapZoom, parentMap]
    );

    const resetMapToDefault = () => {
      parentMap.setView([45, 3]);
      parentMap.setZoom(2);
    };

    const ButtonForCircle = styled(IconButton)<ButtonProps>(() => ({
      color: pointerStyle === "circle" ? "#303e48" : "#697985"
    }));

    const ButtonForAvatar = styled(IconButton)<ButtonProps>(() => ({
      color: pointerStyle === "avatar" ? "#303e48" : "#697985"
    }));

    const ButtonForResetMapToDefault = styled(IconButton)<ButtonProps>(() => ({
      color: currnetZoom !== 1.5 ? "#303e48" : "#697985"
    }));

    return (
      <div className="leaflet-top leaflet-right">
        <div style={{ marginRight: "12px" }} className="leaflet-control">
          <Tooltip title="Set pointer style to circles" placement="bottom">
            <ButtonForCircle
              size="small"
              onClick={() => setPointerStyle("circle")}
            >
              <CircleIcon fontSize="inherit" />
            </ButtonForCircle>
          </Tooltip>
          <Tooltip title="Set pointer style to flags" placement="bottom">
            <ButtonForAvatar
              size="small"
              onClick={() => setPointerStyle("avatar")}
            >
              <FlagIcon fontSize="inherit" />
            </ButtonForAvatar>
          </Tooltip>
          <Tooltip title="Set map to default size" placement="bottom">
            <ButtonForResetMapToDefault
              size="small"
              onClick={resetMapToDefault}
            >
              <ZoomInMapIcon fontSize="inherit" />
            </ButtonForResetMapToDefault>
          </Tooltip>
        </div>
        {currnetZoom > 2.5 && (
          <div
            className="leaflet-control"
            style={{
              borderRadius: "15px",
              boxShadow: "0px 0px 0px 1px rgb(203 203 203)",
              marginRight: "15px"
            }}
          >
            {miniMap && miniMap}
          </div>
        )}
      </div>
    );
  };

  const makePointer = (
    groupName: string,
    layerGroupItems: any,
    groupColor: string
  ) => {
    const circles = Array<ReactNode>();
    layerGroupItems.forEach((item: any) => {
      console.log({ item });
      circles.push(
        Pointer2({
          groupName,
          groupColor,
          item,
          peopleToHighlight: props.peopleToHighlight,
          pointerStyle
        })
      );
    });
    return circles;
  };

  const mainAddresses = props.layers.mainAddresses.data;
  // const secondAddresses = props.layers.secondAddresses.data;
  const thirdAddresses = props.layers.thirdAddresses.data;

  const mainAddressLabel = `
    Main locations:
    <span style="color:black;font-weight:bold;font-size:12px">
      <b>${props.layers.mainAddresses.data.length} ⬤</b>
    </span>
  `;

  // const secondAddressesLabel = `
  //   Second locations:
  //   <span style="color:blue;font-weight:bold;font-size:12px">
  //   <b>${props.layers.secondAddresses.data.length} ⬤</b>
  //   </span>
  // `;

  const thirdAddressesLabel = `
          <LayersControl.Overlay checked name={thirdAdressName}>
    Third locations:
    <span style="color:#72638F;font-weight:bold;font-size:12px">
    <b>${props.layers.thirdAddresses.data.length} ⬤</b>
    </span>
  `;

  const ZoomWatchHook = () => {
    const map = useMapEvent("zoom", () => {
      setCurrentZoom(map.getZoom());
    });
    return null;
  };

  return (
    <div>
      <Box
        sx={{
          p: 8
        }}
      >
        <Container maxWidth="xl" sx={{ height: "100%", textAlign: "left" }}>
          <MapContainer
            style={{
              width: "100%",
              height: "720px",
              borderRadius: "5px",
              boxShadow: "0px 0px 0px 1px #b0b0b0"
            }}
            center={[center[0], center[1]]}
            zoom={zoom}
            zoomSnap={0.5}
            zoomDelta={0.5}
            minZoom={2}
            maxZoom={8}
            keyboardPanDelta={200}
            zoomControl={false}
          >
            <ZoomControl position="topleft" />
            <TileLayer
              url={mapUrl}
              attribution='🅳🅴🆅 by <a href="https://www.linkedin.com/in/michaelwybraniec/">𝙈𝙞𝙘𝙝𝙖𝙚𝙡 𝙒𝙮𝙗𝙧𝙖𝙣𝙞𝙚𝙘</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | 💰 <a href="https://stand-with-ukraine.pp.ua/">Help Ukraine Now!</a>'
            />
            <ZoomWatchHook />

            <LayersControl position="bottomleft" collapsed={false}>
              <CustomControl />
              <LayersControl.Overlay checked name={mainAddressLabel}>
                <FeatureGroup>
                  {makePointer("Main locations", mainAddresses, "black")}
                </FeatureGroup>
              </LayersControl.Overlay>
              {/* <LayersControl.Overlay checked name={secondAddressesLabel}>
                <FeatureGroup>
                  {makePointer("Second locations", secondAddresses, "blue")}
                </FeatureGroup>
              </LayersControl.Overlay> */}
              <LayersControl.Overlay checked name={thirdAddressesLabel}>
                <FeatureGroup>
                  {makePointer("third locations", thirdAddresses, "#72638F")}
                </FeatureGroup>
              </LayersControl.Overlay>
            </LayersControl>
          </MapContainer>
        </Container>
      </Box>
    </div>
  );
}

export interface HeatMapProps {
  people: any;
  peopleToHighlight: string[];
  layers: any;
  loading: Boolean;
}
