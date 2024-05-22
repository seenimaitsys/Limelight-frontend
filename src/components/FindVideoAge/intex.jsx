import { useEffect, useState } from "react";

// Custom React hook to calculate age from a given date string
function FindVideoAge(dateString) {
  // Example date string const dateString = "May 19, 2024 at 6:42:17 PM GMT+5:30"; (firebase timestamb)
  // State to hold the age (in days, hours, and minutes)
  const [age, setAge] = useState({ days: 0, hours: 0, minutes: 0 });

  // Effect to calculate the age when the component mounts or when the dateString changes
  useEffect(() => {
    // Function to calculate the age from the given date string
    function calculateAge() {
      // Replace " at " with ", " to make the date string parseable
      const trimmedDateString = dateString.replace(" at ", ", ");
      // Parse the date string into a JavaScript Date object
      const givenDate = new Date(trimmedDateString);
      // Get the current date and time
      const currentDate = new Date();
      // Calculate the difference in milliseconds between the current date and the given date
      const diffInMs = currentDate - givenDate;
      // Convert the difference from milliseconds to days, hours, and minutes
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      const diffInHours = Math.floor(
        (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const diffInMinutes = Math.floor(
        (diffInMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      // Set the age state with the calculated values
      setAge({ days: diffInDays, hours: diffInHours, minutes: diffInMinutes });
    }

    // Call the calculateAge function
    dateString && calculateAge();
  }, [dateString]); // Run the effect whenever the dateString changes

  // Return the age object
  return age;
}

export default FindVideoAge;
