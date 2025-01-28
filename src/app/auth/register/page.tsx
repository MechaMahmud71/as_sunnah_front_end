"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { registerUser } from "./api";
import Cookies from "js-cookie";
import { Role } from "@/util/enum/role.enum";
import { verifyAuth } from "@/util/functions/authentication.function";

interface FormData {
  userName: string;
  email: string;
  password: string;
}

interface Errors {
  userName?: string;
  email?: string;
  password?: string;
}

export default function RegistrationPage() {
  const [formData, setFormData] = useState<FormData>({ userName: "", email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("role") === Role.USER) {
      const authStatus = verifyAuth("donation");
      if (authStatus) {
        redirect("/donation");
      }
    } else {
      const authStatus = verifyAuth("dashboard");
      if (authStatus) {
        redirect("/dashboard");
      }
    }
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateForm();
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.userName) newErrors.userName = "Username is required.";

    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters long.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const response = await registerUser(formData);

    if (!response.success) {
      setApiError(response.message as string);
      return;
    }

    Cookies.set("token", response?.data?.accessToken as string);
    Cookies.set("userId", (response?.data?.id as number).toString());
    Cookies.set("userName", response?.data?.userName as string);
    Cookies.set("role", response?.data?.role as string);

    router.push("/donation");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardContent>
          <h1 className="text-xl font-semibold text-center mb-4 text-black">Register</h1>

          {apiError && <div className="text-red-500 text-sm mb-4">{apiError}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="userName" className="block mb-1">
                Username
              </Label>
              <Input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className={errors.userName ? "border-red-500" : ""}
              />
              {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName}</p>}
            </div>

            <div className="mb-4">
              <Label htmlFor="email" className="block mb-1">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <Label htmlFor="password" className="block mb-1">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-black">
              Already have an account? <a href="/auth/login" className="text-blue-500">Login here</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
