// components/PublicMap.tsx
import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import axios from 'axios'

const containerStyle = {
  width: '100%',
  height: '600px',
}

const center = {
  lat: 52.2871,
  lng: 76.9674,
}

const PublicMap = () => {
  const [buildings, setBuildings] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:8000/api/buildings/').then(res => {
      setBuildings(res.data)
    })
  }, [])

  return (
    <LoadScript googleMapsApiKey="AIzaSyCcedIxvffvLDKZM3mFjDBhV6ow8UplfOc">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {buildings.map((b) => {
        const coords = b?.location?.coordinates
        if (!coords || coords.length < 2) return null

        return (
          <Marker
          key={b.id}
          position={{ lat: coords[1], lng: coords[0] }}
          onClick={() => setSelected(b)}
          />
        )
        })}

        {selected && selected.location?.coordinates?.length >= 2 && (
          <InfoWindow
            position={{
              lat: selected.location.coordinates[1],
              lng: selected.location.coordinates[0],
            }}
            onCloseClick={() => setSelected(null)}
          >
            <div className="text-sm">
              <p><strong>Адрес:</strong> {selected.address}</p>
              <p>Жильцов: {selected.total_residents}</p>
              <p>Должников: {selected.total_debtors}</p>
              <p>Задолженность: {selected.total_debt} ₸</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default PublicMap
