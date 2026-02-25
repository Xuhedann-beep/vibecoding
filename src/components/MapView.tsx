"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { MAP_PLACES, PLACE_TYPE_COLORS, type MapPlace } from "@/data/map-places";

// 高德地图瓦片（国内访问快），style=8 为浅色
const AMAP_TILE =
  "https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";

const createCustomIcon = (color: string) =>
  L.divIcon({
    className: "custom-marker",
    html: `<span style="background-color:${color};width:16px;height:16px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.3);display:block"></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

/** 点击侧边栏时地图飞向该点 */
function FlyTo({ index }: { index: number }) {
  const map = useMap();
  const place = MAP_PLACES[index];
  useEffect(() => {
    if (!place) return;
    map.flyTo(place.coords as [number, number], 14, { duration: 1.2 });
  }, [index, map, place]);
  return null;
}

/** 单个标记 + 弹窗（点击后才渲染详细信息，减轻首屏） */
function PlaceMarker({
  place,
  index,
  isDetailOpen,
  onOpenDetail,
}: {
  place: MapPlace;
  index: number;
  isDetailOpen: boolean;
  onOpenDetail: () => void;
}) {
  const color = PLACE_TYPE_COLORS[place.type];
  return (
    <Marker
      position={place.coords}
      icon={createCustomIcon(color)}
      eventHandlers={{
        click: onOpenDetail,
      }}
    >
      <Popup>
        <div className="min-w-[180px] text-left">
          <p className="font-medium text-[#4A4A4A]">{place.name}</p>
          {isDetailOpen ? (
            <>
              <p className="text-xs text-[#4A4A4A]/70 mt-1">{place.date}</p>
              <p className="text-sm text-[#4A4A4A]/90 mt-1">{place.description}</p>
            </>
          ) : (
            <p className="text-xs text-[#FFB6C1] mt-1">点击查看详情</p>
          )}
        </div>
      </Popup>
    </Marker>
  );
}

interface MapViewProps {
  selectedIndex: number;
}

export default function MapView({ selectedIndex }: MapViewProps) {
  const [openedMarkerIndex, setOpenedMarkerIndex] = useState<number | null>(null);
  const positions = MAP_PLACES.map((p) => p.coords);
  // 默认中国范围：中心约华中，缩放 5 仅显示中国及周边
  const center: [number, number] = [34, 108];
  const zoom = 5;

  return (
    <MapContainer
      key="love-map"
      center={center}
      zoom={zoom}
      className="h-full w-full"
      scrollWheelZoom
      style={{ minHeight: "100%" }}
    >
      <FlyTo index={selectedIndex} />
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
      {MAP_PLACES.map((place, i) => (
        <PlaceMarker
          key={i}
          place={place}
          index={i}
          isDetailOpen={openedMarkerIndex === i}
          onOpenDetail={() => setOpenedMarkerIndex(i)}
        />
      ))}
    </MapContainer>
  );
}
