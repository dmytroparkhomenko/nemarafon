export default function Button(props: any) {
  return (
    <button className="uppercase w-full md:w-2/3 mt-9 py-[6px] md:py-[8px] bg-marine rounded-full font-light text-[20px]">
      {props.children}
    </button>
  );
}
