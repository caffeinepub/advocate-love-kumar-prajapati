import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    id: bigint;
    status: BookingStatus;
    name: string;
    createdAt: Time;
    email: string;
    practiceArea: PracticeArea;
    message: string;
    preferredDate: string;
    phone: string;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    confirmed = "confirmed"
}
export enum PracticeArea {
    civil = "civil",
    divorce = "divorce",
    criminal = "criminal",
    property = "property",
    corporate = "corporate",
    family = "family"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    bookAppointment(name: string, phone: string, email: string, practiceArea: PracticeArea, preferredDate: string, message: string): Promise<bigint>;
    getAllBookings(): Promise<Array<Booking>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getTotalBookings(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBookingStatus(id: bigint, status: BookingStatus): Promise<void>;
}
