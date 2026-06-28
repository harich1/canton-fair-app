export type EventTemplateId =
  | "general"
  | "sourcing"
  | "consumer"
  | "industrial";

export type ItemStatus = "interested" | "review" | "source" | "hold" | "drop";

export interface FairEvent {
  id: string;
  ownerId?: string;
  name: string;
  templateId: EventTemplateId;
  country?: string;
  startsAt?: string;
  endsAt?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  revision: number;
  deviceId: string;
}

export interface FairItem {
  id: string;
  eventId: string;
  status: ItemStatus;
  title?: string;
  common: {
    price?: number;
    currency?: string;
    delivery?: string;
    packaging?: string;
    note?: string;
  };
  templateFields: Record<string, string | number | boolean>;
  mediaIds: string[];
  businessCardMediaIds: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  revision: number;
  deviceId: string;
}
