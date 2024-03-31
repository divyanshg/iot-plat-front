
interface TextProps {
  data: {
    text: string;
  };
}

function Text(props: TextProps) {
  return (
    <div>
      <h1 className="text-4xl">{props.data.text}</h1>
    </div>
  );
}

export default Text;
