import { IProduct, IProductPayload } from "@/types";
import httpClient from "./core";

const ENPOINT = "TransportProducts";

const getTransportList = (): Promise<IProduct[]> =>
  httpClient.get(`${ENPOINT}`).then((res) => res.data);

const getTransportById = (id: number): Promise<IProduct> =>
  httpClient.get(`${ENPOINT}/${id}`).then((res) => res.data);

const updateTransportById = (
  id: number,
  params: Partial<IProductPayload>
): Promise<IProduct> =>
  httpClient.patch(`${ENPOINT}/${id}`, params).then((res) => res.data);

const createTransport = (params: IProductPayload): Promise<IProduct> =>
  httpClient.post(`${ENPOINT}`, params).then((res) => res.data);

const deleteTransportById = (id: number) =>
  httpClient.delete(`${ENPOINT}/${id}`).then((res) => res.data);

export default {
  getTransportList,
  getTransportById,
  updateTransportById,
  createTransport,
  deleteTransportById,
};
