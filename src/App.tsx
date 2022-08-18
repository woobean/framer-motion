import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 8px;
  height: 200px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Switch = styled.button<{ clicked: boolean }>`
  background-color: white;
  border: 0;
  border-radius: 4px;
  padding: 6px 8px;
  cursor: pointer;
  transition: all 0.2s;
  transform: ${(props) => (props.clicked ? "scale(1.15)" : "")};
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => (props.clicked ? "#dd3a3a" : "#2a63ff")};
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 48px;
  width: 48px;
  border-radius: 24px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: (custom: string) => ({
    originX: custom === "1" || custom === "3" ? 1 : 0,
    originY: custom === "1" || custom === "2" ? 1 : 0,
    scale: 1.1,
  }),
};

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);
  const [id, setId] = useState<null | string>(null);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            variants={boxVariants}
            whileHover="hover"
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
            custom={n}
          >
            {n === "2" && !clicked ? <Circle layoutId="circle" /> : null}
            {n === "3" && clicked ? <Circle layoutId="circle" /> : null}
          </Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{
                width: 400,
                height: 200,
                backgroundColor: "rgba(255, 255, 255, 1)",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Switch clicked={clicked} onClick={toggleClicked}>
        Switch
      </Switch>
    </Wrapper>
  );
}

export default App;
