import "./styles.css";
import { Link } from "@mui/material";
import { DefaultMap } from "./DefaultMap";
import data from "./data.json";

export default function App() {
  const people = [...Array(100).keys()].map((el) => {
    return { id: `person${el}`, label: `label${el}`, details: `details${el}` };
  });

  console.log({ data });
  let mainAddresses = [...Array(25).keys()].map((el, i) => {
    return {
      id: `mainAddresses${el}_${Math.random()}`,
      address: `${el} Teddy Street ${data[0].countries[el].country} ${data.countries[i].name}`,
      postCode: `41 - 50${el}`,
      lat: data[0].countries[i].latitude,
      lon: data[0].countries[i].longitude
    };
  });

  const secondAddresses = [...Array(400).keys()].map((el) => {
    return {
      id: `secondAddresses${el}_${Math.random()}`,
      address: `${el} Wally Avenue`,
      postCode: `60 - 00${el}`,
      lat: el + 10,
      lon: el + 10
    };
  });

  const thirdAddresses = [...Array(200).keys()].map((el) => {
    return {
      id: `thirdAddresses${el}_${Math.random()}`,
      address: `${el} Wally Avenue`,
      postCode: `60 - 00${el}`,
      lat: el + 10,
      lon: el + 10
    };
  });

  const layers = {
    mainAddresses: {
      data: mainAddresses.map((el, index) => {
        return { ...el, tenants: people.filter((p, i) => i > 25 * index + 1) };
      })
    },
    secondAddresses: {
      data: secondAddresses.map((el, index) => {
        return { ...el, tenants: people.filter((p, i) => i > 100 * index + 1) };
      })
    },
    thirdAddresses: {
      data: thirdAddresses.map((el, index) => {
        return { ...el, tenants: people.filter((p, i) => i > 50 * index + 1) };
      })
    }
  };

  return (
    <div className="App">
      <DefaultMap
        people={people}
        // peopleToHighlight={[1, 4, 44, 53]}
        peopleToHighlight={[]}
        layers={layers}
        loading={false}
      />
      <div style={{ padding: "10px" }}>
        <b>
          Did you know that Leaflet 1.8 has been released in the middle of war
          ?!
        </b>
        <p> Thank you for a fantastic work ♡</p>
        <Link href="https://stand-with-ukraine.pp.ua/">Help Ukraine Now!</Link>
      </div>
    </div>
  );
}
