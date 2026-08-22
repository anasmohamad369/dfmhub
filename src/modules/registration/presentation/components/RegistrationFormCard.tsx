import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserCheck,
  User,
  Mail,
  Folder,
  Clock,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

import {
  registrationSchema,
} from "../../domain/validation/registrationSchema";
import { RegistrationFormValues } from "../../domain/entities/ProjectRegistration";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface RegistrationFormCardProps {
  onSubmit: (data: RegistrationFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export function RegistrationFormCard({
  onSubmit,
  isSubmitting,
}: RegistrationFormCardProps) {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      companyName: "",
      remarks: "",
    },
  });

  const handleFormSubmit = async (data: RegistrationFormValues) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "dfm_user_info",
          JSON.stringify({
            fullName: data.fullName,
            phone: data.phoneNumber,
            email: data.email,
            company: data.companyName,
          })
        );
      }
    } catch (e) {}
    await onSubmit(data);
    form.reset();
  };

  return (
    <div className="space-y-6">
      {/* Form Header */}
      <div className="flex items-start gap-4 pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
          <UserCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Register
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Share your requirements and we'll connect with you shortly.
          </p>
        </div>
      </div>

      {/* Official Shadcn Form Component */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Row 1: Full Name & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name Field */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      icon={<User className="w-4 h-4 text-slate-400" />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Phone Number</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <div className="bg-slate-100 dark:bg-[#040914] border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-3 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shrink-0">
                        <span>🇮🇳</span>
                        <span>+91</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <Input placeholder="98765 43210" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Email Address Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    icon={<Mail className="w-4 h-4 text-slate-400" />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Row 3: Company Name Field */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Company Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.g. Navi Mumbai Data Center Phase 2"
                    icon={<Folder className="w-4 h-4 text-slate-400" />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Row 4: Site Address / Remarks */}
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Address / Remarks</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide full site address or any specific structural requirements..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-amber-500/20 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>REGISTERING PROJECT...</span>
                </>
              ) : (
                <>
                  <span>REGISTER PROJECT</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>

          {/* Response Time Subtext */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-normal pt-2">
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Typical response within 24 hours</span>
          </div>
        </form>
      </Form>
    </div>
  );
}
