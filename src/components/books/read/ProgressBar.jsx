const ProgressBar = ({ percentage }) => {
  const deleteDecimals = parseInt(percentage);

  return (
    <div className="w-full md:w-3/4 mx-auto relative">
      <div className="flex justify-between mb-2 text-sm font-bold">
        <div>
          <p>Progreso</p>
        </div>
        <div>{deleteDecimals}% Leído</div>
      </div>

      <div className="relative">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-colorHoverPrimario absolute top-0"
            style={{ width: `${deleteDecimals}%` }}
          ></div>
        </div>
        <div
          className="w-4 h-4 bg-colorPrimario rounded-full absolute -top-1.5  right-0 -translate-x-2"
          style={{ left: `calc(${deleteDecimals}%)` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
