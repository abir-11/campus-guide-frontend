import React from "react";
import Navbar from "@/components/shared/navbar/page";
import Footer from "@/components/shared/footer/page";

const PublicLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Navbar />

      {children}

      <Footer />
    </div>
  );
};

export default PublicLayout;