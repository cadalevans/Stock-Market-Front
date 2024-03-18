export class Place {
    constructor(
      public place_name: string,
      public place_address: string,
      public place_city: string,
      public place_state: string,
      public place_img: string,
      public place_lng: number,
      public place_lat: number
    ) {}
  }