import { Route, Routes } from "react-router";
import { routerType } from "@/types/router.types";
import pagesData from "./pagesData";
import { NotFound } from "@/pages/errors/notfound/notfound";

const Router = () => {
  const pageRoutes = pagesData.map(({ path, title, element }: routerType) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      {pageRoutes}
    </Routes>
  );
};

export default Router;
