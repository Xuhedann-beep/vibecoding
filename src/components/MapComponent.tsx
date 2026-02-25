import { useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_PLACES, PLACE_TYPE_COLORS, type MapPlace } from '@/data/map-places';
import L from 'leaflet';

// 高德地图瓦片（国内访问快），style=8 为浅色
const AMAP_TILE =
  'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}';

const createCustomIcon = (color: string) =>
  L.divIcon({
    className: 'custom-marker',
    html: `<span style="background-color:${color};width:16px;height:16px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.3);display:block"></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

export default function MapComponent() {
  // 使用 useMemo 确保数据只创建一次
  const locations = useMemo(() => MAP_PLACES, []);
  const positions = useMemo(() => locations.map((p) => p.coords), [locations]);
  // 默认中国范围：中心约华中，缩放 5 仅显示中国及周边
  const center: [number, number] = [34, 108];
  const zoom = 5;

  return (
    <MapContainer
      key="love-map-unique"
      center={center}
      zoom={zoom}
      scrollWheelZoom
      style={{ height: '400px', width: '100%', borderRadius: '16px' }}
    >
      {/* 高德地图底图（国内瓦片，加载更快） */}
      <TileLayer
        attribution='&copy; <a href="https://lbs.amap.com/">高德地图</a>'
        url={AMAP_TILE}
        subdomains="1234"
      />
      <Polyline
        positions={positions}
        pathOptions={{
          color: "#FFB6C1",
          weight: 4,
          dashArray: "10, 12",
          lineCap: "round",
          lineJoin: "round",
        }}
      />
      {locations.map((place, i) => {
        const color = PLACE_TYPE_COLORS[place.type];
        return (
          <Marker
            key={i}
            position={place.coords}
            icon={createCustomIcon(color)}
          >
            <Popup>
              <div className="min-w-[180px] text-left">
                <p className="font-medium text-[#4A4A4A]">{place.name}</p>
                <p className="text-xs text-[#4A4A4A]/70 mt-1">{place.date}</p>
                <p className="text-sm text-[#4A4A4A]/90 mt-1">{place.description}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
