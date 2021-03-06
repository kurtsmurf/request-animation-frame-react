// @ts-check

import { Fragment, h, render } from "https://cdn.skypack.dev/preact";
import { useEffect, useState, useRef } from "https://cdn.skypack.dev/preact/hooks";

const App = () => {
  const [show, setShow] = useState(true);

  return h(
    Fragment,
    {},
    h(AnimatingCircleUseState),
    h(AnimatingCircleUseRef),
  );
};

const AnimatingCircleUseState = () => {
  const [radius, setRadius] = useState();

  useAnimation(delta => {setRadius(Math.abs(Math.cos(delta / 1000)) * 5)});

  return h(
    "svg",
    { viewBox: "-5, -5, 10, 10" },
    h("circle", { cx: 0, cy: 0, r: radius }),
    h('text', { x: -4, y: 0}, "with useState")
  );
};

const AnimatingCircleUseRef = () => {
  const radius = useRef();

  useAnimation(delta => radius.current?.setAttribute('r', Math.abs(Math.cos(delta / 1000)) * 5))

  return h(
    "svg",
    { viewBox: "-5, -5, 10, 10" },
    h("circle", { cx: 0, cy: 0, ref: radius }),
    h('text', { x: -1, y: 0}, "with useRef")
  );
};

const useAnimation = (tick) => {
  const frameId = useRef();
  const start = useRef();

  const animate = () => {
    tick(Date.now() - start.current)
    frameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    start.current = Date.now()
  }, []);

  useEffect(() => {
    if (!start.current) return;
    frameId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [start.current])
}

render(h(App), document.getElementById("app"));
