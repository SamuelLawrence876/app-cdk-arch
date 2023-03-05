// make enum list for member or non member type:
export enum MemberType {
  MEMBER = 'MEMBER',
  NON_MEMBER = 'NON_MEMBER',
}

export enum Customer {
  RETAIL = 'RETAIL',
  WHOLESALE = 'WHOLESALE',
}

export interface CustomerData {
  id: string;
  createdAt: string;
  name: string;
  status: MemberType;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  productType: string;
}

export interface Transaction {
  name: string;
  status: Customer;
  email: string;
  phone: string;
  products: Product[];
  total: number;
  review: number;
  discount: number;
  location: string;
  fraud: boolean;
  memberType: MemberType;
}

export interface Params {
  TableName: string;
  Item: Transaction;
}

export type EventBridgeEvent<TEventType, TEventData> = {
  version: string;
  id: string;
  'detail-type': TEventType;
  source: string;
  account: string;
  time: string;
  region: string;
  resources: string[];
  detail: TEventData;
};

export type creditCardCustomerTransactionEvent = Transaction;

export type CustomerAnalyticsEvent = EventBridgeEvent<
  'Transaction Event',
  creditCardCustomerTransactionEvent
>;
