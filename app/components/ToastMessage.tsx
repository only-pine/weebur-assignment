export default function ToastMessage({ message }: { message: string }) {
  return (
    <div className="fixed left-1/2 bottom-10 -translate-x-1/2 z-50 flex px-5 py-3 text-white font-medium bg-gray-800/80 rounded-lg shadow-lg">
      {message}
    </div>
  );
}
