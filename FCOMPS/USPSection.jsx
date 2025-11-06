const USPSection = () => {
  const usps = [
    {
      icon: "\uD83D\uDD06",
      title: "Maximum Brand Visibility",
      description:
        "Maximize your D2C brand’s visibility online and attract attention from the right audience.",
    },
    {
      icon: "\ud83d\udce1",
      title: "Reach the Right Shoppers",
      description:
        "Connect with high-intent, engaged shoppers actively searching for unique, quality, and authentic products.",
    },
    {
      icon: "\ud83d\udd12",
      title: "Build Trust and Credibility",
      description:
        "Enhance credibility and trust by featuring alongside top-performing, well-recognised D2C brands online.",
    },
    {
      icon: "\ud83d\ude80",
      title: "Accelerate Brand Growth",
      description:
        "Drive growth, engagement, and conversions through curated listings and highly targeted brand exposure.",
    },
  ];

  return (
    <section className="usp-section">
      <div className="usp-grid">
        {usps.map((usp, index) => (
          <div className="usp-item" key={index}>
          <div className="icon">{usp.icon}</div>
            <h3 className="title">{usp.title}</h3>
            <p className="description">{usp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default USPSection;
