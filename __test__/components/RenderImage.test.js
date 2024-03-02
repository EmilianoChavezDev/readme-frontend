// renderImage.test.js

import React from "react";
import { render } from "@testing-library/react";
import RenderImage from "@/components/RenderImage";

jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);

test("renders image correctly when file is passed", () => {
  const file = new File(["(⌐□_□)"], "chucknorris.png", {
    type: "image/png",
  });
  const { getByAltText } = render(
    <RenderImage inputContainerRef={file} setLoadingPortada={() => {}} />
  );
  const image = getByAltText("chucknorris.png");
  expect(image).toBeInTheDocument();
});

// renderImage.test.js

// test("renders default image when file is not passed", () => {
//   const { getByAltText } = render(
//     <RenderImage inputContainerRef={null} setLoadingPortada={() => {}} />
//   );
//   const image = getByAltText("Imagen del libro");
//   expect(image).toBeInTheDocument();
// });
