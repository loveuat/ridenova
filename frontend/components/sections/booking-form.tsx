'use client'
import { Input } from "@/components/ui/input";
import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Car } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Turnstile } from "@marsidev/react-turnstile";
import { CONFIG } from "@/lib/config";
import LocalizedLink  from "@/components/sections/localizedlink";
import { useTranslations } from "next-intl";
const siteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
type Status = "idle" | "loading" | "success" | "error";
export const bookingSchema = z
  .object({
    tripType: z
      .string()
      .min(1, "Please select a service"),

    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters"),

    pickupLocation: z
      .string()
      .trim()
      .min(2, "Please enter pickup location"),

    dropLocation: z
      .string()
      .trim()
      .min(2, "Please enter drop location"),

    pickupDate: z
      .string()
      .min(1, "Please select pickup date")
      .refine(
        (date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const selectedDate = new Date(date);
          selectedDate.setHours(0, 0, 0, 0);

          return selectedDate >= today;
        },
        {
          message: "Pickup date cannot be in the past",
        }
      ),

    email: z
      .string()
      .trim()
      .email("Invalid email address"),

    phone: z
      .string()
      .trim()
      .min(10, "Phone number is too short"),
  })
  .refine(
    (data) =>
      data.pickupLocation.trim().toLowerCase() !==
      data.dropLocation.trim().toLowerCase(),
    {
      message: "Pickup and Drop locations cannot be the same.",
      path: ["dropLocation"], // Error drop field ke niche show hoga
    }
  );
type BookingForm = z.infer<typeof bookingSchema>;

export function BookingForm() {
const bookingt = useTranslations("BookingForm");
const [pickupLoading, setPickupLoading] = useState(false);
const [dropLoading, setDropLoading] = useState(false);
const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([])
const [dropSuggestions, setDropSuggestions] = useState<any[]>([])
const [tripTypes, setTripTypes] = useState<any[]>([])
const [tripTypesLoading, setTripTypesLoading] = useState(true)
const [errors, setErrors] = useState<
  Partial<Record<keyof BookingForm, string>>
>({});
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    pickupTime: '',
    tripType: '',
    passengers: '1',
    carType: 'XL6',
    name: '',
    phone: '',
    email: '',
    specialInstructions: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const searchLocations = async (
  query: string,
  type: 'pickup' | 'drop'
) => {
  if (query.length < 2) {
    type === 'pickup'
      ? setPickupSuggestions([])
      : setDropSuggestions([])

    return
  }
  
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_TMG_API_URL}/api/v1/locations/search?q=${encodeURIComponent(query)}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch locations')
    }

    const data = await response.json()

    if (type === "pickup") {
  setPickupSuggestions(data);

  setErrors((prev) => ({
    ...prev,
    pickupLocation:
      data.length === 0 && query.trim().length >= 2
        ? "Not serving this location."
        : "",
  }));
} else {
  setDropSuggestions(data);

  setErrors((prev) => ({
    ...prev,
    dropLocation:
      data.length === 0 && query.trim().length >= 2
        ? "Not serving this location."
        : "",
  }));
}
  } catch (error) {
    console.error('Location search error:', error)
  }
}
  useEffect(() => {
  const fetchTripTypes = async () => {
    try {
      const triptypes = await fetch(
        `${process.env.NEXT_PUBLIC_TMG_API_URL}/api/v1/trip-types`
      )

      if (!triptypes.ok) {
        throw new Error('Failed to fetch trip types')
      }

      const data = await triptypes.json()

      setTripTypes(data)
    } catch (error) {
      console.error('Trip types error:', error)
    } finally {
      setTripTypesLoading(false)
    }
  }

  fetchTripTypes()
}, [])
const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
const validateLocations = (
  pickup?: string,
  drop?: string
) => {
  const pickupValue = (pickup ?? "").trim().toLowerCase();
  const dropValue = (drop ?? "").trim().toLowerCase();

  const same =
    pickupValue !== "" &&
    dropValue !== "" &&
    pickupValue === dropValue;

  setErrors((prev) => ({
    ...prev,
    pickupLocation: same
      ? "Pickup and Drop locations cannot be the same."
      : "",
    dropLocation: same
      ? "Pickup and Drop locations cannot be the same."
      : "",
  }));
};
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setFeedback("");
  setErrors({});

  const validation = bookingSchema.safeParse(formData);
console.log("FORM DATA", formData);
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
      tripType: fieldErrors.tripType?.[0],
      name: fieldErrors.name?.[0],
      email: fieldErrors.email?.[0],
      phone: fieldErrors.phone?.[0],
      //subject: fieldErrors.phone?.[0],
      //message: fieldErrors.message?.[0],
      pickupLocation: fieldErrors.pickupLocation?.[0],
      dropLocation: fieldErrors.dropLocation?.[0],
      pickupDate: fieldErrors.pickupDate?.[0],
      //order_timeframe: fieldErrors.order_timeframe?.[0],
      //order_referer: fieldErrors.order_referer?.[0],
      //consent: fieldErrors.consent?.[0],
      //news_checkbox:fieldErrors.news_checkbox?.[0],
    });

    return;
  }
  if (!captchaToken) {
  setFeedback("Please verify captcha");
  return;
}
  setStatus("loading");

  try {

  const payload = {
  ...formData,
  pickupTime: formData.pickupTime || null,
  specialInstructions: formData.specialInstructions || null,
  turnstile_token: captchaToken,
};

const contacts = await fetch(
  `${process.env.NEXT_PUBLIC_TMG_API_URL}/api/v1/bookings`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }
);

    const result = await contacts.json();

    if (contacts.ok && result.success) {
      setStatus("success");

      setFeedback(
        "Thank you! Your enquiry has been submitted successfully."
      );

      setFormData({
        tripType: "",
        //carType: "",
        pickupLocation: "",
        dropLocation: "",
        pickupDate: "",
        pickupTime: "",
        //passengers: "",
        name: "",
        email: "",
        phone: "",
        //subject: "",
        specialInstructions: "",
        //service: "",
        //order_timeframe: "",
        //order_referer: "",
        //consent: false,
        //news_checkbox:false,
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
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Trip Type Start */}
      <div className="relative">
  <label
    htmlFor="tripType"
    className="
      absolute
      -top-2.5
      left-3
      bg-primary
      px-1
      text-xs
      font-medium
      text-background
      z-10
      rounded-md
    "
  >
   {bookingt("triptype")} <span className="text-red-500">*</span>
  </label>

  {/* Select Wrapper */}
  <div
    className={cn(
      "rounded-md border bg-primary transition-colors dark:border-black/25",
      errors.tripType
        ? "!border-red-500 focus-within:!border-red-500 focus-within:!ring-0"
        : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring"
    )}
  >
    <select
      id="tripType"
      name="tripType"
      value={formData.tripType}
      disabled={tripTypesLoading}
      onChange={(e) => {
  const value = e.target.value;
  setFormData({
    ...formData,
    tripType: value,
  });

  if (!value) {
    setErrors({
      ...errors,
      tripType: "Please choose trip type",
    });
  } else {
    setErrors({
      ...errors,
      tripType: "",
    });
  }
}}
      className="
        h-16
        w-full
        rounded-md
        border-0
        bg-background
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
       <option value="">
          {tripTypesLoading ? 'Loading trip types...' : 'Select Trip Type'}
        </option>

        {tripTypes.map((tripType) => (
          <option
            key={tripType.id}
            value={tripType.slug}
          >
            {tripType.name}
          </option>
        ))}
    </select>
  </div>

  {/* Error Message */}
  {errors.tripType && (
    <p className="mt-1 text-sm text-red-500">
      {errors.tripType}
    </p>
  )}
</div>
{/* Trip Type End */}
                {/* Car Type Start */}
               {/* <div className="relative">
  <label
    htmlFor="carType"
    className="
      absolute
      -top-2.5
      left-3
      bg-primary
      px-1
      text-xs
      font-medium
      text-background
      z-10
      rounded-md
    "
  >
    Car Type <span className="text-red-500">*</span>
  </label>
    <div
    className={cn(
      "rounded-md border-border-background bg-primary transition-colors dark:border-black/25",
      errors.carType
        ? "!border-red-500 focus-within:!border-red-500 focus-within:!ring-0"
        : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring"
    )}
  >
    <select
      id="carType"
      value={formData.carType}
      onChange={(e) => {
  const value = e.target.value;

  setForm({
    ...form,
    carType: value,
  });

  // if (!value) {
  //   setErrors({
  //     ...errors,
  //     subject: "Please choose car type",
  //   });
  // } else {
  //   setErrors({
  //     ...errors,
  //     carType: "",
  //   });
  // }
}}
      className="
        h-16
        w-full
        rounded-md
        border-0
        bg-background
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
        Choose Car Type
      </option>

      <option value="Economy" 
      className="bg-background text-foreground" >
        Economy
      </option>

      <option value="Sedan" 
      className="bg-background text-foreground">
       Sedan
      </option>

      <option value="SUV" className="bg-background text-foreground">
        SUV
      </option>

      <option value="Innova" className="bg-background text-foreground">
        Innova
      </option>

      <option value="Ertiga" className="bg-background text-foreground">
        Ertiga
      </option>

      <option value="XL6" className="bg-background text-foreground">
       Xl6
      </option>

      <option value="Other" className="bg-background text-foreground">
        Other
      </option>
    </select>
  </div>

 
  {errors.subject && (
    <p className="mt-1 text-sm text-red-500">
      {errors.subject}
    </p>
  )}
</div>*/}
{/* Car Type End */}
 {/* Passengers */}
      <div className="relative">
  <label
    htmlFor="carType"
    className="
      absolute
      -top-2.5
      left-3
      bg-primary
      px-1
      text-xs
      font-medium
      text-background
      z-10
      rounded-md
    "
  >
    {bookingt("passengers")} <span className="text-red-500">*</span>
  </label>

  {/* Select Wrapper */}
  <div
    className={cn(
      "rounded-md border-border-background bg-primary transition-colors dark:border-black/25",
      errors.carType
        ? "!border-red-500 focus-within:!border-red-500 focus-within:!ring-0"
        : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring"
    )}
  >
    <select
      id="passengers"
      value={formData.passengers}
      onChange={(e) => {
  const value = e.target.value;

  setFormData({
    ...formData,
    passengers: value,
  });

  if (!value) {
    setErrors({
      ...errors,
      passengers: "Please choose car type",
    });
  } else {
    setErrors({
      ...errors,
      passengers: "",
    });
  }
}}
      className="
        h-16
        w-full
        rounded-md
        border-0
        bg-background
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
    <option value="">Select Passengers</option>

  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
    <option  className="bg-background text-foreground" key={num} value={num}>
      {num} Passenger{num > 1 ? 's' : ''}
    </option>
  ))}
      
      </select>
  </div>

  {/* Error Message */}
  {errors.passengers && (
    <p className="mt-1 text-sm text-red-500">
      {errors.passengers}
    </p>
  )}
</div>
      
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Pickup Location Start */}
     <div className="relative">
  <label
    htmlFor="pickupLocation"
    className="
      absolute
      -top-2.5
      left-3
      z-10
      rounded-md
      bg-primary
      px-1
      text-xs
      font-medium
      text-background
    "
  >
    {bookingt("pickuplocation")} <span className="text-red-500">*</span>
  </label>

  <div
    className={cn(
      "relative rounded-md border bg-background transition-colors dark:border-white/25",
      errors.pickupLocation
        ? "!border-red-500 focus-within:!border-red-500 focus-within:!ring-0"
        : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring"
    )}
  >
    <Input
      id="pickupLocation"
      type="text"
      name="pickupLocation"
      value={formData.pickupLocation}
onChange={(e) => {
  const value = e.target.value;

  searchLocations(value, "pickup");

  setFormData((prev) => {
    const updated = {
      ...prev,
      pickupLocation: value,
    };

    validateLocations(
      updated.pickupLocation,
      updated.dropLocation
    );

    return updated;
  });

  setErrors((prev) => ({
    ...prev,
    pickupLocation: value.trim()
      ? ""
      : "Pickup Location is required",
  }));
}}

      placeholder="Enter pickup location"
      required
      autoComplete="off"
      className="
        h-16
        w-full
        border-0
        px-4
        pr-12
        shadow-none
        focus:border-0
        focus:outline-none
        focus:ring-0
        focus-visible:ring-0
        focus-visible:ring-offset-0
      "
    />

    {/* Loader inside input */}
    {pickupLoading && (
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    )}

    {/* Suggestions */}
    {pickupSuggestions.length > 0 && (
      <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border border-border bg-background shadow-lg">
        {pickupSuggestions.map((location) => (
          <button
            key={location.id}
            type="button"
            onClick={() => {
  setFormData((prev) => {
    const updated = {
      ...prev,
      pickupLocation: location.name,
    };

    validateLocations(
      updated.pickupLocation,
      updated.dropLocation
    );

    return updated;
  });

  setPickupSuggestions([]);
}}
            className="w-full px-4 py-3 text-left hover:bg-muted"
          >
            <div className="font-medium">
              {location.name}
            </div>

            <div className="text-sm text-muted-foreground">
              {location.district}, {location.state}
            </div>
          </button>
        ))}
      </div>
    )}
  </div>

  {errors.pickupLocation && (
  <p className="mt-1 text-sm text-red-500">
    {errors.pickupLocation}{" "}
    {errors.pickupLocation === "Not serving this location." && (
      <LocalizedLink
        href={`/suggest-location?location=${encodeURIComponent(formData.pickupLocation)}`}
        className="hidden underline"
      >
        Suggest location
      </LocalizedLink>
    )}
  </p>
)}
</div>
{/* Pickup Location Ens */}
{/* Drop Location Start */}
        <div className="relative">
  <label
    htmlFor="dropLocation"
    className="
      absolute
      -top-2.5
      left-3
      bg-primary
      px-1
      text-xs
      font-medium
      text-background
      z-10
      rounded-md
    "
  >
    {bookingt("droplocation")} <span className="text-red-500">*</span>
  </label>

  <div
    className={cn(
      "rounded-md border bg-background transition-colors dark:border-white/25",
      errors.dropLocation
        ? "!border-red-500 focus-within:!border-red-500 focus-within:!ring-0"
        : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring"
    )}
  >
    <Input
      id="dropLocation"
      type="text"
      name="dropLocation"
      value={formData.dropLocation || ""}
      onChange={(e) => {
  const value = e.target.value;

  searchLocations(value, "drop");

  setFormData((prev) => {
    const updated = {
      ...prev,
      dropLocation: value,
    };

    validateLocations(
      updated.pickupLocation,
      updated.dropLocation
    );

    return updated;
  });

  setErrors((prev) => ({
    ...prev,
    dropLocation: value.trim()
      ? ""
      : "Drop Location is required",
  }));
}}

      placeholder="Enter drop location"
      
      autoComplete="off"
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

    {/* Drop Location Suggestions */}
    {dropSuggestions.length > 0 && (
      <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-lg">
        {dropSuggestions.map((location) => (
          <button
            key={location.id}
            type="button"
           onClick={() => {
  setFormData((prev) => {
    const updated = {
      ...prev,
      dropLocation: location.name,
    };

    validateLocations(
      updated.pickupLocation,
      updated.dropLocation
    );

    return updated;
  });

  setDropSuggestions([]);
}}
            className="w-full text-left px-4 py-3 hover:bg-muted"
          >
            <div className="font-medium">
              {location.name}
            </div>

            <div className="text-sm text-muted-foreground">
              {location.district}, {location.state}
            </div>
          </button>
        ))}
      </div>
    )}
  </div>

  {/* Drop Location Error */}
  {errors.dropLocation && (
  <p className="mt-1 text-sm text-red-500">
    {errors.dropLocation}{" "}
    {errors.dropLocation === "Not serving this location." && (
       <LocalizedLink
        href={`/suggest-location?location=${encodeURIComponent(formData.dropLoaction)}`}
        className="underline"
      >
        Suggest location
      </LocalizedLink>
    )}
  </p>
)}
</div>
        {/*Drop Location End*/}
      </div>
      {/*Second Row End*/}
      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
  <label
    htmlFor="pickupDate"
    className="
      absolute
      -top-2.5
      left-3
      bg-primary
      px-1
      text-xs
      font-medium
      text-background
      z-10
      rounded-md
    "
  >
   {bookingt("pickupdate")} <span className="text-red-500">*</span>
  </label>

  <div
    className={cn(
      "rounded-md border bg-background transition-colors dark:border-white/25",
      errors.pickupDate
        ? "!border-red-500 focus-within:!border-red-500 focus-within:!ring-0"
        : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring"
    )}
  >
    <Input
    id="pickupDate"
      type="date"
      value={formData.pickupDate}
      min={new Date().toISOString().split("T")[0]}
      onChange={(e) => {
  const value = e.target.value;

  setFormData({
    ...formData,
    pickupDate: value,
  });

  if (!value.trim()) {
    setErrors({
      ...errors,
      pickupDate: "Pickup Location is required",
    });
  } else {
    setErrors({
      ...errors,
      pickupDate: "",
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

  {errors.pickupDate && (
    <p className="mt-1 text-sm text-red-500">
      {errors.pickupDate}
    </p>
  )}
</div>
          <div className="relative">
  <label
    htmlFor="pickupTime"
    className="
      absolute
      -top-2.5
      left-3
      bg-primary
      px-1
      text-xs
      font-medium
      text-background
      z-10
      rounded-md
    "
  >
   {bookingt("pickuptime")} <span className="text-red-500">*</span>
  </label>

  <div
    className={cn(
      "rounded-md border bg-background transition-colors dark:border-white/25",
      errors.pickupTime
        ? "!border-red-500 focus-within:!border-red-500 focus-within:!ring-0"
        : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring"
    )}
  >
    <Input
    id="pickupTime"
      type="time"
      value={formData.pickupTime}
      onChange={(e) => {
  const value = e.target.value;

  setFormData({
    ...formData,
    pickupTime: value,
  });

  if (!value.trim()) {
    setErrors({
      ...errors,
      pickupTime: "Pickup Time is required",
    });
  } else {
    setErrors({
      ...errors,
      pickupTime: "",
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
  <p className="mt-1 px-1 text-xs text-background">
  <strong>Note: </strong>24-hour format: <span className="font-medium">17:00</span> means 5:00 PM Evening
</p>
  {errors.pickupTime && (
    <p className="mt-1 text-sm text-red-500">
      {errors.pickupTime}
    </p>
  )}
</div>
             </div>

     
      {/* Contact Details */}
      <div className="pt-4 border-t border-border">
        <h3 className="font-semibold text-background text-center mb-6">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
  <label
    htmlFor="name"
    className="
      absolute
      -top-2.5
      left-3
      bg-primary
      px-1
      text-xs
      font-medium
      text-background
      z-10
      rounded-md
    "
  >
    {bookingt("fullname")} <span className="text-red-500">*</span>
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
      value={formData.name}
      onChange={(e) => {
  const value = e.target.value;

  setFormData({
    ...formData,
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
      placeholder="Enter Full Name"
    />
  </div>

  {errors.name && (
    <p className="mt-1 text-sm text-red-500">
      {errors.name}
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
      bg-primary
      px-1
      text-xs
      font-mediue
      text-background
      z-10
      rounded-md
    "
  >
    {bookingt("phonenumber")} <span className="text-red-500">*</span>
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
  value={formData.phone}
  onChange={(e) => {
    let value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    // If first digit is 1-5, don't allow it
    if (value.length > 0 && !/^[6-9]/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
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

    // Less than 10 digits
    if (value.length < 10) {
      setErrors({
        ...errors,
        phone: "",
      });
      return;
    }

    // Invalid 10-digit Indian number
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
  <p className="mt-2 text-xs text-background">
    💬 {bookingt("whatsappnumber")}
  </p>

  {/* Validation Error */}
  {errors.phone && (
    <p className="mt-1 text-sm text-red-500">
      {errors.phone}
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
      bg-primary
      px-1
      text-xs
      font-medium
      text-background
      z-10
      rounded-md
    "
  >
    {bookingt("email")} <span className="text-red-500">*</span>
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
    value={formData.email}
    onChange={(e) => {
  const value = e.target.value;

  setFormData({
    ...formData,
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
      placeholder="Enter Email address"
  />
  </div>
  {errors.email && (
  <p className="text-red-500 text-sm mt-1">
    {errors.email}
  </p>
)}
</div>
        </div>
      </div>

      {/* Special Instructions */}
      <div className="relative mb-10">
  <label
    htmlFor="specialInstructions"
    className="
      absolute
      -top-2.5
      left-3
      bg-primary
      px-1
      text-xs
      font-medium
      text-background
      z-10
      rounded-md
    "
  >
    {bookingt("instructions")}
  </label>

  {/* Textarea Wrapper */}
  <div
    className={cn(
      "rounded-md border bg-background transition-colors dark:border-white/25",
      errors.specialInstructions
        ? "!border-red-500 focus-within:!border-red-500 focus-within:!ring-0"
        : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring"
    )}
  >
    <Textarea
      id="message"
      rows={4}
      value={formData.specialInstructions}
      onChange={(e) => {
  const value = e.target.value;

  setFormData({
    ...formData,
    specialInstructions: value,
  });

  if (!value.trim()) {
    setErrors({
      ...errors,
      specialInstructions: "Please tell us about your project",
    });
  } else {
    setErrors({
      ...errors,
      specialInstructions: "",
    });
  }
}}
      className="
        h-20
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
  {errors.specialInstructions && (
    <p className="mt-1 text-sm text-red-500">
      {errors.specialInstructions}
    </p>
  )}
</div>

             
<div className="flex justify-center">
                <div className="relative inline-flex">
                  {/* Pulse glow */}
                  <span className="absolute
      inset-0
      rounded-xl
      bg-primary
      opacity-60
      animate-booking-pulse
      dark:bg-white" />

                  {/* Actual Button */}
                  <Button
  type="submit"
  disabled={status === "loading"}
   className="
       group
      relative
      h-14
      min-w-[220px]
      px-10
      text-lg
      font-semibold
      bg-white
      text-black
      shadow-lg
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-xl
      hover:bg-white
      dark:bg-black
      dark:text-white
      dark:hover:bg-black
    "
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

      {bookingt("pleasewait")}
    </>
  ) : (
    bookingt('booknow')
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
  )
}
