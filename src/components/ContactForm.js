import React from "react";
const ContactForm = () => {
  return (
    <form>
      <input type="text" placeholder="Name" required />
      <input type="email" placeholder="Email" required />
      <textarea placeholder="Message"></textarea>
      <button type="submit">Send</button>
    </form>
  );
};
export default ContactForm;