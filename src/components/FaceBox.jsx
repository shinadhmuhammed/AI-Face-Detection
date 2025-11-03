export default function FaceBox({ box }) {
  const { x, y, width, height } = box;
  return (
    <div
      className="absolute border-4 border-green-400 rounded-md"
      style={{
        top: y,
        left: x,
        width,
        height,
      }}
    ></div>
  );
}
