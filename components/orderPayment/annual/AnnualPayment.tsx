"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  Clock,
  ShieldCheck,
  Heart,
  CreditCard,
  ArrowUpRight,
  Calendar,
  CheckCircle,
  Receipt,
} from "lucide-react";
import Link from "next/link";
import { getPackageApi } from "@/components/api/packageApi";
import { useParams, useRouter } from "next/navigation";
import DaysOrderPage from "@/components/orderPayment/days/DaysPayment";
import ProgressBar from "../progressBar/ProgressBar";
import { jwtDecode } from "jwt-decode";
import { postPaymentApi } from "@/components/api/paymentApi";

export default function AnnualOrderPage() {
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const router = useRouter();
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const decode = jwtDecode(token);
        setUserId(decode?.sub ?? ""); // Use optional chaining and nullish coalescing
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setUserId("");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPackageApi();
      console.log(res);
    };

    fetchData();
  }, [id]);

  if (id === "2") {
    return <DaysOrderPage />;
  }

  const handlePayment = async () => {
    try {
      const response = await postPaymentApi(
        userId,
        Number(Array.isArray(id) ? id[0] : id) || 0,
        origin ?? "",
        2
      );
      router.push(`${response.data.paymentUrl}`);
    } catch (error) {
      console.error("Error when process payment:", error);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      {/* Special Offer Banner */}
      <div className="bg-gradient-to-r from-orange-200 to-orange-100 text-brown-800 rounded-lg mx-4 p-4 mb-6 shadow-md">
        <div className="flex items-center">
          <div className="mr-3 bg-orange-500 p-1 rounded-full">
            <Heart size={16} className="text-white" />
          </div>
          <p className="font-semibold">
            Additional offers, curated just for you
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 sm:px-6 pt-6 pb-3">
        <ProgressBar />
      </div>

      {/* Package Info */}
      <div className="px-4 sm:px-6 mb-6">
        <h2 className="text-xl font-bold mb-2">Forever Premium Package</h2>
        <div className="flex items-center">
          <ShieldCheck size={18} className="mr-2" />
          <p>Unlock exciting experiences and challenges</p>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="bg-white rounded-3xl mx-4 shadow-2xl overflow-hidden">
        {/* Card Header */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-1">
            Subscription Details
          </h3>
          <p className="text-gray-600 text-sm">
            Choose the plan that works for you
          </p>
        </div>

        {/* Subscription Options */}
        <div className="p-5">
          <div className="rounded-xl p-4 mb-6 border-2 border-[#1f6feb]">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-gray-800 font-bold text-lg">
                  Annual Plan
                </span>
                <div className="text-green-600 text-xs font-medium mt-1">
                  Save 20%
                </div>
              </div>
              <div className="text-right">
                <span className="text-green-600 font-bold text-xl">
                  US$7/mo
                </span>
                <div className="text-gray-500 text-xs">incl. VAT</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-800 font-medium">US$6/mo</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">VAT</span>
                <span className="text-gray-800 font-medium">US$1/mo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order Total</span>
                <span className="text-gray-800 font-medium">US$7/mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Free Trial Info */}
        <div className="px-5 pb-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="text-gray-800 font-bold mb-2 flex items-center">
              <Clock size={18} className="mr-2 text-blue-500" />
              Free trial terms
            </h4>
            <ul className="text-gray-700 text-sm space-y-2">
              <li className="flex items-start">
                <div className="h-5 w-1 bg-blue-400 rounded mr-2 mt-0.5"></div>
                <span>Billing automatically starts after free trial ends</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-1 bg-blue-400 rounded mr-2 mt-0.5"></div>
                <span>Cancel before Apr 08, 2026 to avoid getting billed</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-1 bg-blue-400 rounded mr-2 mt-0.5"></div>
                <span>We will remind you 5 days before trial ends</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Summary with Timeline */}
        <div className="px-5 pb-5">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-lg">
            {/* Header Section */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <Receipt className="mr-2 text-indigo-600" size={20} />
                Payment Summary
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Your subscription details and timeline
              </p>
            </div>

            {/* Status Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                <CheckCircle size={14} className="mr-1" />
                Payment Confirmed
              </span>
            </div>

            {/* Timeline UI */}
            <div className="flex flex-col space-y-6">
              {/* First timeline item */}
              <div className="flex items-start">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center h-8 w-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-md">
                    <Clock size={16} className="text-white" />
                  </div>
                  <div className="h-20 w-1 bg-gradient-to-b from-red-400 to-teal-400 mt-1"></div>
                </div>
                <div className="flex-1 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <CreditCard size={18} className="mr-2 text-red-600" />
                      <span className="text-red-600 font-bold">FROM</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 text-xs font-medium">
                        March 23, 2024
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600 text-sm">
                      Premium Subscription
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                          $7
                        </span>
                        <span className="text-gray-500 ml-1">/mo</span>
                      </div>
                      <div className="text-gray-500 text-xs">incl. VAT</div>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500">
                      <CheckCircle
                        size={12}
                        className="text-emerald-500 mr-1"
                      />
                      <span>Full access to all premium features</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <CheckCircle
                        size={12}
                        className="text-emerald-500 mr-1"
                      />
                      <span>Priority customer support</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second timeline item */}
              <div className="flex items-start">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center h-8 w-8 bg-gradient-to-r from-teal-500 to-green-500 rounded-full shadow-md">
                    <Calendar size={16} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-teal-600 font-bold">TO</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <span className="font-medium">March 23, 2025</span>
                      <Clock size={14} className="ml-1 text-gray-400" />
                    </div>
                  </div>
                  <div className="mt-2 text-gray-600 text-sm">
                    Your subscription will automatically renew
                  </div>

                  {/* Action button */}
                  <button className="mt-2 flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                    <span>Manage subscription</span>
                    <ArrowUpRight size={12} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Total Summary */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Total</span>
                <div className="text-right">
                  <span className="text-gray-900 font-bold">$7.00</span>
                  <div className="text-gray-500 text-xs">billed annually</div>
                </div>
              </div>

              {/* Payment method */}
              <div className="mt-3 flex items-center justify-between p-2 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-1 rounded mr-2">
                    <CreditCard size={14} className="text-blue-700" />
                  </div>
                  <span className="text-gray-600 text-xs">•••• 4242</span>
                </div>
                <span className="text-xs text-gray-500">
                  Next charge: April 23, 2024
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="bg-gray-50 p-5 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold sm:w-1/3 flex items-center justify-center order-2 sm:order-1">
              <ChevronLeft size={20} className="mr-1" />
              <span>
                <Link href={"/homepage"}>Back</Link>
              </span>
            </button>
            <button
              onClick={handlePayment}
              className="btn-for-app px-6 py-3 rounded-xl font-bold sm:w-2/3 shadow-md order-1 sm:order-2 mb-2 sm:mb-0"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Secure Payment Note */}
      <div className="text-center text-white text-sm mt-6 px-6 pb-6 flex items-center justify-center">
        <ShieldCheck size={16} className="mr-2" />
        <span>Secure and protected payment</span>
      </div>
    </div>
  );
}
