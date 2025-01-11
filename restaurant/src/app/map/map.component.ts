import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { icon, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, Map, marker, Marker } from 'leaflet';
import { LocationService } from '../Servises/Location/location.service';
import { Orders } from '../shared/models/Oreders';

@Component({
  selector: 'map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() order!: Orders;

  private readonly MARKER_ICON = icon({
    iconUrl: 'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly DEFAULT_LATLNG: LatLngTuple = [51.505, -0.09];

  @ViewChild('map', { static: false }) mapRef!: ElementRef;

  map!: Map;
  currentMarker!: Marker;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private location: LocationService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.initializeMap();
      }, 0); // تأخير صغير لضمان أن DOM جاهز
    }
  }

  private async initializeMap() {
    if (!this.isBrowser || !this.mapRef?.nativeElement) return;

    try {
      const leaflet = await import('leaflet');
      this.map = leaflet.map(this.mapRef.nativeElement, {
        center: this.DEFAULT_LATLNG,
        zoom: 5,
        attributionControl: false,
      });

      leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        })
        .addTo(this.map);

      this.map.on('click', (e: LeafletMouseEvent) => {
        this.setMarker(e.latlng);
      });
    } catch (error) {
      console.error('Failed to initialize Leaflet:', error);
    }
  }

  findMyLocation() {
    if (!this.isBrowser) return;

    this.location.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      },
      error: (err) => {
        alert('Unable to fetch location: ' + err);
      },
    });
  }

  setMarker(latlng: LatLngExpression) {
    if (!this.isBrowser) return;

    this.addressLatlng = latlng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON,
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatlng = this.currentMarker.getLatLng();
    });
  }

  set addressLatlng(latlng: LatLng) {
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }
}
