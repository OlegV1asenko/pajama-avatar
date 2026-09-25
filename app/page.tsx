import AvatarGenerator from "@/components/AvatarGenerator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-pink-50">
      {/* Header */}
      <header className="pt-12 pb-6 text-center px-4">
        <div className="text-6xl mb-4">🧸</div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
          Піжама Аватар
        </h1>
        <p className="text-gray-500 mt-2 text-base max-w-xs mx-auto">
          Завантажте своє фото — отримайте digital-art аватар у піжамі на вибір
        </p>
        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 font-bold flex items-center justify-center text-xs">1</span>
            Фото
          </span>
          <span className="text-gray-200">──</span>
          <span className="flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 font-bold flex items-center justify-center text-xs">2</span>
            Аватар
          </span>
          <span className="text-gray-200">──</span>
          <span className="flex items-center gap-1">
            <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 font-bold flex items-center justify-center text-xs">3</span>
            Піжама
          </span>
        </div>
      </header>

      {/* Main content */}
      <section className="px-4 pb-20 max-w-lg mx-auto">
        <AvatarGenerator />
      </section>

      {/* Footer */}
      <footer className="text-center pb-8 text-xs text-gray-300">
        Powered by AI · Безкоштовно · Без реєстрації
      </footer>
    </main>
  );
}
