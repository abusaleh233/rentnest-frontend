import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
  email: z.string().email({ message: 'একটি সঠিক ইমেইল এড্রেস লিখুন' }),
  password: z.string().min(6, { message: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে' }),
});

export type LoginInput = z.infer<typeof loginSchema>;

// Register Schema
export const registerSchema = z.object({
  name: z.string().min(2, { message: 'নাম অন্তত ২ অক্ষরের হতে হবে' }),
  email: z.string().email({ message: 'একটি সঠিক ইমেইল এড্রেস লিখুন' }),
  password: z.string().min(6, { message: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে' }),
  role: z.enum(['USER', 'OWNER', 'ADMIN']),
});

export type RegisterInput = z.infer<typeof registerSchema>;

// Property Creation Schema
export const propertySchema = z.object({
  title: z.string().min(5, { message: 'টাইটেল অন্তত ৫ অক্ষরের হতে হবে' }),
  description: z.string().min(10, { message: 'বিবরণ অন্তত ১০ অক্ষরের হতে হবে' }),
  price: z.coerce.number().min(1000, { message: 'ভাড়া সর্বনিম্ন ১,০০০ টাকা হতে হবে' }),
  location: z.string().min(3, { message: 'লোকেশন লিখুন' }),
  imageUrl: z.string().url({ message: 'একটি সঠিক ইমেজের লিংক দিন' }),
});

export type PropertyInput = z.infer<typeof propertySchema>;

// Rental Request Schema
export const rentalRequestSchema = z.object({
  propertyId: z.string().min(1, { message: 'প্রপার্টি ID আবশ্যক' }),
  message: z.string().optional(),
});

export type RentalRequestInput = z.infer<typeof rentalRequestSchema>;