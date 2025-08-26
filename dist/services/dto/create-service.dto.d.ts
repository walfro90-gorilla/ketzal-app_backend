export declare class ImageDto {
    imgBanner: string;
    imgAlbum: string[];
}
export declare class DateRangeDto {
    startDate: string;
    endDate: string;
    price?: number;
}
export declare class PackDto {
    name: string;
    description: string;
    qty: number;
    price: number;
}
export declare class ItineraryDto {
    title: string;
    date: string;
    time: string;
    description: string;
    location: string;
}
export declare class FaqDto {
    question: string;
    answer: string;
}
export declare class CreateServiceDto {
    name: string;
    description: string;
    supplierId: number;
    serviceType: string;
    serviceCategory: string;
    sizeTour?: number;
    ytLink?: string;
    images: ImageDto;
    price: number;
    dates: DateRangeDto[];
    stateFrom: string;
    cityFrom: string;
    stateTo: string;
    cityTo: string;
    countryFrom?: string;
    countryTo?: string;
    transportProviderID?: string;
    hotelProviderID?: string;
    packs: PackDto[];
    itinerary: ItineraryDto[];
    includes: string[];
    excludes: string[];
    faqs: FaqDto[];
}
