import { useRef } from "react";

export default function Contact() {
  let name = useRef(null);
  let email = useRef(null);
  let subject = useRef(null);
  let message = useRef(null);
  const send = async (ev) => {
    ev.preventDefault();
    const data = {
      name: name.current?.value,
      email: email.current?.value,
      subject: subject.current?.value,
      message: message.current?.value,
    };
    try {
      const res = await fetch(
  `http://${process.env.domain}/api/mail/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      window.confirm("We've received your message!");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="contact">
      <div className="container">
        <h3 className="title">Contact me</h3>
        <form className="contact-form" onSubmit={send}>
          <input
            type="text"
            name="name"
            placeholder="name"
            required
            ref={name}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            required
            ref={email}
          />
          <input
            type="text"
            name="subject"
            placeholder="subject"
            required
            ref={subject}
          />
          <textarea
            name="message"
            placeholder="message"
            required
            ref={message}
          ></textarea>
          <button type="submit">send</button>
        </form>
      </div>
    </section>
  );
}