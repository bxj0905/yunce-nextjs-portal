import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "云策AI - 注册",
  description: "云策AI管理平台注册页面",
};

export default function SignUp() {
  return <SignUpForm />;
}
