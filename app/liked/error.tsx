"use client";

import Box from "@/components/Box";

const error = () => {
  return (
    <Box className="h-full flex items-center justify-center">
      <div className="uppercase font-secondaryFont mx-auto bg-betaColor text-2xl w-[90%] h-[20vh] grid place-items-center">
        application error!
      </div>
    </Box>
  );
};

export default error;
