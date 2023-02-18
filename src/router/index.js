import {lazy} from "react";

const Live = lazy(() => import("pages/Live"))
const Home = lazy(() => import("pages/Home"))
const Sport = lazy(() => import("pages/Sport"))
const Settings = lazy(() => import("pages/Settings"))
const Category = lazy(() => import("pages/Category"))
const Team = lazy(() => import("pages/Team"))

const OverviewLeague = lazy(() => import("pages/league/Overview"))
const TablesLeague = lazy(() => import("pages/league/Tables"))
const TeamsLeague = lazy(() => import("pages/league/Teams"))
const ArchiveLeague = lazy(() => import("pages/league/Archive"))

const OverviewMatch = lazy(() => import("pages/match/Overview"))
const HeadToHeadMatch = lazy(() => import("pages/match/HeadToHead"))
const TablesMatch = lazy(() => import("pages/match/Tables"))
const ArchiveMatch = lazy(() => import("pages/match/Archive"))

export const router = [
    {
        path: "/",
        element: (<Home />)
    },
    {
        path: "/:id",
        element: (<Sport />)
    },
    {
        path: "/:id/:category",
        element: (<Category />)
    },
    {
        path: "/:id/:category/:league/team/:team",
        element: (<Team />)
    },
    {
        path: "/:id/:category/:league/overview",
        element: (<OverviewLeague />)
    },
    {
        path: "/:id/:category/:league/tables",
        element: (<TablesLeague />)
    },
    {
        path: "/:id/:category/:league/teams",
        element: (<TeamsLeague />)
    },
    {
        path: "/:id/:category/:league/archive",
        element: (<ArchiveLeague />)
    },
    {
        path: "/:id/:match/overview",
        element: (<OverviewMatch />)
    },
    {
        path: "/:id/:match/h2h",
        element: (<HeadToHeadMatch />)
    },
    {
        path: "/:id/:match/tables",
        element: (<TablesMatch />)
    },
    {
        path: "/:id/:match/archive",
        element: (<ArchiveMatch />)
    },
    {
        path: "/settings",
        element: (<Settings />)
    },
    {
        path: "/live",
        element: (<Live />)
    },
    {
        path: "*",
        element: (
            <Home />
        )
    }
];
