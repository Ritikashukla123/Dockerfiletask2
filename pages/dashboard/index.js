import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
    Bars3BottomLeftIcon,
    XMarkIcon,
    Squares2X2Icon,
    CubeIcon,
    CursorArrowRaysIcon,
    KeyIcon,
    DocumentTextIcon,
    BookOpenIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DashboardIntroduction from "../../components/dashboard/introduction";
import { useRouter } from "next/router";
import DesktopSidebar from "../../components/dashboard-sidebar/DesktopSidebar";
import PhoneSidebar from "../../components/dashboard-sidebar/PhoneSidebar";
import SimpleLoader from "@/components/common/SimpleLoader";

const navigation = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: Squares2X2Icon,
        current: true,
    },
    {
        name: "Query",
        href: "/dashboard/query",
        icon: DocumentTextIcon,
        current: false,
    },
    /* { name: "Nodes", href: "", icon: CubeIcon, current: false },
    {
        name: "Endpoints",
        href: "",
        icon: CursorArrowRaysIcon,
        current: false,
    },
    { name: "Keys", href: "", icon: KeyIcon, current: false },
    {
        name: "Contracts",
        href: "",
        icon: DocumentTextIcon,
        current: false,
    },
    {
        name: "Address Book",
        href: "",
        icon: BookOpenIcon,
        current: false,
    }, */
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [authToken, setAuthToken] = useState(undefined);
    const [nodeId, setNodeId] = useState(undefined);
    const [userNodeList, setUserNodeList] = useState([]);
    const [isLoading, setIsLoading] = useState(0);
    const [fetching, setFetching] = useState(false);

    const router = useRouter();

    const handleNodeIdChange = (e) => {
        setNodeId(e.target.value);
    };

    useEffect(() => {
        setAuthToken(localStorage.getItem("auth_token"));
        // localStorage.setItem("node_id", nodeId);
    }, [authToken]);

    useEffect(() => {
        setIsLoading(isLoading + 1);
        fetch(`http://chaindeck.api.io:30967/nodes`, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setNodeId(res[0].node_name);
                setUserNodeList(res);
                setIsLoading(isLoading - 1);
            })
            .catch((error) => {});
    }, []);

    if (authToken === "undefined" || authToken === null) router.push("/login");

    return (
        <>
            <Head>
                <title>ChainDeck - Dashboard</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 md:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-cdnavyblue pt-5 pb-4">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Close sidebar
                                                </span>
                                                <XMarkIcon
                                                    className="h-6 w-6 text-white"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <PhoneSidebar navigation={navigation} />
                                </Dialog.Panel>
                            </Transition.Child>
                            <div
                                className="w-14 flex-shrink-0"
                                aria-hidden="true"
                            >
                                {/* Dummy element to force sidebar to shrink to fit close icon */}
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <DesktopSidebar navigation={navigation} />
                </div>
                <div className="flex flex-col md:pl-64">
                    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-transparent">
                        <button
                            type="button"
                            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3BottomLeftIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        </button>
                    </div>

                    <main className="h-full bg-transparent">
                        <div className="py-6">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-white">
                                    Dashboard
                                </h1>

                                <div>
                                    <div className="text-zinc-300 font-semibold mx-4">
                                        <label>
                                            <span className="mx-4">
                                                Node ID
                                            </span>
                                            <select
                                                name="nodeId"
                                                /* defaultValue={
                                                    userNodeList[0]?.node_name
                                                } */
                                                onChange={handleNodeIdChange}
                                                className="text-zinc-300 rounded-lg bg-cddbmedium border border-cddarkblue"
                                            >
                                                {userNodeList.map((node) => (
                                                    <option
                                                        value={node.node_name}
                                                        key={node.node_name}
                                                    >
                                                        {node.node_name
                                                            .split(
                                                                "-metrics-exporter"
                                                            )[0]
                                                            .replace(
                                                                /[-]/g,
                                                                " "
                                                            )
                                                            .toUpperCase()}
                                                    </option>
                                                ))}
                                                {/* <option value="polygon">
                                                    Polygon
                                                </option>
                                                <option value="arbitrum-archive">
                                                    Arbitrum Archive
                                                </option>
                                                <option value="ethereum-archive">
                                                    Ethereum Archive
                                                </option>
                                                <option value="polygon-archive">
                                                    Polygon Archive
                                                </option> */}
                                            </select>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                                <div className="py-4">{/* some space */}</div>
                                {/* <div className="flex items-center justify-center bg-transparent">
                                    <SimpleLoader />
                                </div> */}
                                <DashboardIntroduction
                                    nodeId={nodeId}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                    setNodeId={setNodeId}
                                    fetching={fetching}
                                    setFetching={setFetching}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
