import { Factory } from "miragejs";
import type * as Types from "./types";

export const factories = {
  user: Factory.extend<Types.User>({
    id(i) {
      return `user_${i}`;
    },
    name(i) {
      return `Usuário ${i}`;
    },
    email(i) {
      return `usuario${i}@exemplo.com`;
    },
    phone() {
      return "+244 900 000 000";
    },
    password() {
      return "hashed_password_123";
    },
    avatar() {
      return null;
    },
    createdAt() {
      return new Date().toISOString();
    },
    preferences() {
      return {
        language: "pt",
        currency: "AOA",
        notifications: true,
      };
    },
  }),

  booking: Factory.extend<Partial<Types.Booking>>({
    id(i) {
      const year = new Date().getFullYear();
      return `BK-${year}-${String(i).padStart(6, "0")}`;
    },
    checkIn() {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      return date.toISOString();
    },
    checkOut() {
      const date = new Date();
      date.setDate(date.getDate() + 11);
      return date.toISOString();
    },
    guests() {
      return 2;
    },
    guestDetails() {
      return {
        name: "Nicasio Silva",
        email: "nicasio@email.com",
        phone: "+244 900 000 000",
      };
    },
    paymentMethod() {
      return "card";
    },
    pricing() {
      return {
        subtotal: 720000,
        serviceFee: 5000,
        tax: 72000,
        total: 797000,
      };
    },
    status() {
      return "Confirmed";
    },
    confirmationCode(i) {
      const year = new Date().getFullYear();
      return `BK-${year}-${String(i).padStart(6, "0")}`;
    },
    qrCode() {
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZmYiLz48L3N2Zz4=";
    },
    createdAt() {
      return new Date().toISOString();
    },
  }),

  review: Factory.extend<Partial<Types.Review>>({
    id(i) {
      return i;
    },
    rating() {
      return 5;
    },
    date() {
      return new Date().toISOString();
    },
    comment() {
      return "Estadia absolutamente incrível! O hotel superou todas as expectativas.";
    },
    helpful() {
      return 15;
    },
    images() {
      return [];
    },
    author() {
      return {
        name: "Ana Silva",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      };
    },
  }),

  favorite: Factory.extend<Partial<Types.Favorite>>({
    id(i) {
      return i;
    },
    addedAt() {
      return new Date().toISOString();
    },
  }),

  notification: Factory.extend<Partial<Types.Notification>>({
    id(i) {
      return i;
    },
    type() {
      return "booking_confirmed";
    },
    title() {
      return "Reserva Confirmada";
    },
    message() {
      return "Sua reserva foi confirmada com sucesso";
    },
    read() {
      return false;
    },
    createdAt() {
      return new Date().toISOString();
    },
    data() {
      return {};
    },
  }),

  payment: Factory.extend<Partial<Types.Payment>>({
    id(i) {
      return `PAY-${String(i).padStart(6, "0")}`;
    },
    amount() {
      return 797000;
    },
    currency() {
      return "AOA";
    },
    method() {
      return "card";
    },
    status() {
      return "success";
    },
    transactionId(i) {
      const year = new Date().getFullYear();
      return `TXN-${year}-${String(i).padStart(6, "0")}`;
    },
    createdAt() {
      return new Date().toISOString();
    },
  }),

  authToken: Factory.extend<Partial<Types.AuthToken>>({
    token() {
      return `jwt_${Math.random().toString(36).substring(2)}`;
    },
    refreshToken() {
      return `refresh_${Math.random().toString(36).substring(2)}`;
    },
    expiresAt() {
      const date = new Date();
      date.setHours(date.getHours() + 24);
      return date.toISOString();
    },
  }),
};
