<script setup lang="ts">
import { computed, ref } from "vue";
import { useSpring } from "../composables/useSpring";
import "./TiltedCard.css";

const props = withDefaults(
  defineProps<{
    imageSrc: string;
    altText?: string;
    captionText?: string;
    containerHeight?: string;
    containerWidth?: string;
    imageHeight?: string;
    imageWidth?: string;
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showMobileWarning?: boolean;
    showTooltip?: boolean;
    displayOverlayContent?: boolean;
    imageClassName?: string;
  }>(),
  {
    altText: "Tilted card image",
    captionText: "",
    containerHeight: "300px",
    containerWidth: "100%",
    imageHeight: "300px",
    imageWidth: "300px",
    scaleOnHover: 1.1,
    rotateAmplitude: 14,
    showMobileWarning: true,
    showTooltip: true,
    displayOverlayContent: false,
    imageClassName: "",
  },
);

const emit = defineEmits<{
  imageLoad: [event: Event];
}>();

const figureElement = ref<HTMLElement | null>(null);
const pointerX = ref(0);
const pointerY = ref(0);
const rotateXTarget = ref(0);
const rotateYTarget = ref(0);
const scaleTarget = ref(1);
const opacityTarget = ref(0);
const captionRotationTarget = ref(0);
let lastY = 0;

const cardSpring = { damping: 30, stiffness: 100, mass: 2 };
const rotateX = useSpring(rotateXTarget, cardSpring);
const rotateY = useSpring(rotateYTarget, cardSpring);
const scale = useSpring(scaleTarget, cardSpring);
const opacity = useSpring(opacityTarget, {
  damping: 20,
  stiffness: 100,
  mass: 1,
});
const captionRotation = useSpring(captionRotationTarget, {
  damping: 30,
  stiffness: 350,
  mass: 1,
});

const figureStyle = computed(() => ({
  height: props.containerHeight,
  width: props.containerWidth,
}));

const innerStyle = computed(() => ({
  width: props.imageWidth,
  height: props.imageHeight,
  transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) scale(${scale.value})`,
}));

const imageStyle = computed(() => ({
  width: props.imageWidth,
  height: props.imageHeight,
}));

const captionStyle = computed(() => ({
  opacity: opacity.value,
  transform: `translate3d(${pointerX.value}px, ${pointerY.value}px, 0) rotate(${captionRotation.value}deg)`,
}));

const handleMouseMove = (event: MouseEvent) => {
  if (!figureElement.value) return;

  const rect = figureElement.value.getBoundingClientRect();
  const offsetX = event.clientX - rect.left - rect.width / 2;
  const offsetY = event.clientY - rect.top - rect.height / 2;

  rotateXTarget.value = (offsetY / (rect.height / 2)) * -props.rotateAmplitude;
  rotateYTarget.value = (offsetX / (rect.width / 2)) * props.rotateAmplitude;
  pointerX.value = event.clientX - rect.left;
  pointerY.value = event.clientY - rect.top;
  captionRotationTarget.value = -(offsetY - lastY) * 0.6;
  lastY = offsetY;
};

const handleMouseEnter = () => {
  scaleTarget.value = props.scaleOnHover;
  opacityTarget.value = 1;
};

const handleMouseLeave = () => {
  opacityTarget.value = 0;
  scaleTarget.value = 1;
  rotateXTarget.value = 0;
  rotateYTarget.value = 0;
  captionRotationTarget.value = 0;
};
</script>

<template>
  <figure
    ref="figureElement"
    class="tilted-card-figure"
    :style="figureStyle"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="showMobileWarning" class="tilted-card-mobile-alert">
      This effect is not optimized for mobile. Check on desktop.
    </div>

    <div class="tilted-card-inner" :style="innerStyle">
      <img
        :src="imageSrc"
        :alt="altText"
        :class="['tilted-card-img', imageClassName]"
        :style="imageStyle"
        draggable="false"
        @load="emit('imageLoad', $event)"
      />

      <div v-if="displayOverlayContent" class="tilted-card-overlay">
        <slot name="overlay" />
      </div>
    </div>

    <figcaption v-if="showTooltip" class="tilted-card-caption" :style="captionStyle">
      {{ captionText }}
    </figcaption>
  </figure>
</template>
