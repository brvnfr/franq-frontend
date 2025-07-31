import { AuthLayout } from "@/presentation/layouts/AuthLayout";
import { LoginForm } from "@/presentation/components/LoginForm";


export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
