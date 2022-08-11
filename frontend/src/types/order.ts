export enum OrderState {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETE = "COMPLETE",
}

export type Order = {
  id?: string;
  state: OrderState;
  customer: string;
  employee?: string;
  items: string;
  createdAt?: Date;
  updatedAt?: Date;
};
