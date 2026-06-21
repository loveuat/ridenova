'use client'

import { useState } from 'react'
import { Calendar, MapPin, Users, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BookingForm() {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    pickupTime: '',
    tripType: 'oneway',
    passengers: '1',
    carType: 'economy',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Booking submitted:', formData)
    alert('Booking request submitted! Our team will contact you shortly.')
    // Reset form
    setFormData({
      pickupLocation: '',
      dropLocation: '',
      pickupDate: '',
      pickupTime: '',
      tripType: 'oneway',
      passengers: '1',
      carType: 'economy',
      name: '',
      phone: '',
      email: '',
      specialInstructions: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Trip Type & Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Trip Type</label>
          <select
            name="tripType"
            value={formData.tripType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-foreground text-backgroud"
          >
            <option value="oneway">One Way</option>
            <option value="roundtrip">Round Trip</option>
            <option value="airport">Airport Transfer</option>
            <option value="hourly">Hourly Rental</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Car Type</label>
          <select
            name="carType"
            value={formData.carType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-foreground text-background">
            <option value="economy">Economy</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="innova">Innova</option>
            <option value="ertiga">Ertiga</option>
            <option value="tempo">Tempo Traveller</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Pickup Location
          </label>
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            placeholder="Enter pickup location"
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Drop Location
          </label>
          <input
            type="text"
            name="dropLocation"
            value={formData.dropLocation}
            onChange={handleChange}
            placeholder="Enter drop location"
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Pickup Date
          </label>
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Pickup Time</label>
          <input
            type="time"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {/* Passengers */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Number of Passengers
        </label>
        <select
          name="passengers"
          value={formData.passengers}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {/* Contact Details */}
      <div className="pt-4 border-t border-border">
        <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </div>

      {/* Special Instructions */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Special Instructions</label>
        <textarea
          name="specialInstructions"
          value={formData.specialInstructions}
          onChange={handleChange}
          placeholder="Any special requests or instructions..."
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-cta hover:bg-cta/90 text-cta-foreground py-3 text-lg font-semibold"
      >
        Book Now
      </Button>
    </form>
  )
}
