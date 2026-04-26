import { Routes, Route } from "react-router-dom";
import Scene from "./Scene.jsx";

export default function SceneLayout({ children }) {
  return (
    <>
      <Scene />
      {children}
    </>
  );
}