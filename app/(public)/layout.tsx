import React from "react";
import Navbar from "@/components/shared/navbar/page";
a import FooterSection from "@/components/shared/footer/page";

const PublicLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Navbar />

      {children}

      <FooterSection />
    </div>
  );
};

export default PublicLayout;