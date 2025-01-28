"use client"

import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { verifyAuth } from '@/util/functions/authentication.function';
import { redirect } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { useEffect, useState } from 'react';
import { Donate } from './api';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../../components/ui/nav';

interface FormData {
  message: string;
  amount: string;
}
interface Errors {
  amount?: string;
}

export default function DonationPage() {

  const [formData, setFormData] = useState<FormData>({ message: "", amount: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState<string>("");

  useEffect(() => {
    const authStatus = verifyAuth("donation");
    if (!authStatus) {
      redirect("/auth/login");
    }
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.amount) newErrors.amount = "Amount is required.";
    else if (!/^[0-9]+$/.test(formData.amount)) newErrors.amount = "Amount should be a valid number";
    else if (Number(formData.amount) === 0) newErrors.amount = "Amount can not be 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const response = await Donate({ ...formData, amount: Number(formData.amount) });

    if (!response.success) {
      setApiError(response.message as string);
      return;
    }

    toast("Thanks for the donation");

    setFormData({ message: "", amount: "" });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <ToastContainer />
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardContent>
            <h1 className="text-xl font-semibold text-center mb-4 text-black">Donate</h1>

            {apiError && <div className="text-red-500 text-sm mb-4">{apiError}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="amount" className="block mb-1">
                  Amount
                </Label>
                <Input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className={errors.amount ? "border-red-500" : ""}
                />
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
              </div>

              <div className="mb-4">
                <Label htmlFor="Message" className="block mb-1">
                  Message
                </Label>
                <Input
                  type="text"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <Button type="submit" className="w-full">
                Donate
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
