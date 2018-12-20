import React from 'react';
// import GoogleMapReact from 'google-map-react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps';

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.isMarkerShown && (
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      )}
    </GoogleMap>
  ))
);

const Map = () => {
  return (
    <div
      style={{
        height: '500px',
        width: '600px',
        position: 'absolute',
        left: '20px'
      }}
    >
      <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// const Map = () => {
//   const center = { lat: 40.744679, lng: -73.948542 };
//   const zoom = 11;
//   const API_KEY =
//     '499147799494-cs6l6votcaq8dd2sql50qegbr9ng3elj.apps.googleusercontent.com';

//   return (
//     <div
//       style={{
//         height: '500px',
//         width: '600px',
//         position: 'absolute',
//         left: '20px'
//       }}
//     >
//       <GoogleMapReact
//         defaultCenter={center}
//         defaultZoom={zoom}
//         // bootstrapURLKeys={{}}
//       >
//         <AnyReactComponent
//           lat={51.508742}
//           lng={-0.12085}
//           text={`Where's Waldo?`}
//         />
//       </GoogleMapReact>
//     </div>
//   );
// };

export default Map;
