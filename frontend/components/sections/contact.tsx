"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WP_ENDPOINT =
  "https://aisback.atulyaitsolutions.com/wp-json/ais/v1/lead";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
    order_timeframe: "",
    order_referer: "",
    form_id: 7,
  });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch( WP_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      console.log("[v0] WP response:", result, "status:", response.status);

      if (response.ok && result?.success) {
        setStatus("success");
        setFeedback("Thanks! Your message has been sent.");
        setForm({ name: "", email: "", phone: "", message: "",service: "",order_timeframe: "",order_referer:"",form_id: 7});
      } else {
        setStatus("error");
        setFeedback(
          result?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("[v0] Submit error:", error);
      setStatus("error");
      setFeedback("Network error. Please try again.");
    }
  };

  return (
    <>
    <div className="w-full max-w-3xl mx-auto px-4">
      <h2 className="pb-3 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
        Reach Out Today
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
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
    Full Name <span className="text-red-500">*</span>
  </label>

  <Input
    id="name"
    value={form.name}
    onChange={(e) => setForm({ ...form, name: e.target.value })}
    className="h-16 px-4"
  />
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
    Email Address <span className="text-red-500">*</span>
  </label>

  <Input
    id="email"
    type="email"
    value={form.email}
    onChange={(e) => setForm({ ...form, email: e.target.value })}
    className="h-16 px-4"
  />
</div>
        </div>

       <div className="relative mb-10">
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
    required
    value={form.service}
    onChange={(e) =>
      setForm({ ...form, service: e.target.value })
    }
    className="
      w-full
      h-16
      rounded-lg
      border
      border-border
      bg-background
      px-4
      text-base
      text-foreground
      focus:outline-none
      focus:ring-2
      focus:ring-primary/20
      focus:border-primary
    "
  >
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
</div>
        <div className="relative">
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

  <Textarea
    id="message"
    rows={12}
    value={form.message}
    onChange={(e) => setForm({ ...form, message: e.target.value })}
    className="pt-6 h-40 px-4 resize-none"
  />
</div>
<div className="relative">
  <label
    htmlFor="file"
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
    Project Brief
  </label>

  <input
    type="file"
    id="file"
    className="
      h-16
      w-full
      rounded-md
      border
      border-input
      bg-background
      px-4
      py-4
      text-sm
      file:border-0
      file:bg-transparent
      file:text-sm
      file:font-medium
    "
  />
</div>
 <div className="relative mb-10">
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
    required
    value={form.order_timeframe}
    onChange={(e) =>
      setForm({ ...form, order_timeframe: e.target.value })
    }
    className="
      w-full
      h-16
      rounded-lg
      border
      border-border
      bg-background
      px-4
      text-base
      text-foreground
      focus:outline-none
      focus:ring-2
      focus:ring-primary/20
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
   Referrer <span className="text-red-500">*</span>
  </label>

  <select
    id="order_referer"
    required
    value={form.order_referer}
    onChange={(e) =>
      setForm({ ...form, order_referer: e.target.value })
    }
    className="w-full h-16 rounded-lg border border-border bg-background px-4 text-base text-foreground focus:outline-none focus:ring-2
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
</div>
<div className="flex items-start gap-3">
  <input
    type="checkbox"
    id="consent"
    required
    className="mt-1 h-4 w-4"
  />

  <label
    htmlFor="consent"
    className="text-sm text-muted-foreground leading-relaxed"
  >
    I agree to be contacted by Atulya IT Solutions regarding my
    inquiry. I understand that my information will be used solely
    for communication purposes and will not be shared with third
    parties.
  </label>
</div>
<div className="flex items-start gap-3">
  <input
    type="checkbox"
    id="consent"
    required
    className="mt-1 h-4 w-4"
  />

  <label
    htmlFor="consent"
    className="text-sm text-muted-foreground leading-relaxed"
  >
    I want to receive news and service updates from Atulya IT Solutions.
  </label>
</div>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>

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
      </form>
    </div>
    </>
  );
}