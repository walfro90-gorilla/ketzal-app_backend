import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsNumber,
  IsArray,
  ValidateNested,
  IsDateString,
  IsInt,
  ValidateIf,
} from "class-validator";
import { Type } from "class-transformer";

// 🔷 DTO for image details (banner and album)
export class ImageDto {
  @IsUrl()
  @IsNotEmpty()
  // URL of the banner image for the service
  imgBanner!: string;

  @IsArray()
  @IsUrl({}, { each: true })
  // Array of URLs for the service's image album
  imgAlbum!: string[];
}

// 🔷 DTO for date ranges with optional pricing
export class DateRangeDto {
  @IsDateString()
  @IsNotEmpty()
  // Start date of the service availability
  startDate!: string;

  @IsDateString()
  @IsNotEmpty()
  // End date of the service availability
  endDate!: string;

  @IsNumber()
  @IsOptional()
  price?: number;
}

// 🔷 DTO for service packs/package
export class PackDto {
  @IsString()
  @IsNotEmpty()
  // Name of the pack/package
  name!: string;

  @IsString()
  @IsNotEmpty()
  // Description of the pack/package
  description!: string;

  @IsNumber()
  // Quantity of items in the pack
  qty!: number;

  @IsNumber()
  // Price of the pack/package
  price!: number;
}

// 🔷 DTO for itinerary items
export class ItineraryDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsDateString()
  @IsNotEmpty()
  date!: string;

  @IsString()
  @IsNotEmpty()
  // Time of the itinerary event
  time!: string;

  @IsString()
  @IsNotEmpty()
  // Description of the itinerary event
  description!: string;

  @IsString()
  @IsNotEmpty()
  // Location of the itinerary event
  location!: string;
}

// 🔷 DTO for FAQ items
export class FaqDto {
  @IsString()
  @IsNotEmpty()
  question!: string;

  @IsString()
  @IsNotEmpty()
  answer!: string;
  // Answer to the FAQ question
}

// 🔰 Main DTO for creating a service
export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  // Name of the service
  name!: string;

  @IsString()
  @IsNotEmpty()
  // Description of the service
  description!: string;

  @IsInt()
  @IsNotEmpty()
  // ID of the supplier providing the service
  supplierId!: number;

  @IsString()
  @IsNotEmpty()
  serviceType!: string;

  @IsString()
  @IsNotEmpty()
  // Category of the service (e.g., adventure, cultural)
  serviceCategory!: string;

  @IsNumber()
  @IsOptional()
  // Maximum number of participants for the tour (optional)
  sizeTour?: number;

  @IsUrl()
  @ValidateIf((o) => o.ytLink !== "")
  @IsOptional()
  // YouTube link for the service (optional)
  ytLink?: string;

  @ValidateNested()
  @Type(() => ImageDto)
  // Image details for the service, including banner and album
  images!: ImageDto;

  @IsNumber()
  price!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DateRangeDto)
  // Available dates and prices for the service
  dates!: DateRangeDto[];

  @IsString()
  @IsNotEmpty()
  // Starting state for the service
  stateFrom!: string;

  @IsString()
  @IsNotEmpty()
  // Starting city for the service
  cityFrom!: string;

  @IsString()
  @IsNotEmpty()
  // Destination state for the service
  stateTo!: string;

  @IsString()
  @IsNotEmpty()
  // Destination city for the service
  cityTo!: string;

  @IsString()
  @IsOptional()
  // Starting country for the service (optional)
  countryFrom?: string;

  @IsString()
  @IsOptional()
  // Destination country for the service (optional)
  countryTo?: string;

  @IsString()
  @IsOptional()
  // ID of the transport provider (optional)
  transportProviderID?: string;

  @IsString()
  @IsOptional()
  // ID of the hotel provider (optional)
  hotelProviderID?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackDto)
  // Array of available packs/packages for the service
  packs!: PackDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItineraryDto)
  // Array of itinerary details for the service
  itinerary!: ItineraryDto[];

  @IsArray()
  @IsString({ each: true })
  // Array of items included in the service
  includes!: string[];

  @IsArray()
  @IsString({ each: true })
  // Array of items excluded from the service
  excludes!: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FaqDto)
  // Array of frequently asked questions and answers for the service
  faqs!: FaqDto[];
}
