import { ReactNode } from 'react';
import Leaflet from 'leaflet';
import { Tooltip, CircleMarker, Marker, Popup, FeatureGroup } from 'react-leaflet';
// eslint-disable-next-line
import { Avatar } from './Avatar.tsx';
import 'leaflet/dist/leaflet.css';

export function Pointer2(props: PointerProps) {
  let pointer = '' as ReactNode;

  const miniFlag = (country: string, size: any) => {
    console.log({ country });
    const countryCode = country.toLowerCase();
    const countryFlag = `https://flagcdn.com/48x36/${countryCode}.png`;

    return new Leaflet.Icon({
      iconUrl: countryFlag ? countryFlag : '🏴‍☠️',
      iconSize: [size, size + size / 15],
      iconAnchor: [size / 2, size / 1.5],
      popupAnchor: [0, -size / 2],
    });
  };

  const createPointer = (color: string, item: any, center: any, idsToHighlight: string[]) => {
    return (
      <FeatureGroup>
        <Tooltip opacity={1} sticky offset={[5, 0]}>
          <table>
            <tbody>
              <tr>
                <td style={{ paddingRight: '10px' }}>
                  <div>
                    <Avatar
                      src={''}
                      size={'extreme-small'}
                      pictureStyle="silver"
                      countryCode={item.countryCode}
                    />
                  </div>
                </td>
                <td style={{ paddingRight: '8px' }}>
                  <div>
                    <span style={{ fontSize: '12px' }}>{item.address}</span>
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
                <td style={{ paddingRight: '10px' }}>
                  <Avatar
                    src={''}
                    size={'extreme-small'}
                    pictureStyle="silver"
                    countryCode={item.countryCode}
                  />
                </td>
                <td>
                  <span style={{ fontSize: '12px' }}>{item.address}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </Popup>

        {props.pointerStyle === 'circle' && (
          <CircleMarker
            key={item.id}
            center={center}
            pathOptions={{
              weight: idsToHighlight.includes(item.id) ? 3 : 1.5,
              color: color,
            }}
            radius={idsToHighlight.includes(item.id) ? 9 : 7}
          />
        )}
        {props.pointerStyle === 'avatar' && (
          <Marker
            icon={miniFlag(item.countryCode, idsToHighlight.includes(item.id) ? 25 : 15)}
            key={item.id}
            position={center}
          ></Marker>
        )}
      </FeatureGroup>
    );
  };

  if (props.peopleToHighlight?.length > 0) {
    if (props.peopleToHighlight.includes(props.item.id)) {
      pointer = createPointer(
        props.groupColor,
        props.item,
        new Leaflet.LatLng(props.item.lat, props.item.lon),
        props.peopleToHighlight
      );
    }
  } else {
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
