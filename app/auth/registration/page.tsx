import { RegistrationForm } from "@/features/auth/ui/registration/registration-form";
import { I18nProvider } from "@/providers/i18n-provider";

export default function RegistrationPage() {
    return (
        <I18nProvider>
            <div className="h-screen mx-auto py-10 flex items-center justify-center overflow-hidden">
                <RegistrationForm />
            </div>
        </I18nProvider>
    );
}
