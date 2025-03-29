export function AppHeader() {
  return (
    <div>
      <a
        className="font-serif text-2xl font-extralight text-gray-500"
        href="https://github.com/CoolKidsLabs/ant"
        target="_blank"
      >
        <div className="flex items-end space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <text y="28" font-size="28" text-anchor="middle" x="16">▞</text>
          </svg>
          <p className="leading-none">Ant</p>
        </div>
      </a>
    </div>
  );
}
