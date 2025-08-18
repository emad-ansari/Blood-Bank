"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const bloodBanks = [
  {
    id: 1,
    name: "City Central Blood Bank",
    address: "1, Red Cross Road, Sansad Marg Area, New Delhi, Delhi",
    phone: "(555) 123-4567",
    distance: 0.8,
    bloodTypes: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
  },
  {
    id: 2,
    name: "Regional Medical Center Blood Bank",
    address: "234 test A, 2XYZc, demo bank Blood Bank Sikar, Pune, Maharashtra",
    phone: "(555) 987-6543",
    distance: 1.2,
    bloodTypes: ["A+", "B+", "O+", "O-"],
  },
  {
    id: 3,
    name: "Community Health Blood Bank",
    address: "234 test A, 2XYZc, demo bank Blood Bank Sikar, New Delhi, Delhi",
    phone: "(555) 246-8135",
    distance: 2.5,
    bloodTypes: ["A+", "A-", "O+", "O-", "AB+"],
  },
];

const BloodBankFinder = () => {
  const [location, setLocation] = useState("");
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  console.log(userLocation)
  const handleGetLocation = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation(position);
        setLoading(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error) => {
        setError("Unable to retrieve your location");
        setLoading(false);
      }
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Find Nearest Blood Bank
      </h1>

      <div className="flex gap-4 mb-6">
        <Input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={handleGetLocation}
          className="flex items-center gap-2"
          disabled={loading}
        >
          <Search className="h-4 w-4" />
          Use My Location
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {bloodBanks.map((bank) => (
          <Card key={bank.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{bank.name}</span>
                <span className="text-sm text-muted-foreground">
                  {bank.distance} miles away
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{bank.address}</p>
                <p className="text-sm text-muted-foreground">{bank.phone}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {bank.bloodTypes.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BloodBankFinder;
