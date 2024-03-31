import { Link } from 'react-router-dom';

function EmptyState({ link, text }: { link: string; text: string }) {
  return (
    <div className="flex items-center justify-center flex-1 p-8 border border-gray-300 h-[300px] border-dashed rounded-xl">
      <Link
        to={link}
        className="flex items-center justify-center px-6 py-2 bg-black rounded-lg hover:bg-gray-700"
      >
        <span className="text-lg text-white">{text}</span>
      </Link>
    </div>
  );
}

export default EmptyState;
