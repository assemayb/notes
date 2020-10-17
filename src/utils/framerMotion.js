export const notesVaraints = {
  hidden: {
    // x: 850,
    opacity: 0.7,
  },
  visible: {
    // x: 0,
    opacity: 1,

    transition: {
      ease: "easeIn",
    },
  },
};

export const todosVaraints = {
  hidden: {
    // x: -850,
    opacity: 0.7,
  },
  visible: {
    // x: 0,
    opacity: 1,

    transition: {
      ease: "easeIn",
    },
  },
};

export const containerVariants = {
  hidden: {
    opacity: 0.2,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 100,
    trnasition: {
      type: "spring",
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    y: 500,
  },
};
export const firstVariant = {
  visible: {
    height: [20, 50, 70, 20, 50, 70],
    trnasition: {
      duration: 0.5,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  },
};

export const secondVariant = {
  visible: {
    height: [10, 70, 30],
    trnasition: {
      duration: 0.5,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  },
};
export const thirdVariant = {
  visible: {
    height: [70, 60, 30, 100],
    trnasition: {
      duration: 0.5,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  },
};
