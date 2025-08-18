"use client";

// import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { user, isLoaded } = useUser(); // `isLoaded` ensures user data is fully loaded

  // useEffect(() => {
  //   const registerDonor = async () => {
  //     if (!user || !user.id || !user.primaryEmailAddress) {
  //       console.error("User data is not available:", user);
  //       return;
  //     }

  //     console.log("Sending data to API:", {
  //       clerkId: user.id,
  //       email: user.primaryEmailAddress.emailAddress,
  //     });

  //     try {
  //       const response = await fetch("/api/donors/register", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           clerkId: user.id,
  //           email: user.primaryEmailAddress.emailAddress,
  //         }),
  //       });

  //       const responseBody = await response.json();
  //       console.log("API Response:", responseBody);

  //       if (!response.ok) {
  //         throw new Error(responseBody.error || "Failed to register donor");
  //       }
  //     } catch (error) {
  //       console.error("Error registering donor:", error);
  //     }
  //   };

  //   if (isLoaded) {
  //     registerDonor();
  //   }
  // }, [user, isLoaded]);

  return (
    <main>
      this is dashboard page
    </main>
  );
}
