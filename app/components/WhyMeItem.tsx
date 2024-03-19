export default function WhyMeItem() {
  return (
    <div className="flex flex-col md:flex-row items-center my-6 gap-2">
      <span className="text-white text-6xl md:text-8xl font-bold md:mr-14 font-titles max-w-[30px]">
        1
      </span>
      <div className="flex flex-col">
        <h3 className="uppercase text-marine font-light mb-2 text-xl md:text-2xl font-titles md:text-left text-center">
          Постійно підвищую свій професіоналізм
        </h3>
        <p className="text-white normal-case text-base md:text-lg font-light leading-tight">
          Я постійно підвищую кваліфікацію та вивчаю сучасні дослідження, аби
          мої підлеглі отримували найкращі результати від супроводу у світ
          здоров’я
        </p>
      </div>
    </div>
  );
}
