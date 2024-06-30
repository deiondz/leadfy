import MaxWidthContainer from "@/components/MaxWidthContainer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <section className="dark:bg-darkBg inset-0  min-h-[100dvh] w-full  bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
      <MaxWidthContainer>
        <Navbar />
        <>
          {/* Hero */}
          <div className="relative overflow-hidden  ">
            {/* Gradients */}

            {/* End Gradients */}
            <div className="relative z-10">
              <div className="container py-10 lg:py-16">
                <div className="max-w-2xl text-center mx-auto">
                  <p className="">Elevate your projects</p>
                  {/* Title */}
                  <div className="mt-5 max-w-2xl">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                      Find leads, build relationships, and grow your revenue.
                    </h1>
                  </div>
                  {/* End Title */}
                  <div className="mt-5 max-w-3xl">
                    <p className="text-xl text-muted-foreground">
                      Start building for free, then add a site plan to go live.
                    </p>
                  </div>
                  {/* Buttons */}
                  <div className="mt-8 gap-3 flex justify-center">
                    <Link href={"/dashboard"}>
                      <Button size={"lg"}>Get started</Button>
                    </Link>

                    <Button size={"lg"} variant={"neutral"}>
                      Learn more
                    </Button>
                  </div>
                  {/* End Buttons */}
                </div>
              </div>
            </div>
          </div>
          {/* End Hero */}
        </>
      </MaxWidthContainer>
    </section>
  );
}
