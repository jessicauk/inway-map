import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { latLng, tileLayer, Map, marker, Marker, divIcon, LatLngTuple } from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';

import { PostalRecordFields } from '../../api/models';
import { environment } from '../../environments/env';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  imports: [LeafletModule, CommonModule]
})
export class MapComponent implements OnChanges {
  @Input() data: PostalRecordFields[] = [];
  @Input() selected: PostalRecordFields | null = null;
  @Output() pinSelect = new EventEmitter<PostalRecordFields>();

  map!: Map;
  markers: Marker[] = [];

  options = {
    center: latLng(20, 0),
    zoom: 2,
    layers: [
      tileLayer(environment.osmTileUrl, {
        attribution: environment.osmAttribution,
        maxZoom: 19
      })
    ]
  };

  onMapReady(m: Map) {
    this.map = m;
    this.refreshMarkers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.map) this.refreshMarkers();
    if (changes['selected'] && this.map) this.focusSelected();
  }

  private getLatLng(r: PostalRecordFields): LatLngTuple | null {
    if (r.geo_point_2d) return [r.geo_point_2d.lat, r.geo_point_2d.lon] as LatLngTuple;
    const lat = Number(r.latitude);
    const lon = Number(r.longitude);
    if (Number.isFinite(lat) && Number.isFinite(lon)) return [lat, lon] as LatLngTuple;
    return null;
  }

  private refreshMarkers() {
    console.log("refreshMarkers", this.data);
    this.markers.forEach(m => m.remove());
    this.markers = [];
    const coords: [number, number][] = [];

    for (const r of this.data) {
      const ll = this.getLatLng(r);
      if (!ll) continue;
      const [lat, lon] = ll; coords.push([lat, lon]);
      const m = marker(ll, {
        icon: this.makeIcon(false)
      }).on('click', () => {
        const event = new CustomEvent('pin-selected', { detail: r });
        window.dispatchEvent(event); // canal simple de comunicación
        this.bounce(m);
      });
      m.addTo(this.map);
      this.markers.push(m);
    }

    // Ajustar vista
    if (coords.length) {
      const bounds = (window as any).L.latLngBounds(coords);
      this.map.fitBounds(bounds.pad(0.15));
    }
  }

  private focusSelected() {
    console.log("focusSelected", this.selected);
    if (!this.selected) return;
    const ll = this.getLatLng(this.selected);
    if (!ll) return;
    this.map.flyTo(ll, Math.max(8, this.map.getZoom()));
    console.log("focusSelected to", ll);
    // resaltar pin seleccionado
    const idx = this.data.findIndex(d => d === this.selected);
    if (idx >= 0 && this.markers[idx]) {
      this.markers[idx].setIcon(this.makeIcon(true));
      this.bounce(this.markers[idx]);
    }
  }

  private makeIcon(active: boolean) {
    // DivIcon con animación CSS
    return divIcon({
      className: active ? 'pin pin-active' : 'pin',
      html: `<div class="pulse"></div><div class="dot"></div>`,
      iconSize: [100, 100],
      iconAnchor: [50, 100]
    });
  }

  private bounce(m: Marker) {
    const iconEl = m.getElement();
    iconEl?.classList.add('bounce');
    setTimeout(() => iconEl?.classList.remove('bounce'), 700);
  }
}

