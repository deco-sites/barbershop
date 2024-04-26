import { ImageWidget as Image } from "apps/admin/widgets.ts";
import type { Section } from "deco/blocks/section.ts";
import type { ComponentChildren } from "preact";
import { clx } from "site/sdk/clx.ts";

import {
  BACKGROUND_POSITION,
  BACKGROUND_REPEAT,
  BACKGROUND_SIZE,
  BackgroundPosition,
  BackgroundSize,
  CONTENT_COLORS_BACKGROUND,
  SemanticColors,
  flex,
} from "../../constants.tsx";

export interface BackroundProps {
  backgroundImage?: Image;
  backgroundColor?: SemanticColors;
  backgroundRepeat?: "repeat" | "noRepeat";
  backgroundSize?: BackgroundSize;
  backgroundPosition?: BackgroundPosition;
}

/**
 * @title Flex
 */
export interface Props {
  customStyles?: string;
  children?: ComponentChildren | null;
  background?: BackroundProps;
  sectionChildrens?: Section[];
  isConatiner?: boolean;
  gap?: {
    /** @default 2 */
    mobile?: "1" | "2" | "4" | "8" | "12" | "16";
    /** @default 4 */
    desktop?: "1" | "2" | "4" | "8" | "12" | "16";
  };
  direction?: {
    /** @default Row */
    mobile?: "Row" | "Col";
    /** @default Row */
    desktop?: "Row" | "Col";
  };
  align?: {
    /** @default Center */
    mobile?: "Center" | "Start" | "End" | "Baseline" | "Stretch";
    /** @default Center */
    desktop?: "Center" | "Start" | "End" | "Baseline" | "Stretch";
  };
  justify?: {
    /** @default Center */
    mobile?: "Center" | "Start" | "End" | "Between";
    /** @default Center */
    desktop?: "Center" | "Start" | "End" | "Between";
  };
  wrap?: {
    /** @default Wrap */
    mobile?: "Wrap" | "Nowrap" | "Wrap-reverse";
    /** @default wrap */
    desktop?: "Wrap" | "Nowrap" | "Wrap-reverse";
  };
}

function Section({
  gap,
  direction,
  align,
  justify,
  wrap,
  children,
  sectionChildrens,
  background,
  isConatiner,
  customStyles,
}: Props) {
  return (
    <div
      class={clx(
        "w-full flex",
        gap?.mobile && flex.gap.mobile[gap.mobile],
        gap?.desktop && flex.gap.desktop[gap.desktop],
        direction?.mobile && flex.direction.mobile[direction.mobile],
        direction?.desktop && flex.direction.desktop[direction.desktop],
        align?.mobile && flex.align.mobile[align.mobile],
        align?.desktop && flex.align.desktop[align.desktop],
        justify?.mobile && flex.justify.mobile[justify.mobile],
        justify?.desktop && flex.justify.desktop[justify.desktop],
        wrap?.mobile && flex.wrap.mobile[wrap.mobile],
        wrap?.desktop && flex.wrap.desktop[wrap.desktop],
        isConatiner && "container",
        customStyles,
        CONTENT_COLORS_BACKGROUND[background?.backgroundColor ?? "base"],
        BACKGROUND_REPEAT[background?.backgroundRepeat ?? "noRepeat"],
        BACKGROUND_POSITION[background?.backgroundPosition ?? "left"],
        BACKGROUND_SIZE[background?.backgroundSize ?? "cover"]
      )}
      style={
        background?.backgroundImage
          ? { backgroundImage: `url(${background.backgroundImage})` }
          : {}
      }
    >
      {children}
      {sectionChildrens &&
        sectionChildrens.map((section) => (
          <section.Component {...section.props} />
        ))}
    </div>
  );
}

export default Section;