// AddressAutocomplete.jsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useLoadScript } from '@react-google-maps/api';

// Reemplaza con tu API Key de Google Places
const API_KEY = 'AIzaSyBbsNmU1YV6dyq8mVZxw9ARsqUQaJqxFzE';
const LIBRARIES = ['places'];

const AddressAutocomplete = ({ onAddressSelect }) => {
  const [options, setOptions] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: LIBRARIES,
  });

  const autocompleteService = useRef(null);

  useEffect(() => {
    if (isLoaded) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
      console.log('Google Maps API loaded');
    }
  }, [isLoaded]);

  const handleInputChange = (event, value) => {
    console.log('Input changed:', value);
    if (autocompleteService.current && value) {
      autocompleteService.current.getPlacePredictions({ input: value }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          console.log('Predictions:', predictions);
          setOptions(predictions);
        } else {
          console.log('No predictions found or error:', status);
          setOptions([]);
        }
      });
    } else {
      setOptions([]);
    }
  };

  const handleOptionSelect = (event, value) => {
    if (value && onAddressSelect) {
      const placeId = value.place_id;
      const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
      placesService.getDetails({ placeId }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          console.log('Place details:', place);
          onAddressSelect(place);
        } else {
          console.log('Error getting place details:', status);
        }
      });
    } else {
      console.log('Address select function is not defined or value is null');
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => option.description || ''}
      onInputChange={handleInputChange}
      onChange={handleOptionSelect}
      renderInput={(params) => <TextField {...params} label="Dirección" variant="outlined" fullWidth />}
    />
  );
};

export default AddressAutocomplete;
