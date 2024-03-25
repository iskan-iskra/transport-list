import type { Product as IProduct, Attribute as IAttribute } from "./transport";

type IProductPayload = Omit<IProduct, "id">;

export type { IProduct, IAttribute, IProductPayload };
