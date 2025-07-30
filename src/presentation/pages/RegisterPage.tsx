import { AuthLayout } from "@/presentation/layouts/AuthLayout";
import { RegisterForm } from "@/presentation/components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
