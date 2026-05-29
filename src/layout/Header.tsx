export default function Header({ user }: { user: 'Doctor' }) {
  return (
    <div className="h-20 sm:h-26.75 w-full bg-amber-800 p-4 sm:px-10 sm:py-6">{user} Header</div>
  );
}
