import { GlobalLocationsService } from './global-locations.service';
import { CreateGlobalLocationDto } from './dto/create-global-location.dto';
import { UpdateGlobalLocationDto } from './dto/update-global-location.dto';
export declare class GlobalLocationsController {
    private readonly globalLocationsService;
    constructor(globalLocationsService: GlobalLocationsService);
    create(createDto: CreateGlobalLocationDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateDto: UpdateGlobalLocationDto): Promise<any>;
    remove(id: string): Promise<{
        id: bigint;
        country: string;
        state: string;
        city: string;
    }>;
}
