"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Turnstile } from "@marsidev/react-turnstile";
import { CONFIG } from "@/lib/config";
import { Car, ArrowRight, Clock3, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useTranslations } from "next-intl";
const siteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
type Status = "idle" | "loading" | "success" | "error";
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

   subject: z
  .string()
  .min(1, "Please select a service"),
   
  phone: z
    .string()
    .trim()
    .min(10, "Phone number is too short"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters"),

// service: z
//   .string()
//   .min(1, "Please select a service"),

  consent: z.literal(true, {
  errorMap: () => ({
    message:
      "You must accept the Privacy Policy to continue"
  })
}),

  order_timeframe: z.string().optional(),

  order_referer: z.string().optional(),
  news_checkbox:  z.boolean().optional()
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    //service: "",
    //order_timeframe: "",
    //order_referer: "",
    consent: false,
    news_checkbox:false,
    //form_id: 7,
  });

  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<
  Partial<Record<keyof ContactForm, string>>
>({});
const [captchaToken, setCaptchaToken] = useState("");
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setFeedback("");
  setErrors({});

  const validation = contactSchema.safeParse(form);
console.log("FORM DATA", form);
console.log("VALIDATION", validation);
  if (!validation.success) {
    const firstErrorField = Object.keys(
  validation.error.flatten().fieldErrors
)[0];

const element = document.getElementById(firstErrorField);
if (element) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  element.focus();
}
    const fieldErrors =
      validation.error.flatten().fieldErrors;

    setErrors({
      name: fieldErrors.name?.[0],
      email: fieldErrors.email?.[0],
      phone: fieldErrors.phone?.[0],
      subject: fieldErrors.phone?.[0],
      message: fieldErrors.message?.[0],
      //service: fieldErrors.service?.[0],
      //order_timeframe: fieldErrors.order_timeframe?.[0],
      //order_referer: fieldErrors.order_referer?.[0],
      consent: fieldErrors.consent?.[0],
      news_checkbox:fieldErrors.news_checkbox?.[0],
    });

    return;
  }
  if (!captchaToken) {
  setFeedback("Please verify captcha");
  return;
}
  setStatus("loading");

  try {


    // const payload = {
    //   form_id: 9,
    //   captcha: captchaToken,
    //   fields: {
    //     "name-1": form.name,
    //     "email-1": form.email,
    //     "phone-1": form.phone,
    //     "textarea-1": form.message,
    //     "select-1": form.service,
    //     "select-2": form.order_timeframe,
    //     "select-3": form.order_referer,
    //     "consent-1": form.consent,
    //     "checkbox-1": form.news_checkbox
    //   }
    // };

    const contacts = await fetch(
  `${process.env.NEXT_PUBLIC_TMG_API_URL}/api/v1/contacts`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...form,
      turnstile_token: captchaToken,
    }),
  }
);

    const result = await contacts.json();

    if (contacts.ok && result.success) {
      setStatus("success");

      setFeedback(
        "Thank you! Your enquiry has been submitted successfully."
      );

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        //service: "",
        //order_timeframe: "",
        //order_referer: "",
        consent: false,
        news_checkbox:false,
      });

      setErrors({});
    } else {
      setStatus("error");

      setFeedback(
        result.message ||
          "Unable to submit your enquiry."
      );
    }
  } catch (error) {
    console.error(error);

    setStatus("error");

    setFeedback(
      "Network error. Please try again later."
    );
  }
};

  return (
    <>
    <div className="mx-auto mb-20 flex w-full max-w-7xl flex-col gap-4 px-4 md:flex-row">
     <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10 shadow-lg">

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

            <div className="relative">

              <div className="mb-8">
                <h2 className="pb-3 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
          {t("titleBefore")}{" "}
          <span className="text-gradient-orange">
            {t("highlight")}
          </span>{" "}
          {t("titleAfter")}</h2>

                <p className="mt-2 text-muted-foreground">
                 {t("description")}
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>

                  <div>
                    <h4 className="font-semibold">
                        {t("locationTitle")}
                    </h4>

                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t("location")}
                      <br />
                       {t("country")}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>

                  <div>
                    <h4 className="font-semibold">
                       {t("emailTitle")}
                    </h4>

                    <a
                      href="mailto:hello@tripmitrago.com"
                      className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      tripmitra@tripmitrago.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>

                  <div>
                    <h4 className="font-semibold">
                     {t("phoneTitle")}
                    </h4>

                    <a
                      href="tel:+919876543210"
                      className="mt-1 inline-flex pr-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      +91 87705 70764,
                    </a>
                     <a
                      href="tel:+917415837509"
                      className="mt-1 inline-flex text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      +91 74158 37509
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock3 className="h-6 w-6" />
                  </div>

                  <div>
                    <h4 className="font-semibold">
                       {t("hoursTitle")}
                    </h4>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("hours")}
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom CTA */}
              <div className="mt-10 rounded-xl border border-border bg-background/50 p-5">
                <p className="text-sm text-muted-foreground">
                 {t("bottomText")}
                </p>
              </div>

            </div>
          </div>
      <div className="border border-border dark:border-white/25 p-6 shadow-lg rounded-2xl">
      <h2 className="pb-3 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
        Thinking for a <span className="text-gradient-orange"> Trip? </span> </h2>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="relative">
  <label
    htmlFor="name"
    className="
      absolute
      -top-2.5
      left-3
      bg-background
      px-1
      text-xs
      font-medium
      text-muted-foreground
      z-10
    "
  >
     {t("fullName")} <span className="text-red-500">*</span>
  </label>

  <div
    className={cn(
      "rounded-md border bg-background transition-colors dark:border-white/25",
      errors.name
        ? "!border-red-500 focus-within:!border-red-500 focus-within:!ring-0"
        : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring"
    )}
  >
    <Input
      id="name"
      value={form.name}
      onChange={(e) => {
  const value = e.target.value;

  setForm({
    ...form,
    name: value,
  });

  if (!value.trim()) {
    setErrors({
      ...errors,
      name: "Full name is required",
    });
  } else {
    setErrors({
      ...errors,
      name: "",
    });
  }
}}
      className="
        h-16
        w-full
        border-0
        px-4
        shadow-none
        focus:border-0
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        focus-visible:ring-offset-0
      "
    />
  </div>

  {errors.name && (
    <p className="mt-1 text-sm text-red-500">
      {errors.name}
    </p>
  )}
</div>

         <div className="relative">
  <label
    htmlFor="email"
   className="
      absolute
      -top-2.5
      left-3
      bg-background
      px-1
      text-xs
      font-medium
      text-muted-foreground
      z-10
    "
  >
    {t("email")}<span className="text-red-500">*</span>
  </label>
    <div
    className={cn(
      "rounded-md border bg-background transition-colors",
      errors.email
        ? "border-red-500 focus-within:border-red-500 focus-within:ring-0"
        : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring"
    )}
  >
  <Input
    id="email"
    type="email"
    value={form.email}
    onChange={(e) => {
  const value = e.target.value;

  setForm({
    ...form,
    email: value,
  });

  if (!value.trim()) {
    setErrors({
      ...errors,
      email: "Email is required",
    });
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  ) {
    setErrors({
      ...errors,
      email: "Enter a valid email address",
    });
  } else {
    setErrors({
      ...errors,
      email: "",
    });
  }
}}
    className="
        h-16
        w-full
        border-0
        px-4
        shadow-none
        focus:border-0
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        focus-visible:ring-offset-0
      "
  />
  </div>
  {errors.email && (
  <p className="text-red-500 text-sm mt-1">
    {errors.email}
  </p>
)}
</div>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
           <div className="relative mb-10">
  <label
    htmlFor="subject"
    className="
      absolute
      -top-2.5
      left-3
      bg-background
      px-1
      text-xs
      font-medium
      text-muted-foreground
      z-10
    "
  >
    Choose Subject <span className="text-red-500">*</span>
  </label>

  {/* Select Wrapper */}
  <div
    className={cn(
      "rounded-md border bg-background transition-colors dark:border-white/25",
      errors.subject
        ? "!border-red-500 focus-within:!border-red-500 focus-within:!ring-0"
        : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring"
    )}
  >
    <select
      id="subject"
      value={form.subject}
      onChange={(e) => {
  const value = e.target.value;

  setForm({
    ...form,
    subject: value,
  });

  if (!value) {
    setErrors({
      ...errors,
      subject: "Please choose a subject",
    });
  } else {
    setErrors({
      ...errors,
      subject: "",
    });
  }
}}
      className="
        h-16
        w-full
        rounded-md
        border-0
        bg-transparent
        px-4
        text-sm
        text-foreground
        outline-none
        shadow-none
        focus:border-0
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        focus-visible:ring-offset-0
      "
    >
      <option value=""
      className="bg-background text-foreground" >
        Choose Subject
      </option>

      <option value="outstation-trip" 
      className="bg-background text-foreground" >
        Outstation Trip
      </option>

      <option value="local-city-travel" 
      className="bg-background text-foreground">
        Local City Travel
      </option>

      <option value="airport-transfer" className="bg-background text-foreground">
        Airport Transfer
      </option>

      <option value="wedding-car" className="bg-background text-foreground">
        Wedding Car
      </option>

      <option value="exam-center-drop" className="bg-background text-foreground">
        Exam Center Drop
      </option>

      <option value="custom-trip" className="bg-background text-foreground">
        Custom Trip / Tour
      </option>

      <option value="other" className="bg-background text-foreground">
        Other
      </option>
    </select>
  </div>

  {/* Error Message */}
  {errors.subject && (
    <p className="mt-1 text-sm text-red-500">
      {errors.subject}
    </p>
  )}
</div>

       <div className="relative">
  {/* Floating Label */}
  <label
    htmlFor="phone"
    className="
      absolute
      -top-2.5
      left-3
      bg-background
      px-1
      text-xs
      font-medium
      text-muted-foreground
      z-10
    "
  >
   {t("email")} <span className="text-red-500">*</span>
  </label>

  <div
    className={cn(
      "flex h-16 rounded-md border bg-background overflow-hidden transition-colors dark:border-white/25",
      errors.phone
        ? "!border-red-500 focus-within:!border-red-500 focus-within:!ring-0"
        : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring"
    )}
  >
    {/* India Flag + Country Code */}
    <div className="flex items-center gap-2 px-4 border-r border-input bg-muted/30">
      {/* Indian Flag */}
      <span
        className="
          inline-block
          relative
          h-5
          w-7
          rounded-sm
          border
          border-border
          bg-[linear-gradient(to_bottom,#FF9933_0%,#FF9933_33%,white_33%,white_66%,#138808_66%,#138808_100%)]
        "
        aria-label="India"
      >
        {/* Ashoka Chakra */}
        <span className="absolute inset-0 flex items-center justify-center text-[8px] text-blue-900">
          ✦
        </span>
      </span>

      {/* Country Code */}
      <span className="text-sm font-medium text-muted-foreground">
        +91
      </span>
    </div>

    {/* Phone Input */}
    <Input
      id="phone"
      type="tel"
      inputMode="numeric"
      maxLength={10}
      placeholder="98765 43210"
      value={form.phone}
     onChange={(e) => {
  const value = e.target.value
    .replace(/\D/g, "")
    .slice(0, 10);

  setForm({
    ...form,
    phone: value,
  });

  // Empty
  if (!value) {
    setErrors({
      ...errors,
      phone: "Phone number is required",
    });
    return;
  }

  // Invalid Indian number
  if (!/^[6-9]\d{9}$/.test(value)) {
    setErrors({
      ...errors,
      phone: "Enter a valid 10-digit Indian mobile number",
    });
    return;
  }

  // Valid number
  setErrors({
    ...errors,
    phone: "",
  });
}}
      className="
        h-full
        flex-1
        border-0
        rounded-none
        px-4
        shadow-none
        focus:border-0
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        focus-visible:ring-offset-0
      "
    />
  </div>

  {/* WhatsApp Hint */}
  <p className="mt-2 text-xs text-muted-foreground">
    💬 Preferably enter your WhatsApp number so we can contact you easily.
  </p>

  {/* Validation Error */}
  {errors.phone && (
    <p className="mt-1 text-sm text-red-500">
      {errors.phone}
    </p>
  )}
</div>
        </div>


       {/*<div className="relative mb-10">
  <label
    htmlFor="service"
    className="
      absolute
      -top-2.5
      left-3
      bg-background
      px-1
      text-xs
      font-medium
      text-muted-foreground
      z-10
    "
  >
    Choose Services <span className="text-red-500">*</span>
  </label>

  <select
    id="service"
    value={form.service}
    onChange={(e) =>
      setForm({ ...form, service: e.target.value })
    }
    className={cn(
    "w-full h-16 rounded-lg border border-border bg-background px-4 text-xs text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
    errors.service &&
      "border-red-500 focus-visible:ring-red-500"
  )}>
    <option value="">
      Select Choose Services
    </option>

    <option value="website-development">
      Website Development
    </option>

    <option value="wordpress-development">
      WordPress Development
    </option>

    <option value="nextjs-development">
      Next.js Development
    </option>

    <option value="seo">
      SEO Services
    </option>

    <option value="ecommerce">
      eCommerce Development
    </option>

    <option value="ai">
      AI Automation
    </option>

    <option value="other">
      Other
    </option>
  </select>
  {errors.service && (
  <p className="text-red-500 text-sm mt-1">
    {errors.service}
  </p>
)}
</div>*/}
        <div className="relative mb-10">
  <label
    htmlFor="message"
    className="
      absolute
      -top-2.5
      left-3
      bg-background
      px-1
      text-xs
      font-medium
      text-muted-foreground
      z-10
    "
  >
    Tell Us About Your Project
  </label>

  {/* Textarea Wrapper */}
  <div
    className={cn(
      "rounded-md border bg-background transition-colors dark:border-white/25",
      errors.message
        ? "!border-red-500 focus-within:!border-red-500 focus-within:!ring-0"
        : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring"
    )}
  >
    <Textarea
      id="message"
      rows={12}
      value={form.message}
      onChange={(e) => {
  const value = e.target.value;

  setForm({
    ...form,
    message: value,
  });

  if (!value.trim()) {
    setErrors({
      ...errors,
      message: "Please tell us about your project",
    });
  } else {
    setErrors({
      ...errors,
      message: "",
    });
  }
}}
      className="
        h-40
        w-full
        resize-none
        border-0
        px-4
        pt-6
        text-xs
        text-foreground
        shadow-none
        focus:border-0
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        focus-visible:ring-offset-0
      "
    />
  </div>

  {/* Error */}
  {errors.message && (
    <p className="mt-1 text-sm text-red-500">
      {errors.message}
    </p>
  )}
</div>

 {/*<div className="relative mb-10">
  <label
    htmlFor="order_timeframe"
    className="
      absolute
      -top-2.5
      left-3
      bg-background
      px-1
      text-xs
      font-medium
      text-muted-foreground
      z-10
    "
  >
    Project Time Frame <span className="text-red-500">*</span>
  </label>

  <select
    id="order_timeframe"
    value={form.order_timeframe}
    onChange={(e) =>
      setForm({ ...form, order_timeframe: e.target.value })
    }
    className="w-full h-16 rounded-lg border border-border bg-background px-4 text-xs text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20
   focus:border-primary
    "
  >
    <option value="">
      How time sensitive is your project?
    </option>

    <option value="asap">
     I need it ASAP
    </option>

    <option value="i=am-not-in-rush">
      I’m not in a rush
    </option>
  </select>
</div>
 <div className="relative mb-10">
  <label
    htmlFor="order_referer"
    className="absolute -top-2.5 left-3 bg-background px-1 text-xs font-medium text-muted-foreground z-10 ">
   Referrer <span className="text-red-500">*</span>
  </label>

  <select
    id="order_referer"
    value={form.order_referer}
    onChange={(e) =>
      setForm({ ...form, order_referer: e.target.value })
    }
    className="w-full h-16 rounded-lg border border-border bg-background px-4 text-xs text-muted-foreground focus:outline-none focus:ring-2
focus:ring-primary/20 focus:border-primary ">
    <option value="">
      How did you hear about us?
    </option>

    <option value="Paid Advertising">
     Paid Advertising
    </option>

    <option value="Organic Search">
      Organic Search
    </option>
    <option value="Returning Customer">
      Returning Customer
    </option>
    <option value="Referral">
      Referral
    </option>
    <option value="Other">
      Other
    </option>
    
  </select>
</div>*/}
<div className="space-y-2">
  <div className="flex items-start gap-3 rounded-md">
    <input
      type="checkbox"
      id="consent"
      checked={form.consent}
      onChange={(e) => {
        const isChecked = e.target.checked;

        setForm((prev) => ({
          ...prev,
          consent: isChecked,
        }));

        setErrors((prev) => ({
          ...prev,
          consent: isChecked
            ? ""
            : "Please accept the terms before submitting",
        }));
      }}
      className="mt-1 h-4 w-4"
    />

    <label
      htmlFor="consent"
      className="flex-1 text-sm leading-relaxed text-muted-foreground"
    >
     {t('consent')}
    </label>
  </div>

  {errors.consent && (
    <p className="text-sm text-red-500">
      {errors.consent}
    </p>
  )}
</div>
<div className="flex items-start gap-3">
  <input
    type="checkbox"
     checked={form.news_checkbox}
  onChange={(e) =>
    setForm({
      ...form,
      news_checkbox: e.target.checked,
    })
  }
    className="mt-1 h-4 w-4"
  />

  <label
    htmlFor="news_checkbox"
    className="text-sm text-muted-foreground leading-relaxed"
  >
    {t('newsletter')}
  </label>
</div>

        
<div className="flex justify-center">
                <div className="relative inline-flex">
                  {/* Pulse glow */}
                  <span className="absolute inset-0 rounded-xl animate-cta-pulse bg-primary" />

                  {/* Actual Button */}
                  <Button
  type="submit"
  disabled={status === "loading"}
  className="group relative h-14 px-10 min-w-[220px] text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
>
  {status === "loading" ? (
    <>
      <svg
        className="mr-2 h-4 w-4 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>

      Please wait...
    </>
  ) : (
    "Submit"
  )}
  <Car className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
</Button>
                  
                </div>
              </div>
        {feedback && (
          <p
            role="status"
            className={
              status === "success"
                ? "text-sm text-green-600"
                : "text-sm text-red-600"
            }
          >
            {feedback}
          </p>
        )}
        <Turnstile
  siteKey={CONFIG.turnstileSiteKey!}
  onSuccess={(token) => setCaptchaToken(token)}
/>
      </form>
      </div>
      
    </div>
    </>
  );
}

