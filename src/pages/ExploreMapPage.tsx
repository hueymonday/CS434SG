import React, { useState } from 'react';
import { SearchIcon, FilterIcon, MapPinIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
interface ExploreMapPageProps {
  isLoggedIn: boolean;
}
export const ExploreMapPage = ({
  isLoggedIn
}: ExploreMapPageProps) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'beach' | 'mountain' | 'culture'>('all');
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  // Mock location data with proper coordinates
  const locations = [{
    id: 1,
    name: 'Bali, Indonesia',
    type: 'beach',
    popular: true,
    posts: 1243,
    preview: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    position: [-8.409518, 115.188919] // Latitude, Longitude
  }, {
    id: 2,
    name: 'Kyoto, Japan',
    type: 'culture',
    popular: true,
    posts: 987,
    preview: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    position: [35.011665, 135.768169]
  }, {
    id: 3,
    name: 'Santorini, Greece',
    type: 'beach',
    popular: true,
    posts: 1576,
    preview: 'https://images.unsplash.com/photo-1469796466635-455ede028aca?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    position: [36.393154, 25.46151]
  }, {
    id: 4,
    name: 'Swiss Alps',
    type: 'mountain',
    popular: false,
    posts: 876,
    preview: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    position: [46.8182, 8.2275]
  }, {
    id: 5,
    name: 'Machu Picchu, Peru',
    type: 'mountain',
    popular: true,
    posts: 1124,
    preview: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    position: [-13.1631, -72.545]
  }, {
    id: 6,
    name: 'Marrakech, Morocco',
    type: 'culture',
    popular: false,
    posts: 645,
    preview: 'https://images.unsplash.com/photo-1548234979-f5e1949a264d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    position: [31.6295, -7.9811]
  }, {
    id: 7,
    name: 'New York, USA',
    type: 'culture',
    popular: true,
    posts: 2345,
    preview: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    position: [40.7128, -74.006]
  }];
  const filteredLocations = activeFilter === 'all' ? locations : activeFilter === 'popular' ? locations.filter(loc => loc.popular) : locations.filter(loc => loc.type === activeFilter);
  // Custom marker icon to match our UI
  const createCustomIcon = (isPopular: boolean) => {
    return L.divIcon({
      className: 'custom-pin',
      html: `<div class="pin-container">
              <div class="pin-dot ${isPopular ? 'bg-[#0077B6]' : 'bg-[#00B4D8]'}"></div>
              <div class="pin-pulse ${isPopular ? 'bg-[#0077B6]' : 'bg-[#00B4D8]'}"></div>
            </div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };
  return <div className="h-full flex flex-col">
      {/* Search and Filter Bar */}
      <div className="bg-white border-b border-gray-100 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="relative flex-1 mb-4 md:mb-0">
            <input type="text" placeholder="Search locations..." className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#0077B6]" />
            <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
            <button className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${activeFilter === 'all' ? 'bg-[#0077B6] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('all')}>
              All Locations
            </button>
            <button className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${activeFilter === 'popular' ? 'bg-[#0077B6] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('popular')}>
              Popular
            </button>
            <button className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${activeFilter === 'beach' ? 'bg-[#0077B6] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('beach')}>
              Beaches
            </button>
            <button className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${activeFilter === 'mountain' ? 'bg-[#0077B6] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('mountain')}>
              Mountains
            </button>
            <button className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${activeFilter === 'culture' ? 'bg-[#0077B6] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveFilter('culture')}>
              Cultural
            </button>
          </div>
        </div>
      </div>
      {/* Map Area */}
      <div className="relative flex-1 overflow-hidden">
        {/* Leaflet Map */}
        <style jsx>{`
          .leaflet-container {
            height: 100%;
            width: 100%;
            z-index: 1;
          }
          .custom-pin .pin-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
          }
          .custom-pin .pin-pulse {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            opacity: 0.6;
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% {
              transform: translate(-50%, -50%) scale(0.5);
              opacity: 0.8;
            }
            70% {
              transform: translate(-50%, -50%) scale(2);
              opacity: 0;
            }
            100% {
              transform: translate(-50%, -50%) scale(0.5);
              opacity: 0;
            }
          }
        `}</style>
        <MapContainer center={[20, 0]} zoom={2} minZoom={2} maxZoom={18} scrollWheelZoom={true} style={{
        height: '100%',
        width: '100%'
      }}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredLocations.map(location => <Marker key={location.id} position={location.position} icon={createCustomIcon(location.popular)} eventHandlers={{
          click: () => {
            setSelectedLocation(location);
          }
        }}>
              <Popup>
                <div className="text-center">
                  <strong>{location.name}</strong>
                  <p>{location.posts} posts</p>
                </div>
              </Popup>
            </Marker>)}
        </MapContainer>
        {/* Selected Location Preview */}
        {selectedLocation && <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={selectedLocation.preview} alt={selectedLocation.name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{selectedLocation.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    <span>{selectedLocation.posts} posts</span>
                  </div>
                </div>
                <button className="p-1" onClick={() => setSelectedLocation(null)}>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="flex-1 py-2 bg-[#0077B6] text-white rounded-lg text-sm font-medium hover:bg-[#00B4D8] transition-colors">
                  View Posts
                </button>
                {isLoggedIn && <button className="flex-1 py-2 border border-[#0077B6] text-[#0077B6] rounded-lg text-sm font-medium hover:bg-[#0077B6] hover:text-white transition-colors">
                    Check In
                  </button>}
              </div>
            </div>
          </div>}
      </div>
    </div>;
};