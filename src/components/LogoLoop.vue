<script setup lang="ts">
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type CSSProperties,
} from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { LogoItem } from "../types/logo";
import "./LogoLoop.css";

const ANIMATION_CONFIG = { smoothTau: 0.25, minCopies: 2, copyHeadroom: 2 };
type Direction = "left" | "right" | "up" | "down";

const props = withDefaults(
  defineProps<{
    logos: LogoItem[];
    speed?: number;
    direction?: Direction;
    width?: number | string;
    logoHeight?: number;
    gap?: number;
    pauseOnHover?: boolean;
    hoverSpeed?: number;
    fadeOut?: boolean;
    fadeOutColor?: string;
    scaleOnHover?: boolean;
    ariaLabel?: string;
    className?: string;
  }>(),
  {
    speed: 120,
    direction: "left",
    width: "100%",
    logoHeight: 28,
    gap: 32,
    fadeOut: false,
    scaleOnHover: false,
    ariaLabel: "Partner logos",
    className: "",
  },
);

const containerElement = ref<HTMLDivElement | null>(null);
const trackElement = ref<HTMLDivElement | null>(null);
const sequenceWidth = ref(0);
const sequenceHeight = ref(0);
const copyCount = ref(ANIMATION_CONFIG.minCopies);
const isHovered = ref(false);
let resizeObserver: ResizeObserver | null = null;
let animationFrame: number | null = null;
let lastTimestamp: number | null = null;
let offset = 0;
let velocity = 0;
let imageCleanup: (() => void) | null = null;

const isVertical = computed(() =>
  props.direction === "up" || props.direction === "down",
);

const effectiveHoverSpeed = computed(() => {
  if (props.hoverSpeed !== undefined) return props.hoverSpeed;
  if (props.pauseOnHover === false) return undefined;
  return 0;
});

const targetVelocity = computed(() => {
  const magnitude = Math.abs(props.speed);
  const directionMultiplier = isVertical.value
    ? props.direction === "up" ? 1 : -1
    : props.direction === "left" ? 1 : -1;
  const speedMultiplier = props.speed < 0 ? -1 : 1;

  return magnitude * directionMultiplier * speedMultiplier;
});

const toCssLength = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

const rootClassName = computed(() => [
  "logoloop",
  isVertical.value ? "logoloop--vertical" : "logoloop--horizontal",
  props.fadeOut ? "logoloop--fade" : "",
  props.scaleOnHover ? "logoloop--scale-hover" : "",
  props.className,
].filter(Boolean));

const containerStyle = computed<CSSProperties>(() => ({
  width: isVertical.value && toCssLength(props.width) === "100%"
    ? undefined
    : toCssLength(props.width),
  "--logoloop-gap": `${props.gap}px`,
  "--logoloop-logoHeight": `${props.logoHeight}px`,
  ...(props.fadeOutColor
    ? { "--logoloop-fadeColor": props.fadeOutColor }
    : {}),
} as CSSProperties));

const itemAriaLabel = (item: LogoItem) =>
  "icon" in item
    ? item.ariaLabel ?? item.title
    : item.alt ?? item.title;

const updateDimensions = () => {
  const container = containerElement.value;
  const sequence = container?.querySelector<HTMLElement>(".logoloop__list");
  if (!container || !sequence) return;

  const sequenceRect = sequence.getBoundingClientRect();

  if (isVertical.value) {
    const parentHeight = container.parentElement?.clientHeight ?? 0;
    if (parentHeight > 0) container.style.height = `${Math.ceil(parentHeight)}px`;

    if (sequenceRect.height > 0) {
      sequenceHeight.value = Math.ceil(sequenceRect.height);
      const viewport = container.clientHeight || parentHeight || sequenceRect.height;
      copyCount.value = Math.max(
        ANIMATION_CONFIG.minCopies,
        Math.ceil(viewport / sequenceRect.height) + ANIMATION_CONFIG.copyHeadroom,
      );
    }
    return;
  }

  if (sequenceRect.width > 0) {
    sequenceWidth.value = Math.ceil(sequenceRect.width);
    copyCount.value = Math.max(
      ANIMATION_CONFIG.minCopies,
      Math.ceil(container.clientWidth / sequenceRect.width) + ANIMATION_CONFIG.copyHeadroom,
    );
  }
};

const observeDimensions = () => {
  resizeObserver?.disconnect();
  resizeObserver = null;

  const container = containerElement.value;
  const sequence = container?.querySelector<HTMLElement>(".logoloop__list");
  if (!container || !sequence) return;

  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);
    resizeObserver.observe(sequence);
  } else {
    window.addEventListener("resize", updateDimensions);
  }

  imageCleanup?.();
  const images = Array.from(sequence.querySelectorAll("img"));
  const handleImageLoad = () => updateDimensions();
  images.forEach((image) => {
    if (!image.complete) {
      image.addEventListener("load", handleImageLoad);
      image.addEventListener("error", handleImageLoad);
    }
  });
  imageCleanup = () => images.forEach((image) => {
    image.removeEventListener("load", handleImageLoad);
    image.removeEventListener("error", handleImageLoad);
  });

  updateDimensions();
};

const animate = (timestamp: number) => {
  const track = trackElement.value;
  const sequenceSize = isVertical.value
    ? sequenceHeight.value
    : sequenceWidth.value;

  if (lastTimestamp === null) lastTimestamp = timestamp;
  const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  const target = isHovered.value && effectiveHoverSpeed.value !== undefined
    ? effectiveHoverSpeed.value
    : targetVelocity.value;
  const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.smoothTau);
  velocity += (target - velocity) * easingFactor;

  if (track && sequenceSize > 0) {
    offset = ((offset + velocity * deltaTime) % sequenceSize + sequenceSize) % sequenceSize;
    track.style.transform = isVertical.value
      ? `translate3d(0, ${-offset}px, 0)`
      : `translate3d(${-offset}px, 0, 0)`;
  }

  animationFrame = requestAnimationFrame(animate);
};

const handleMouseEnter = () => {
  if (effectiveHoverSpeed.value !== undefined) isHovered.value = true;
};

const handleMouseLeave = () => {
  if (effectiveHoverSpeed.value !== undefined) isHovered.value = false;
};

watch(
  () => [props.logos, props.gap, props.logoHeight, props.direction],
  () => nextTick(observeDimensions),
  { deep: true },
);

onMounted(async () => {
  await nextTick();
  observeDimensions();
  animationFrame = requestAnimationFrame(animate);
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  window.removeEventListener("resize", updateDimensions);
  imageCleanup?.();
  if (animationFrame !== null) cancelAnimationFrame(animationFrame);
});
</script>

<template>
  <div
    ref="containerElement"
    :class="rootClassName"
    :style="containerStyle"
    role="region"
    :aria-label="ariaLabel"
  >
    <div
      ref="trackElement"
      class="logoloop__track"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <ul
        v-for="copyIndex in copyCount"
        :key="`copy-${copyIndex}`"
        class="logoloop__list"
        role="list"
        :aria-hidden="copyIndex > 1"
      >
        <li
          v-for="(item, itemIndex) in logos"
          :key="`${copyIndex}-${itemIndex}`"
          class="logoloop__item"
          role="listitem"
        >
          <a
            v-if="item.href"
            class="logoloop__link"
            :href="item.href"
            :aria-label="itemAriaLabel(item) || 'logo link'"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span
              v-if="'icon' in item"
              class="logoloop__node"
              :aria-hidden="!item.ariaLabel"
            >
              <FontAwesomeIcon :icon="item.icon" />
            </span>
            <img
              v-else
              :src="item.src"
              :srcset="item.srcSet"
              :sizes="item.sizes"
              :width="item.width"
              :height="item.height"
              :alt="item.alt ?? ''"
              :title="item.title"
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </a>
          <span v-else-if="'icon' in item" class="logoloop__node">
            <FontAwesomeIcon :icon="item.icon" />
          </span>
          <img
            v-else
            :src="item.src"
            :srcset="item.srcSet"
            :sizes="item.sizes"
            :width="item.width"
            :height="item.height"
            :alt="item.alt ?? ''"
            :title="item.title"
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
