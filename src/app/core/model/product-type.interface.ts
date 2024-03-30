export class ProductTypeInterface {
    id: string;
    createdDate: Date;
    updatedDate: Date;
    shortName: string;
    status: boolean;
    priceRecharge: number;
    priceDrum: number;

    constructor() {
        this.id = '';
        this.createdDate = new Date();
        this.updatedDate = new Date();
        this.shortName = '';
        this.status = false;
        this.priceRecharge = 0;
        this.priceDrum = 0;
    }

}
