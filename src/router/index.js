import {lazy} from "react";

const Home = lazy(() => import("../pages/Home"))
const Project = lazy(() => import("../pages/Project"))
const NotFound = lazy(() => import("../pages/NotFound"))

export const router = [
    {
        path: "/",
        element: (
            <Home />
        )
    },
    {
        path: "project/:id",
        element: (
            <Project />
        )
    },
    {
        path: "*",
        element: (
            <NotFound />
        )
    }
];
