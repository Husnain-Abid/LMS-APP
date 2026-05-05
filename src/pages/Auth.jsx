import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { useUserLoginMutation, useUserRegisterMutation } from "@/redux/features/apiSlice/authApi"

// Schemas
const signupSchema = z.object({
  name: z.string().min(3, "Name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
})

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
})

export function Auth() {

  // const navigate = useNavigate();
  const [registerUser, { isLoading: signupLoading }] = useUserRegisterMutation();
  const [loginUser, { isLoading: loginLoading }] = useUserLoginMutation();



  const [tab, setTab] = React.useState("signup")


  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  })

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSignup = async (data) => {
    try {
      const res = await registerUser(data).unwrap();;

      toast("Signup Successful", {
        description: "Account created successfully",
      });

      signupForm.reset(); // clear form
      setTab("login"); 
    } catch (error) {
      toast("Signup Failed", {
        description: error?.data?.message || "Something went wrong",
      });
    }
  };

  const onLogin = async (data) => {
    try {

      console.log("Login data:", data);

      const res = await loginUser(data).unwrap();;

      toast("Login Successful", {
        description: "Welcome back!",
      });

      loginForm.reset();
    } catch (error) {
      toast("Login Failed", {
        description: error?.data?.message || "Invalid credentials",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="w-full max-w-md">
        <Tabs value={tab} onValueChange={setTab}>

          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          {/* SIGNUP */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Enter your details to sign up
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={signupForm.handleSubmit(onSignup)}>
                  <FieldGroup className="space-y-4">

                    <Controller
                      name="name"
                      control={signupForm.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel>Name</FieldLabel>
                          <Input {...field} placeholder="John Doe" />
                          {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="email"
                      control={signupForm.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel>Email</FieldLabel>
                          <Input {...field} type="email" />
                          {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="password"
                      control={signupForm.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel>Password</FieldLabel>
                          <Input {...field} type="password" />
                          {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                  </FieldGroup>

                  <Button className="mt-6 w-full" disabled={signupLoading}>
                    {signupLoading ? "Signing up..." : "Sign Up"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LOGIN */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={loginForm.handleSubmit(onLogin)}>
                  <FieldGroup className="space-y-4">

                    <Controller
                      name="email"
                      control={loginForm.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel>Email</FieldLabel>
                          <Input {...field} type="email" />
                          {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="password"
                      control={loginForm.control}
                      render={({ field, fieldState }) => (
                        <Field>
                          <FieldLabel>Password</FieldLabel>
                          <Input {...field} type="password" />
                          {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                  </FieldGroup>


                  <Button className="mt-6 w-full" disabled={loginLoading}>
                    {loginLoading ? "Logging in..." : "Login"}
                  </Button>

                </form>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}