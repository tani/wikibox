import React from "react";

export default React.lazy(async () => {
  const response = await fetch("page/footer.html");
  const source = await response.text();
  const Footer = () => (
    <div className="container" dangerouslySetInnerHTML={{ __html: source }} />
  );
  Footer.displayName = "Footer";
  return { default: Footer };
});
