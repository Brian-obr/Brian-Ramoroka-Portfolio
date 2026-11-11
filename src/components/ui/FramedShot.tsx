import { getImageProps } from "next/image";
import { IMAGE_QUALITY } from "@/lib/image-quality";

type Img = { src: string; width: number; height: number };

/**
 * A screenshot that fills its frame (object-cover, top-anchored). Art-directed with <picture>:
 * the tall capture from 1280px up, a top crop shaped like the stacked frame below it,
 * so the browser never downloads pixels the frame cannot show. Both go through next/image.
 */
export default function FramedShot({
  tall,
  stacked,
  alt,
  sizesTall,
  sizesStacked,
  eager,
  ...data
}: {
  tall: Img;
  stacked?: Img;
  alt: string;
  sizesTall: string;
  sizesStacked: string;
  eager?: boolean;
} & Record<`data-${string}`, boolean | string>) {
  const common = { alt, quality: IMAGE_QUALITY.screenshot, ...(eager ? { loading: "eager" as const } : {}) };
  const tallProps = getImageProps({ ...common, ...tall, sizes: sizesTall }).props;
  if (!stacked) {
    // eslint-disable-next-line @next/next/no-img-element -- optimised via next/image getImageProps (art direction)
    return <img {...tallProps} {...data} alt={alt} className="absolute inset-0 h-full w-full object-cover object-top" />;
  }
  const { props } = getImageProps({ ...common, ...stacked, sizes: sizesStacked });
  return (
    <picture>
      <source media="(min-width: 1280px)" srcSet={tallProps.srcSet} sizes={sizesTall} width={tall.width} height={tall.height} />
      <img {...props} {...data} alt={alt} className="absolute inset-0 h-full w-full object-cover object-top" />
    </picture>
  );
}
