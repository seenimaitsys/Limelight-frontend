import { useState, useEffect } from "react";

function FindVideoAge(unixTimestamp) {
  // State to hold the age (in days, hours, and minutes)
  const [age, setAge] = useState({ days: 0, hours: 0, minutes: 0 });

  // Effect to calculate the age when the component mounts or when the unixTimestamp changes
  useEffect(() => {
    // Function to calculate the age from the given Unix timestamp
    function calculateAge() {
      // Convert the Unix timestamp to milliseconds (JavaScript Date uses milliseconds)
      const givenDate = new Date(unixTimestamp * 1000);
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
    unixTimestamp && calculateAge();
  }, [unixTimestamp]); // Run the effect whenever the unixTimestamp changes

  // Return the age object
  return age;
}

export default FindVideoAge;
