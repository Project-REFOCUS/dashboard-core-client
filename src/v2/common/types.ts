import { GeographyEnum, GraphTypeEnum } from "./enum"

export interface Category {
    id: string,
    name: string
}

export interface Geography {
    id: string,
    name: string,
    type: GeographyEnum,
    shortName?: string
}

// export type GeoCategory = { 
//     geography: Geography, 
//     categories: Category[] 
// }

export type GeoFilterType = {
    type: GeographyEnum,
    subTypes: GeographyEnum[]
}

export interface DateMY {
    month: string,
    year: string
}

export interface DateDelta {
    x: DateMY,
    y: DateMY
}

export interface GraphResource {
    url: string,
    type: GraphTypeEnum
}