import React, { useState } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuthActions } from "@convex-dev/auth/react";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { signIn } = useAuthActions();
    const [submitting, setSubmitting] = useState(false);
    const [step, setStep] = useState<"signIn" | "linkSent">("signIn");
    const [email, setEmail] = useState<string>("");

    const handleSignIn = (provider: string) => {
        console.log(`Signing in with ${provider}`);
        void signIn(provider, { redirectTo: "/" });
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            {step === "signIn" ? (
                <>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Добро пожаловать!</CardTitle>
                            <CardDescription>
                                Войдите через Яндекс или Google
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Button variant="outline" className="w-full" onClick={() => handleSignIn("yandex")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                                            <path d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z" fill="#FC3F1D" />
                                            <path d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z" fill="#fff" />
                                        </svg>
                                        Войти с Яндекс ID
                                    </Button>
                                    <Button variant="outline" className="w-full" onClick={() => handleSignIn("google")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        Войти с Google ID
                                    </Button>
                                </div>
                                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                        или через почту
                                    </span>
                                </div>
                                <form onSubmit={(event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    setEmail(formData.get("email") as string);
                                    signIn("resend", formData)
                                        .then(() => {
                                            console.log(formData);
                                            console.log("Magic link is sent");
                                            setStep("linkSent");
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                            setSubmitting(false);
                                        });
                                }}>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className="w-full" disabled={submitting}>
                                            Отправить ссылку для входа
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                        Нажимая эти кнопки, вы принимаете <a href="#">Правила использования</a>{" "}
                        и <a href="#">Политику конфиденциальности</a>.
                    </div>
                </>
            ) : (
                <div>
                    <p>Проверьте почту <strong>{email}</strong> и нажмите в письме на кнопку &quot;Войти&quot;.</p>
                    <a href="#" onClick={() => setStep("signIn")} className="text-blue-500 hover:underline flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Вернуться к способам входа
                    </a>
                </div>
            )}
        </div >
    )
}
