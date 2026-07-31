import { onScopeDispose, readonly, ref, watch, type Ref } from "vue";

interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  precision?: number;
}

export const useSpring = (
  target: Ref<number>,
  {
    damping,
    stiffness,
    mass,
    precision = 0.001,
  }: SpringConfig,
): Readonly<Ref<number>> => {
  const current = ref(target.value);
  let velocity = 0;
  let animationFrame: number | null = null;
  let previousTimestamp: number | null = null;

  const animate = (timestamp: number) => {
    const elapsed = previousTimestamp === null
      ? 1 / 60
      : Math.min((timestamp - previousTimestamp) / 1000, 1 / 30);
    previousTimestamp = timestamp;

    const springForce = stiffness * (target.value - current.value);
    const dampingForce = damping * velocity;
    const acceleration = (springForce - dampingForce) / mass;

    velocity += acceleration * elapsed;
    current.value += velocity * elapsed;

    const atRest =
      Math.abs(velocity) < precision &&
      Math.abs(target.value - current.value) < precision;

    if (atRest) {
      current.value = target.value;
      velocity = 0;
      animationFrame = null;
      previousTimestamp = null;
      return;
    }

    animationFrame = requestAnimationFrame(animate);
  };

  const start = () => {
    if (animationFrame === null) {
      animationFrame = requestAnimationFrame(animate);
    }
  };

  watch(target, start);

  onScopeDispose(() => {
    if (animationFrame !== null) cancelAnimationFrame(animationFrame);
  });

  return readonly(current);
};
