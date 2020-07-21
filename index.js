import React, { useState } from "react";
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import './style.css';

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
require('highcharts/modules/networkgraph')(Highcharts);  
const options = {
    chart: {
        type: 'networkgraph'
    },
    title: {
        text: 'Ariane King'
    },
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
            layoutAlgorithm: {
                enableSimulation: true,
                friction: -0.9
            }
        }
    },
    series: [{
        dataLabels: {
            enabled: true,
            linkFormat: ''
        },
        id: 'lang-tree',
        data: [
          {
            "from":"Ariane King",
            "to":"Stephan Keeling",
            "name":"Stephan Keeling",
            "description":"Stephan Keeling",
            "marker":{
              "radius":10
            }
          },
          {
            "from":"Ariane King",
            "to":"Gaetano Schoen",
            "name":"Gaetano Schoen",
            "description":"Gaetano Schoen",
            "marker":{
              "radius":10
            }
          },
          {
            "from":"Ariane King",
            "to":"Murphy Schmitt",
            "name":"Murphy Schmitt",
            "description":"Murphy Schmitt",
            "marker":{
              "radius":10
            }
          },
          {
            "from":"Ariane King",
            "to":"Chris Anderson",
            "name":"Chris Anderson",
            "description":"Chris Anderson",
            "marker":{
              "radius":10
            }
          },
            {
            "from":"Ariane King",
            "to":"Eulalia Towne",
            "name":"Eulalia Towne",
            "description":"Eulalia Towne",
            "marker":{
              "radius":10
            }
          }
        ]
    }]
};

const addresses = [
  { lat: 37.761326, lng: -122.424681 },
  { lat: 37.764556, lng: -122.426643 },
  { lat: 37.768425, lng: -122.420215 },
  { lat: 37.767518, lng: -122.415952 },
  { lat: 37.765122, lng: -122.4103 },
  { lat: 37.764609, lng: -122.410264 },
  { lat: 37.764465, lng: -122.409145 },
  { lat: 37.764508, lng: -122.408136 },
  { lat: 37.766544, lng: -122.408485 },
  { lat: 37.763681, lng: -122.408139 },
  { lat: 37.764085, lng: -122.411032 },
  { lat: 37.766515, lng: -122.41082 }
];
const mapProps = {
  center: {
    lat: 37.764791,
    lng: -122.4173808
  },
  zoom: 17,
  key: 'AIzaSyAyPqAkq2s9Z75QzarTAQHSHTxaNnVDqeE'
};

const App = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=" + mapProps.key,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const [isOpen, setOpen] = useState(-1);
  const handleToggleOpen = (selected) => {
    setOpen(selected);
  }
  const handleToggleClose = () => {
    setOpen(-1);
  }
  return (
    <GoogleMap defaultZoom={mapProps.zoom} defaultCenter={mapProps.center}>
      {addresses.map((pos, index) => (
        <Marker
          position={pos}
          onClick={() => handleToggleOpen(index)}
        >
          { (isOpen == index ) && 
            <InfoWindow  onCloseClick={props.handleToggleClose}>
              <HighchartsReact
                containerProps={{ style: { width: "400px", height: "400px" } }}
                highcharts={Highcharts}
                options={options}
              />
            </InfoWindow>}
        </Marker>
      ))}
    </GoogleMap>
  )
});

ReactDOM.render(<App />, document.getElementById('root'));
