export default function SectionTitle({
  title,
  className = "text-[10px] sm:text-2xl font-bold",
  containerClassName,
  button = null,
}) {
  return (
    <div
      className={`${containerClassName} h-full flex gap-2 sm:gap-0 items-center justify-center border border-[#E3E3E3] rounded-xl p-2 sm:p-8`}
    >
      <h2
        className={`${className} font-bold`}
        style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
      >
        {title}
      </h2>
      {button && button}
    </div>
  );
}
