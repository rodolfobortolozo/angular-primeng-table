export interface User {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  gender: "Male" | "Female",
  ip_address: string
}