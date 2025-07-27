import { useEffect } from "react";

export default function Gallery() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      id="gallery"
      className="min-h-[calc(100vh-80px)] py-8 px-4 bg-white text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-10">
        Instagram
      </h2>
      <div className="mx-auto max-w-6xl">
        <iframe
        title="Instagram Gallery"
          src="//lightwidget.com/widgets/e25666d4b2eb5935a6ca32ee5957fbe7.html"
          scrolling="no"
          allowTransparency
          className="lightwidget-widget w-full rounded-xl"
          style={{
            border: "0",
            overflow: "hidden",
            minHeight: "80vh",
          }}
        ></iframe>
      </div>
    </section>
  );
}
