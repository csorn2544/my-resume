<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    padding?: number;
    disabled?: boolean;
    magnetStrength?: number;
    activeTransition?: string;
    inactiveTransition?: string;
    wrapperClassName?: string;
    innerClassName?: string;
  }>(),
  {
    padding: 100,
    disabled: false,
    magnetStrength: 2,
    activeTransition: "transform 0.3s ease-out",
    inactiveTransition: "transform 0.5s ease-in-out",
    wrapperClassName: "",
    innerClassName: "",
  },
);

const magnetElement = ref<HTMLDivElement | null>(null);
const isActive = ref(false);
const position = ref({ x: 0, y: 0 });

const resetPosition = () => {
  isActive.value = false;
  position.value = { x: 0, y: 0 };
};

const handleMouseMove = (event: MouseEvent) => {
  if (props.disabled || !magnetElement.value) return;

  const { left, top, width, height } = magnetElement.value.getBoundingClientRect();
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  const distanceX = Math.abs(centerX - event.clientX);
  const distanceY = Math.abs(centerY - event.clientY);

  if (
    distanceX < width / 2 + props.padding &&
    distanceY < height / 2 + props.padding
  ) {
    isActive.value = true;
    position.value = {
      x: (event.clientX - centerX) / props.magnetStrength,
      y: (event.clientY - centerY) / props.magnetStrength,
    };
    return;
  }

  resetPosition();
};

const innerStyle = computed(() => ({
  transform: `translate3d(${position.value.x}px, ${position.value.y}px, 0)`,
  transition: isActive.value
    ? props.activeTransition
    : props.inactiveTransition,
  willChange: "transform",
}));

watch(() => props.disabled, (disabled) => {
  if (disabled) resetPosition();
});

onMounted(() => window.addEventListener("mousemove", handleMouseMove));
onUnmounted(() => window.removeEventListener("mousemove", handleMouseMove));
</script>

<template>
  <div
    ref="magnetElement"
    v-bind="$attrs"
    :class="wrapperClassName"
    style="position: relative; display: inline-block"
  >
    <div :class="innerClassName" :style="innerStyle">
      <slot />
    </div>
  </div>
</template>
