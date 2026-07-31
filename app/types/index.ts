export type UserRole = 'USER' | 'OWNER' | 'ADMIN';

export type RentalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  isAvailable?: boolean;
  ownerId: string;
  owner?: User;
  createdAt?: string;
  updatedAt?: string;
}

export interface RentalRequest {
  id: string;
  userId: string;
  propertyId: string;
  status: RentalStatus;
  createdAt: string;
  updatedAt: string;
  user?: User;
  property?: Property;
}

export interface PaymentIntentResponse {
  clientSecret?: string;
  url?: string;
  message?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
}