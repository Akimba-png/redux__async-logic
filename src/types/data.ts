export type Offer = {
  author: {
    avatar: string,
  },
  offer: {
    title: string,
    address: string,
    price: number,
    type: string,
    rooms: number,
    guests: number,
    checkin: string,
    checkout: string,
    features: string[],
    description: string,
    photos: string[],
  },
  location: {
    lat: number,
    lng: number,
  },
}
