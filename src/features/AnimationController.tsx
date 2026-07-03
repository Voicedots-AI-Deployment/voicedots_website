import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";

export type AvatarHandle = {
  startTalking: () => void;
  stopTalking: () => void;
  triggerHover: () => void;
};

export type AvatarProps = {
  lottieSrc: string;
  stateMachineId?: string;
  className?: string;
};


const DEFAULT_STATE_MACHINE_ID = "StateMachine1";

const AnimationController = forwardRef<AvatarHandle, AvatarProps>(({ lottieSrc, stateMachineId = DEFAULT_STATE_MACHINE_ID }, ref) => {
  const dotLottieRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    startTalking() {
      dotLottieRef.current?.stateMachineSetBooleanInput?.("talking", true);
    },
    stopTalking() {
      dotLottieRef.current?.stateMachineSetBooleanInput?.("talking", false);
    },
    triggerHover() {
      dotLottieRef.current?.stateMachineSetBooleanInput?.("talking", false);
      dotLottieRef.current?.stateMachineSetBooleanInput?.("hover", true);
    }
  }));

  return (
    <div className="w-full h-full">
      <DotLottieReact
        src={lottieSrc}
        autoplay
        loop
        stateMachineId={stateMachineId}
        dotLottieRefCallback={(dotLottie) => {
          dotLottieRef.current = dotLottie;
        }}
      />
    </div>
  );
});

export default AnimationController;