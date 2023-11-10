export default function ModalHeader(props) {
  return (
    <div className="bg-white p-6 mt-20 pt-24 rounded w-full text-center items-center justify-center">
      {props.children}
    </div>
  );
}
