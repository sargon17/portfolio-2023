import projectType from "@/types/project";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import getPost from "@/utils/notion";

const DescriptionBox = ({ activeProject }: { activeProject: projectType | null }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!activeProject) return null;

  let clss = "description-box__card";

  return (
    <>
      <motion.div
        className={clss}
        key={activeProject?._id}
        initial={{ opacity: 0, y: -40 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 0.1,
            duration: 0.5,
            ease: "backOut",
          },
        }}
        exit={{
          opacity: 0,
          y: 40,
          transition: {
            delay: 0.1,
            duration: 0.5,
            ease: "backOut",
          },
        }}
      >
        <motion.div
          className="card-content"
          data-lenis-prevent={isExpanded}
          key={activeProject?._id}
          layout
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.8, duration: 0.5 },
          }}
        >
          <p>{getPost(activeProject).description}</p>
        </motion.div>
        <div
          className="read-more"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="read-more__bg"></div>
          <div className="read-more__text">
            <div className="read-more__text__wrapper">
              <p>read more</p>
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isExpanded ? (
          <ExpandedDescriptionBox
            activeProject={activeProject}
            onClose={() => setIsExpanded(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};

const ExpandedDescriptionBox = ({
  activeProject,
  onClose,
}: {
  activeProject: projectType | null;
  onClose: () => void;
}) => {
  return (
    <div className="expanded-description-box">
      {getPost(activeProject).description}
      <div
        className="close-button"
        onClick={onClose}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 0.5L9.5 9.5"
            stroke="#000"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default DescriptionBox;
