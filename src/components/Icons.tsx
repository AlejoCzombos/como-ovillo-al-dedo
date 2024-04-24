interface IconProps {
  className?: string;
  fillColor?: string;
}

export default function DollarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M18 8.5V8.35417C18 6.50171 16.4983 5 14.6458 5H9.5C7.567 5 6 6.567 6 8.5C6 10.433 7.567 12 9.5 12H14.5C16.433 12 18 13.567 18 15.5C18 17.433 16.433 19 14.5 19H9.42708C7.53436 19 6 17.4656 6 15.5729V15.5M12 3V21"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export function QuantityIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.1507 2.3649C10.8306 0.713558 13.1694 0.713567 13.8494 2.3649L16.1856 8.0386L21.4255 8.34683C23.2632 8.45493 23.9912 10.7786 22.5437 11.916L18.1816 15.3433L19.9202 20.2694C20.5648 22.0955 18.497 23.6802 16.9012 22.5831L12 19.2135L7.09881 22.5831C5.50303 23.6802 3.43525 22.0955 4.07977 20.2694L5.81838 15.3433L1.45635 11.916C0.0087955 10.7787 0.736801 8.45493 2.57454 8.34683L7.81442 8.0386L10.1507 2.3649ZM12 3.1264L9.18559 9.9614L2.69199 10.3434L8.18164 14.6567L5.96575 20.935L12 16.7865L18.0343 20.935L15.8184 14.6567L21.308 10.3434L14.8144 9.9614L12 3.1264Z"
      />
    </svg>
  );
}
