"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value = 1, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      max={1}
      step={0.1}
      value={[value]}
      defaultValue={[1]}
      aria-label="Volume"
      onValueChange={handleChange}
      className="flex w-full h-10 relative select-none touch-none items-center"
    >
      <RadixSlider.Track className="grow h-[3px] relative rounded-full bg-textColor/50">
        <RadixSlider.Range className="h-full absolute bg-textColor rounded-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
