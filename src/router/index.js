import {lazy} from "react";

const Home = lazy(() => import("pages/Home"))

export const router = [
    {
        path: "/",
        element: (<Home />)
    },
];
