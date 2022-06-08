import { Fragment, h, render } from "https://cdn.skypack.dev/preact";
import { useEffect, useState, useRef } from "https://cdn.skypack.dev/preact/hooks";

const App = () => {
  const [show, setShow] = useState(true);

  return h(
    Fragment,
    {},
    h(AnimatingCircleOne),
    h(AnimatingCircleTwo),
  );
};

const AnimatingCircleOne = () => {
  const [radius, setRadius] = useState();

  useAnimation(delta => setRadius(Math.abs(Math.cos(delta / 1000)) * 5));

  return h(
    "svg",
    { viewBox: "-5, -5, 10, 10" },
    h("circle", { cx: 0, cy: 0, r: radius }),
  );
};


const AnimatingCircleTwo = () => {
  const ref = useRef();

  useAnimation(delta => ref.current?.setAttribute('r', Math.abs(Math.cos(delta / 1000)) * 5))

  return h(
    "svg",
    { viewBox: "-5, -5, 10, 10" },
    h("circle", { cx: 0, cy: 0, ref }),
  );
};

const useAnimation = (tick) => {
  const [frameId, setFrameId] = useState();
  const [start, setStart] = useState();

  const animate = () => {
    tick(Date.now() - start)
    setFrameId(requestAnimationFrame(animate));
  };

  useEffect(() => {
    setStart(Date.now())
  }, []);

  useEffect(() => {
    if (!start) return;
    setFrameId(requestAnimationFrame(animate));
    return () => cancelAnimationFrame(frameId);
  }, [start])
}

render(h(App), document.getElementById("app"));
