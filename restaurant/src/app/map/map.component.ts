import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { LocationService } from '../Servises/Location/location.service';
import { defaults as defaultControls } from 'ol/control';
import { Orders } from '../shared/models/Oreders';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() order!: Orders;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: Map;
  markerLayer!: VectorLayer<VectorSource>;
  isBrowser: boolean;

  private readonly DEFAULT_LATLNG = [51.505, -0.09]; // Default coordinates (Longitude, Latitude)
  private readonly MARKER_ICON_URL = 'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private locationService: LocationService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    // يمكننا ترك هذا فارغاً لأن التهيئة ستكون في ngAfterViewInit
  }

  ngAfterViewInit(): void {
    // تحقق من أن الـ mapContainer موجود بعد تحميل الـ DOM
    if (this.isBrowser && this.mapContainer?.nativeElement) {
      this.initializeMap();
    } else {
      console.error('Map container is not defined or environment is not browser.');
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.setTarget(); // تأكد من تدمير الخريطة بشكل صحيح
    }
  }

  private initializeMap() {
    const markerSource = new VectorSource();
    this.markerLayer = new VectorLayer({
      source: markerSource,
      style: new Style({
        image: new Icon({
          src: this.MARKER_ICON_URL,
          anchor: [0.5, 0.7],
          scale: 0.3,
        }),
      }),
    });

    this.map = new Map({
      target: this.mapContainer.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.markerLayer,
      ],
      view: new View({
        center: fromLonLat(this.DEFAULT_LATLNG),
        zoom: 13,
      }),
      controls: defaultControls(),
    });

    this.map.on('click', (event) => this.addMarker(event.coordinate));
  }

  // دالة العثور على الموقع الفعلي
  findMyLocation() {
    if (!this.isBrowser) return;

    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        const lonLat = [latlng.lng, latlng.lat];
        const olCoord = fromLonLat(lonLat);
        this.map.getView().animate({ center: olCoord, zoom: 16 });
        this.addMarker(olCoord);
      },
      error: () => alert('Unable to fetch location. Please enable GPS and try again.'),
    });
  }

  // إضافة علامة على الخريطة
  private addMarker(coordinate: number[]) {
    const lonLat = toLonLat(coordinate);
    this.updateOrderCoordinates(lonLat[1], lonLat[0]);

    const markerFeature = new Feature({
      geometry: new Point(coordinate),
    });

    this.markerLayer.getSource()?.clear(); // Clear existing markers
    this.markerLayer.getSource()?.addFeature(markerFeature);
  }

  private updateOrderCoordinates(lat: number, lon: number) {
    this.order.addressLatLng = {
      lat: parseFloat(lat.toFixed(8)),
      lng: parseFloat(lon.toFixed(8)),
    };
    console.log('Order coordinates updated:', this.order.addressLatLng);
  }
}
