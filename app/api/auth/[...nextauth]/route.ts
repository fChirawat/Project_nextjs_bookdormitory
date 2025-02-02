import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        // ใส่โค้ดการตรวจสอบข้อมูลที่นี่
        return null; // ถ้าข้อมูลไม่ถูกต้อง
      }
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
