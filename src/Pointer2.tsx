import { ReactNode } from "react";
import Leaflet from "leaflet";
import {
  Tooltip,
  CircleMarker,
  Circle,
  Marker,
  Popup,
  FeatureGroup
} from "react-leaflet";
import { Avatar } from "./Avatar";
import "leaflet/dist/leaflet.css";
import {
  Grid
  // Link
} from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";
// import { Navigation } from "./Navigation";

export function Pointer2(props: PointerProps) {
  // console.log({ props });
  const clicked = (data) => {
    console.log("click", { data });
  };
  // let pointers = Array<ReactNode>();
  let pointer = "" as any;

  const miniFlag = (country: string, size: any) => {
    console.log({ country });
    const countryCode = country.toString().toLowerCase();
    const countryFlag = `https://flagcdn.com/48x36/${countryCode}.png`;

    return new Leaflet.Icon({
      iconUrl: countryFlag ? countryFlag : "🏴‍☠️",
      iconSize: [size, size + size / 15],
      iconAnchor: [size / 2, size / 1.5],
      popupAnchor: [0, -size / 2]
    });
  };

  const createPointer = (
    color: string,
    item: any,
    center: any,
    idsToHighlight: string[]
  ) => {
    return (
      <FeatureGroup key={item.id}>
        <Tooltip opacity={1} sticky offset={[5, 0]}>
          <table>
            <tbody>
              <tr>
                <td>
                  <div>
                    <Avatar
                      src={""}
                      size={"extreme-small"}
                      pictureStyle="silver"
                      countryCode={item.country}
                    />
                  </div>
                </td>
                <td style={{ paddingRight: "8px" }}>
                  <div>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <Grid container spacing={0}>
                          <Grid item xs={12}>
                            <div style={{ fontWeight: 600, fontSize: "12px" }}>
                              {item.address}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <div>
                              <span
                                style={{ fontSize: "9px", fontWeight: 400 }}
                              >
                                {item.postCode}
                              </span>
                              <span
                                style={{
                                  fontSize: "9px",
                                  marginLeft: "4px",
                                  fontWeight: 600,
                                  color: color
                                }}
                              >
                                {item.address.length}
                              </span>
                              <span
                                style={{
                                  height: "8.5px",
                                  width: "8.5px",
                                  marginLeft: "4px",
                                  backgroundColor: color,
                                  borderRadius: " 50%",
                                  display: "inline-block",
                                  verticalAlign: "middle"
                                }}
                              ></span>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Tooltip>
        <Popup>
          <table>
            <tbody>
              <tr>
                <td style={{ paddingRight: "10px" }}>
                  <Avatar
                    src={"pic"}
                    size={"extra-small"}
                    pictureStyle="silver"
                    countryCode={item.country}
                  />
                </td>
                <td>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Grid container spacing={0}>
                        <Grid item xs={12}>
                          <div style={{ fontSize: "13px" }}>
                            {/* <Link */}
                            {/* component={RouterLink} */}
                            {/* to={Navigation.avatar.url(profileId)} */}
                            underline="hover"
                            {/* > */}
                            <b>{item.address}</b>
                            {/* </Link> */}
                          </div>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: "3px" }}>
                          <span style={{ fontSize: "12px" }}>
                            {item.address}:{" "}
                          </span>
                          <span
                            style={{
                              color: color,
                              fontWeight: "bold",
                              fontSize: "12px"
                            }}
                          >
                            <b>{item.address.length} ⬤</b>
                          </span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </td>
              </tr>
            </tbody>
          </table>
        </Popup>

        {props.pointerStyle === "circle" && (
          <CircleMarker
            key={item.id}
            center={center}
            pathOptions={{
              weight: idsToHighlight.includes(item.id) ? 10 : 6,
              color: color
            }}
            radius={idsToHighlight.includes(item.id) ? 6 : 4}
            eventHandlers={{ click: (e) => clicked(e) }}
          />
        )}
        {props.pointerStyle === "avatar" && (
          <Marker
            icon={miniFlag(
              item.country,
              idsToHighlight.includes(item.id) ? 25 : 15
            )}
            key={item.id}
            position={center}
            eventHandlers={{ click: (e) => clicked(e) }}
          ></Marker>
        )}
      </FeatureGroup>
    );
  };

  if (props.peopleToHighlight?.length > 0) {
    // console.log("peopleToHighlight", { props });
    if (props.peopleToHighlight.includes(props.item.id)) {
      // console.log("peopleToHighlight found ids", { props });

      pointer = createPointer(
        props.groupColor,
        props.item,
        new Leaflet.LatLng(props.item.lat, props.item.lon),
        props.peopleToHighlight
      );
    }
  } else {
    // console.log({ props });
    pointer = createPointer(
      props.groupColor,
      props.item,
      new Leaflet.LatLng(props.item.lat, props.item.lon),
      props.peopleToHighlight
    );
  }

  return pointer;
}

export interface PointerProps {
  groupName: string;
  groupColor: string;
  item: any;
  peopleToHighlight: string[];
  pointerStyle: string;
}