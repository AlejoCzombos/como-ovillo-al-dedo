export default function BigButton({
  text,
  ...props
}: {
  text: string;
  [key: string]: any;
}) {
  return (
    <button
      {...props}
      className="bg-tertiary-200 text-secondary-500 py-4 text-pretty text-2xl w-full font-semibold drop-shadow-lg rounded-3xl hover:bg-tertiary-100 transition-colors ease-in-out"
    >
      {text}
    </button>
  );
}
