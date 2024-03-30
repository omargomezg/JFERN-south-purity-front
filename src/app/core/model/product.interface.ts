import {PlaceModel, ProductTypeInterface} from './index';

export class ProductModel {
    id: string;
    place: PlaceModel;
    productType: ProductTypeInterface;
    createdDate: Date;
    updatedDate: Date;
    lockNumber: number;
    padlockKey: string;
    status: string;

    constructor() {
        this.id = '';
        this.place = new PlaceModel();
        this.productType = new ProductTypeInterface();
        this.createdDate = new Date();
        this.updatedDate = new Date();
        this.lockNumber = 0;
        this.padlockKey = '';
        this.status = '';
    }

}
