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
const personAvatarAlt =
  "https://p1.hiclipart.com/preview/565/751/756/man-avatar-male-silhouette-user-profile-gentleman-suit-head-png-clipart.jpg";

export function Pointer(props: PointerProps) {
  console.log({ props });
  const clicked = (data) => {
    console.log("click", { data });
  };
  let pointers = Array<ReactNode>();
  // let pointer = "";

  const icon = (photo: any, size: any) => {
    return new Leaflet.Icon({
      iconUrl: photo ? photo : personAvatarAlt,
      iconSize: [size, size + size / 15],
      iconAnchor: [size / 2, size / 1.5],
      popupAnchor: [0, -size / 2]
    });
  };

  const createPointer = (
    key: string,
    color: string,
    item: any,
    center: any,
    idsToHighlight: string[]
  ) => {
    pointers.push(
      <FeatureGroup
        key={key}
        // key={item.id}
      >
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
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>

          // <CircleMarker
          //   center={[20, 0]} //{center}
          //   pathOptions={{
          //     weight: 8, // idsToHighlight.includes(item.id) ? 8 : 4,
          //     color: "red" //color
          //   }}
          //   radius={idsToHighlight.includes(item.id) ? 4 : 2}
          //   eventHandlers={{ click: (e) => clicked(e) }}
          // />

          // <Circle
          //   center={new Leaflet.LatLng(50.49, 10)} //{center}
          //   pathOptions={{
          //     // weight: 8, // idsToHighlight.includes(item.id) ? 8 : 4,
          //     fillColor: "red" //color
          //   }}
          //   radius={100} // {idsToHighlight.includes(item.id) ? 4 : 2}
          //   // eventHandlers={{ click: (e) => clicked(e) }}
          // />

          // <Marker position={[51.505, -0.09]}>
          //   <Popup>
          //     A pretty CSS3 popup. <br /> Easily customizable.
          //   </Popup>
          // </Marker>
        )}
        {props.pointerStyle === "avatar" && (
          <Marker
            icon={icon("pic", idsToHighlight.includes(item.id) ? 25 : 15)}
            key={key}
            // key={item.id}
            position={center}
            eventHandlers={{ click: (e) => clicked(e) }}
          ></Marker>
        )}
      </FeatureGroup>
    );
  };

  // if (props.peopleToHighlight?.length > 0) {
  //   if (props.peopleToHighlight.includes(props.item.id)) {
  //     createPointer(
  //       props.groupColor,
  //       props.item,
  //       new Leaflet.LatLng(item.lat, item.lon),
  //       props.peopleToHighlight
  //     );
  //   }
  // } else {
  //   console.log({ item });
  //   createPointer(
  //     props.groupColor,
  //     props.item,
  //     new Leaflet.LatLng(item.lat, item.lon),
  //     props.peopleToHighlight
  //   );
  // }

  if (props.item.length > 0) {
    props.item.forEach((el: any, index: number) => {
      const { lat, lon, id } = el;
      const key = `${index}${lat}${lon}${id}}`;

      if (props.peopleToHighlight?.length > 0) {
        if (props.peopleToHighlight.includes(props.item.id)) {
          createPointer(
            key,
            props.groupColor,
            props.item,
            new Leaflet.LatLng(lat, lon),
            props.peopleToHighlight
          );
        }
      } else {
        createPointer(
          key,
          props.groupColor,
          props.item,
          new Leaflet.LatLng(lat, lon),
          props.peopleToHighlight
        );
      }
    });
  }

  return pointers;
  // return pointer;
  // return (
  //   <Circle
  //     center={new Leaflet.LatLng(50.49, 10)} //{center}
  //     pathOptions={{
  //       // weight: 8, // idsToHighlight.includes(item.id) ? 8 : 4,
  //       fillColor: "red" //color
  //     }}
  //     radius={100} // {idsToHighlight.includes(item.id) ? 4 : 2}
  //     // eventHandlers={{ click: (e) => clicked(e) }}
  //   />
  // );
}

export interface PointerProps {
  groupName: string;
  groupColor: string;
  item: any;
  peopleToHighlight: string[];
  pointerStyle: string;
}
