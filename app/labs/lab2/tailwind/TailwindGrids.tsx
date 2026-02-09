export default function TailwindGrids() {
  return (
    <div id="wd-tailwind-grids">
      <h2 className="text-2xl font-bold">Tailwind Grids</h2>
      
      <h3 className="mt-6 text-xl font-bold">4 Columns Grid</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center bg-blue-300 p-3">01</div>
        <div className="text-center bg-blue-300 p-3">02</div>
        <div className="text-center bg-blue-300 p-3">03</div>
        <div className="text-center bg-blue-300 p-3">04</div>
      </div>

      <h3 className="mt-6 text-xl font-bold">3 Columns Grid</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center bg-blue-300 p-3">01</div>
        <div className="text-center bg-blue-300 p-3">02</div>
        <div className="text-center bg-blue-300 p-3">03</div>
      </div>

      <h3 className="mt-6 text-xl font-bold">Responsive Grid</h3>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="text-center bg-blue-300 p-3">01</div>
  <div className="text-center bg-blue-300 p-3">02</div>
  <div className="text-center bg-blue-300 p-3">03</div>
</div>
    </div>
  );
}