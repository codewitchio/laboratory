import type { Experiment } from "@/lib/experiments"
import Image from "next/image"
import Link from "next/link"
import { forwardRef } from "react"

// Add date formatting utility
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export const ExperimentCard = forwardRef<HTMLAnchorElement, Experiment>(
  function ExperimentCard(
    { slug, title, description, date, image, tags = [] },
    ref
  ) {
    return (
      <Link
        ref={ref}
        href={`/${slug}`}
        className="group card bg-base-100 p-4 transition-shadow hover:shadow-lg"
      >
        {/* Preview Image Container */}
        <div className="relative mb-4 aspect-square overflow-hidden rounded-box bg-base-200">
          {image ? (
            <figure>
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </figure>
          ) : (
            <figure className="h-full w-full bg-base-200" />
          )}

          {/* "New" Badge - show for experiments less than 7 days old */}
          {/* {Date.now() - date.getTime() < 7 * 24 * 60 * 60 * 1000 && (
          <div className="absolute top-3 right-3 badge badge-accent">NEW</div>
        )} */}
        </div>

        <div className="card-body p-0">
          {/* Title */}
          <h2 className="card-title text-xl font-light">{title}</h2>

          {/* Description */}
          <p className="-mt-1 mb-1 line-clamp-2 text-sm text-subtle">
            {description}
          </p>

          {/* Bottom Row */}
          <div className="card-actions justify-start">
            {tags.map((tag) => (
              <div key={tag} className="badge badge-ghost badge-sm">
                {tag}
              </div>
            ))}
            {/* Date */}
            <time className="ml-auto text-sm text-subtler">
              {formatDate(date)}
            </time>
          </div>
        </div>
      </Link>
    )
  }
)
