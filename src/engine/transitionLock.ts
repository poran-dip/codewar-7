let locked = false;

export const isLocked = () => locked;

export const lock = () => {
  locked = true;
};

export const unlock = () => {
  locked = false;
};
