import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BillingDesign } from "./BillingDesign";
import { Ebill } from "./Ebill";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BillingDesign />} />
        <Route path="/ebill" element={<Ebill />} />
      </Routes>
    </BrowserRouter>
  );
};
