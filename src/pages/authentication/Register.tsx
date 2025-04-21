import { AuthForm } from "@/components/widgets/forms/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bliss-blue/50 to-lavender/30 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          <img src="/logo.png" alt="BlissTrack" className="h-20 w-20 mb-2" />
          <h1 className="text-3xl font-bold text-primary text-center">
            BlissTrack
          </h1>
          <p className="text-muted-foreground text-center mt-1">
            Oluwaseyi Bliss Beddings
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
