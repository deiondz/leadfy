// app/scrape/page.js

import MaxWidthWrapper from "@/components/MaxWidthContainer";
import Navbar from "@/components/Navbar";
import FormComponent from "./FormComponent";

const ScrapePage = () => {
  return (
    <MaxWidthWrapper className="min-h-screen">
      <Navbar />
      <section className="h-full flex items-center justify-center w-full">
        <FormComponent />
      </section>
    </MaxWidthWrapper>
  );
};

export default ScrapePage;
