export class DrumRequestModel {
    available: number;
    description: string;
    refillPrice: number;
    bottlePrice: number;
    isRefill: boolean;

    constructor() {
        this.available = 0;
        this.description = '';
        this.refillPrice = 0;
        this.bottlePrice = 0;
        this.isRefill = false;
    }


}
