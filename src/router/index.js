import {lazy} from "react";

const Home = lazy(() => import("../pages/Home"))
const Sport = lazy(() => import("../pages/Sport"))
const Settings = lazy(() => import("../pages/Settings"))
const Category = lazy(() => import("../pages/Category"))

const OverviewLeague = lazy(() => import("../pages/league/Overview"))
const StandingsLeague = lazy(() => import("../pages/league/Standings"))
const TeamsLeague = lazy(() => import("../pages/league/Teams"))
const ArchiveLeague = lazy(() => import("../pages/league/Archive"))

const OverviewMatch = lazy(() => import("../pages/match/Overview"))
const HeadToHeadMatch = lazy(() => import("../pages/match/HeadToHead"))
const StandingsMatch = lazy(() => import("../pages/match/Standings"))
const ArchiveMatch = lazy(() => import("../pages/match/Archive"))

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
        path: "/:id/:category/:league/overview",
        element: (<OverviewLeague />)
    },
    {
        path: "/:id/:category/:league/standings",
        element: (<StandingsLeague />)
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
        path: "/:id/:league/overview",
        element: (<OverviewMatch />)
    },
    {
        path: "/:id/:league/h2h",
        element: (<HeadToHeadMatch />)
    },
    {
        path: "/:id/:league/standings",
        element: (<StandingsMatch />)
    },
    {
        path: "/:id/:league/archive",
        element: (<ArchiveMatch />)
    },
    {
        path: "settings",
        element: (<Settings />)
    },
];
