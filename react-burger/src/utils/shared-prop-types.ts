export interface IApiIngredient {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
}

export interface IIngredient extends IApiIngredient {
    identity: string
}

export interface ITab {
    id: number,
    name: string,
    type: string,
    ref: React.RefObject<HTMLDivElement>
}

export interface ILocationState {
    from?: string
}

export interface ILocation {
    pathname: string;
    state?: ILocationState;
    search: string;
    hash: string;
    key: string;
}

export interface IUserDataModel {
    email: string,
    password: string,
    name: string
}

export interface ILoginModel {
    email: string,
    password: string
}

export interface IResetPasswordModel {
    password: string,
    token: string
}

export type TUser = {
    email: string,
    name: string
};

export interface IOrderData {
    ingredients: string[],
    _id: string,
    status: string,
    name: string,
    number: number,
    createdAt: string,
    updatedAt: string
}

export interface IOrders {
    success: boolean,
    orders: IOrderData[],
    total: number,
    totalToday: number
}

export interface IOrderDetails {
    _id: string,
    ingredients: string[],
    owner: string,
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number,
    __v: number
}