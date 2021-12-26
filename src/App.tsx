import "./App.scss";
import { Suspense, useState } from "react";
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import { Shapes } from "./Shapes";
import { transition } from "./settings";
import useMeasure from "react-use-measure";

import profileImg from './cbcrop.jpeg';

export default function App() {
  const [ref, bounds] = useMeasure({ scroll: false });
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className='vertical-container'>
        <div className='navbar'>
            <div>About Me</div>
            <div>Skills</div>
            <MotionConfig transition={transition}>
              <motion.div
                ref={ref}
                initial={false}
                animate={isHover ? "hover" : "rest"}
                whileTap="press"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.5 },
                  press: { scale: 1.4 }
                }}
                onHoverStart={() => {
                  resetMousePosition();
                  setIsHover(true);
                }}
                onHoverEnd={() => {
                  resetMousePosition();
                  setIsHover(false);
                }}
                onTapStart={() => setIsPress(true)}
                onTap={() => setIsPress(false)}
                onTapCancel={() => setIsPress(false)}
                onPointerMove={(e) => {
                  mouseX.set(e.clientX - bounds.x - bounds.width / 2);
                  mouseY.set(e.clientY - bounds.y - bounds.height / 2);
                }}
              >
                <motion.div
                  className="shapes"
                  variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: 1 }
                  }}
                >
                  <div className="container">
                    <Suspense fallback={null}>
                      <Shapes
                        isHover={isHover}
                        isPress={isPress}
                        mouseX={mouseX}
                        mouseY={mouseY}
                      />
                    </Suspense>
                  </div>
                </motion.div>
                <motion.div
                  variants={{ hover: { scale: 0.6 }, press: { scale: 0.75 } }}
                  className="label"
                >
                  <img className='profile-img gradient-shadow' src={profileImg} alt="" />
                </motion.div>
              </motion.div>
            </MotionConfig>
            <div>Experience</div>
            <div>Contact Me</div>
        </div>
        <div className='content-body'>
            <div>Hi I am Bee</div>
            <div className='body-paragraph'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, nobis nostrum id molestiae dignissimos asperiores sapiente quos ad rerum unde.</div>
        </div>
    </div>
  );
}