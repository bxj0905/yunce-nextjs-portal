import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "云策AI - 登录",
  description: "云策AI管理平台登录页面",
};

export default function SignIn() {
  return <SignInForm />;
}
