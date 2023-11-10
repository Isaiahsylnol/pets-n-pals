export default function Modal(props) {
  return (
    <div className="bg-white max-w-md mx-auto sm:mt-10 rounded-md">
      <div>{props.children}</div>
    </div>
  );
}
