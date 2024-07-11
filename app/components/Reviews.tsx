"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

import ScrollPointers from "./ScrollPointers";
import Heading from "./Heading";
import Star from "./symbols/Star.svg";

import { getReviews } from "../api/programs-fetching";
import { ReviewsData } from "@/interfaces/interfaces";

export default function Reviews() {
  const scrollReviewsContainerRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<ReviewsData | undefined>();

  useEffect(() => {
    getReviews().then(setReviews).catch(console.error);
  }, []);

  return (
    <section id="reviews" className="mt-40 mb-20">
      <Heading>Відгуки</Heading>
      <div
        className="flex items-stretch md:items-start flex-row overflow-x-auto space-x-6 scroll-smooth mt-10 gap-5 md:gap-10"
        ref={scrollReviewsContainerRef}
      >
        {reviews?.review.map((review, index) => (
          <div
            className="flex flex-col md:flex-row p-3 gap-6 w-full min-w-fit md:min-w-[500px]"
            key={index}
          >
            {/* <Image
              src={
                review.reviewCustomerImage.node.sourceUrl || ReviewPlaceholder
              }
              alt={review.reviewCustomerImage.node.altText || "Review Image"}
              width={180}
              height={180}
              className="w-auto h-auto md:w-[180px] md:h-[180px]"
            /> */}
            <div className="flex flex-col gap-2 font-montserrat uppercase">
              <div className="font-medium text-2xl">
                {review.reviewCustomerName}
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-7">
                <div className="md:text-lg font-light">
                  {review.reviewCustomerProgram}
                </div>
                <div className="flex flex-row">
                  {[...Array(review.reviewCustomerRate)].map((_, i) => (
                    <Image
                      key={i}
                      src={Star}
                      alt="Review Star"
                      width={20}
                      height={20}
                      className="mr-1"
                    />
                  ))}
                </div>
              </div>
              <p className="lowercase mt-4 text-sm">
                {review.reviewCustomerReview}
              </p>
            </div>
          </div>
        ))}
      </div>
      <ScrollPointers containerRef={scrollReviewsContainerRef} />
    </section>
  );
}
