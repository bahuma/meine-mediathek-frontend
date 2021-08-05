export interface SubscriptionModel {
  id: number;
  user: string;
  topic: string;
  channel?: string;
  duration?: number;
}
